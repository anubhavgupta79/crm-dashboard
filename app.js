// ---- Sample Data (you can swap with API later) ----
const sample = {
  kpis: { leads: 1240, deals: 86, revenue: 184000, tasks: 7 },
  dealsByStage: [
    { stage: "New", count: 32 },
    { stage: "Qualified", count: 22 },
    { stage: "Proposal", count: 18 },
    { stage: "Won", count: 10 },
    { stage: "Lost", count: 4 },
  ],
  revenueTrend: Array.from({length:12}, (_,i)=> ({
    label: new Date(new Date().getFullYear(), new Date().getMonth()-11+i, 1)
              .toLocaleString('en', { month:'short' }),
    value: Math.round(6500 + Math.random()*12000)
  })),
  contacts: [
    { name:"Riya Sharma", company:"Novatek", email:"riya@novatek.io", stage:"New", value:1200, owner:"Akash" },
    { name:"Amit Verma", company:"IndigoSoft", email:"amit@indigosoft.in", stage:"Qualified", value:5400, owner:"Nisha" },
    { name:"Sara Khan", company:"BlueCloud", email:"sara@bluecloud.co", stage:"Proposal", value:9200, owner:"Akash" },
    { name:"Kabir Mehta", company:"GreenLeaf", email:"kabir@greenleaf.in", stage:"Won", value:18000, owner:"Vikram" },
    { name:"Neha Patel", company:"BrightWorks", email:"neha@bw.com", stage:"Lost", value:3000, owner:"Nisha" },
    { name:"Harsh Gupta", company:"SkyPoint", email:"harsh@skypoint.ai", stage:"Qualified", value:7000, owner:"Akash" },
    { name:"Pooja Rao", company:"Nimbus", email:"pooja@nimbus.dev", stage:"New", value:1500, owner:"Akash" },
    { name:"Vikash Singh", company:"Quantum", email:"vikash@quantum.io", stage:"Proposal", value:12000, owner:"Vikram" },
    { name:"Ishita Jain", company:"Aster", email:"ishita@aster.co", stage:"Won", value:26000, owner:"Nisha" },
  ]
};

// ---- Helpers ----
const fmtCurrency = (n)=> '$' + n.toLocaleString('en-IN');

// ---- Sidebar + Theme ----
const sidebar = document.getElementById('sidebar');
document.getElementById('sidebarOpen').addEventListener('click', ()=> sidebar.classList.add('open'));
document.getElementById('sidebarClose').addEventListener('click', ()=> sidebar.classList.remove('open'));
document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', ()=>{
  document.getElementById('contactModal').setAttribute('aria-hidden', 'true');
  sidebar.classList.remove('open');
}));

const themeBtn = document.getElementById('toggleTheme');
themeBtn.addEventListener('click', ()=>{
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('crm_theme', isLight ? 'light' : 'dark');
});
if(localStorage.getItem('crm_theme') === 'light'){
  document.body.classList.add('light');
}

// ---- KPIs ----
document.getElementById('kpiLeads').textContent = sample.kpis.leads.toLocaleString('en-IN');
document.getElementById('kpiDeals').textContent = sample.kpis.deals.toLocaleString('en-IN');
document.getElementById('kpiRevenue').textContent = fmtCurrency(sample.kpis.revenue);
document.getElementById('kpiTasks').textContent = sample.kpis.tasks;

// ---- Charts ----
const stageCtx = document.getElementById('stageChart');
const revCtx = document.getElementById('revenueChart');

new Chart(stageCtx, {
  type: 'doughnut',
  data: {
    labels: sample.dealsByStage.map(d=>d.stage),
    datasets: [{
      data: sample.dealsByStage.map(d=>d.count),
      borderWidth: 0
    }]
  },
  options: {
    plugins: {
      legend: { display: true, position: 'bottom', labels:{ color: getComputedStyle(document.documentElement).getPropertyValue('--subtle') } },
      tooltip: { enabled: true },
    },
    cutout: '55%',
  }
});

new Chart(revCtx, {
  type: 'line',
  data: {
    labels: sample.revenueTrend.map(d=>d.label),
    datasets: [{
      label: 'Revenue',
      data: sample.revenueTrend.map(d=>d.value),
      tension: .35,
      fill: true
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks:{ color: getComputedStyle(document.documentElement).getPropertyValue('--subtle') }, grid:{ display:false } },
      y: { ticks:{ color: getComputedStyle(document.documentElement).getPropertyValue('--subtle') }, grid:{ color:'rgba(255,255,255,.06)' } }
    }
  }
});

// ---- Contacts Table ----
const tbody = document.querySelector('#contactsTable tbody');
function renderRows(rows){
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.company}</td>
      <td><a class="link" href="mailto:${r.email}">${r.email}</a></td>
      <td><span class="badge ${r.stage}">${r.stage}</span></td>
      <td>${fmtCurrency(r.value)}</td>
      <td>${r.owner}</td>
    </tr>`).join('');
}
let current = [...sample.contacts];
renderRows(current);

// ---- Sorting ----
let sortState = { key:null, dir:1 };
document.querySelectorAll('#contactsTable thead th').forEach(th => {
  th.addEventListener('click', () => {
    const key = th.dataset.sort;
    if(sortState.key === key){ sortState.dir *= -1 } else { sortState = { key, dir:1 } }
    current.sort((a,b)=>{
      const va = a[key], vb = b[key];
      if(typeof va === 'number' && typeof vb === 'number') return (va - vb) * sortState.dir;
      return String(va).localeCompare(String(vb)) * sortState.dir;
    });
    renderRows(current);
  });
});

// ---- Filters & Search ----
const contactSearch = document.getElementById('contactSearch');
const stageFilter = document.getElementById('stageFilter');
function applyFilters(){
  const q = contactSearch.value.toLowerCase();
  const stage = stageFilter.value;
  current = sample.contacts.filter(c => {
    const matchesQ = [c.name, c.company, c.email, c.owner].some(x => x.toLowerCase().includes(q));
    const matchesStage = !stage || c.stage === stage;
    return matchesQ && matchesStage;
  });
  renderRows(current);
}
contactSearch.addEventListener('input', applyFilters);
stageFilter.addEventListener('change', applyFilters);

// ---- Global Search (topbar) ----
document.getElementById('globalSearch').addEventListener('input', (e)=>{
  contactSearch.value = e.target.value;
  applyFilters();
});

// ---- Modal: Add Contact ----
const modal = document.getElementById('contactModal');
document.getElementById('addContactBtn').addEventListener('click', ()=>{
  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('input[name="name"]').focus();
});
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const newContact = Object.fromEntries(fd.entries());
  newContact.value = Number(newContact.value);
  sample.contacts.unshift(newContact);
  applyFilters();
  modal.setAttribute('aria-hidden', 'true');
  e.target.reset();
});

// Close modal by clicking backdrop or X
modal.addEventListener('click', (e)=>{
  if(e.target.matches('[data-close]') || e.target === modal.querySelector('.modal-backdrop')){
    modal.setAttribute('aria-hidden', 'true');
  }
});
