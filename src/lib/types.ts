export type Order = {
  id: string;
  date: string;
  customerName: string;
  location: string;
  amount: number;
  status: 'Fulfilled' | 'Pending' | 'Cancelled';
};
