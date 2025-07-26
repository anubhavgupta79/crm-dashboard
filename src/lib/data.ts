import type { Order } from './types';

export const orders: Order[] = [
  { id: 'ORD001', date: '2023-07-15', customerName: 'Liam Johnson', location: 'New York, USA', amount: 250.00, status: 'Fulfilled' },
  { id: 'ORD002', date: '2023-07-14', customerName: 'Olivia Smith', location: 'London, UK', amount: 150.75, status: 'Fulfilled' },
  { id: 'ORD003', date: '2023-07-14', customerName: 'Noah Williams', location: 'Tokyo, Japan', amount: 300.50, status: 'Pending' },
  { id: 'ORD004', date: '2023-07-13', customerName: 'Emma Brown', location: 'Sydney, Australia', amount: 75.20, status: 'Cancelled' },
  { id: 'ORD005', date: '2023-07-12', customerName: 'Ava Jones', location: 'Paris, France', amount: 550.00, status: 'Fulfilled' },
  { id: 'ORD006', date: '2023-07-11', customerName: 'William Garcia', location: 'Berlin, Germany', amount: 99.99, status: 'Fulfilled' },
  { id: 'ORD007', date: '2023-07-11', customerName: 'Sophia Miller', location: 'Toronto, Canada', amount: 120.00, status: 'Pending' },
  { id: 'ORD008', date: '2023-07-10', customerName: 'James Davis', location: 'New York, USA', amount: 80.00, status: 'Fulfilled' },
  { id: 'ORD009', date: '2023-07-09', customerName: 'Isabella Rodriguez', location: 'Mexico City, Mexico', amount: 210.40, status: 'Fulfilled' },
  { id: 'ORD010', date: '2023-07-08', customerName: 'Logan Martinez', location: 'Madrid, Spain', amount: 45.00, status: 'Cancelled' },
  { id: 'ORD011', date: '2023-07-08', customerName: 'Mia Hernandez', location: 'Rome, Italy', amount: 180.00, status: 'Pending' },
  { id: 'ORD012', date: '2023-07-07', customerName: 'Benjamin Lee', location: 'Seoul, South Korea', amount: 320.50, status: 'Fulfilled' },
];

export const salesData = [
  { month: 'Jan', total: 4231 },
  { month: 'Feb', total: 3876 },
  { month: 'Mar', total: 4501 },
  { month: 'Apr', total: 3589 },
  { month: 'May', total: 5123 },
  { month: 'Jun', total: 4890 },
  { month: 'Jul', total: 5342 },
];

export const ordersOverviewData = [
  { name: 'Online', value: 456, fill: 'var(--color-online)' },
  { name: 'Offline', value: 244, fill: 'var(--color-offline)' },
];

export const sampleSalesDataCSV = `date,order_volume
2023-01-15,250
2023-01-16,260
2023-02-10,280
2023-02-11,290
2023-03-05,310
2023-03-06,320
2023-04-20,300
2023-04-21,310
2023-05-15,350
2023-05-16,360
2023-06-18,400
2023-06-19,410
2023-07-22,450
2023-07-23,460`;

export const sampleSeasonalityDataCSV = `month,trend_factor
January,1.1
February,1.05
March,1.2
April,1.15
May,1.3
June,1.4
July,1.5
August,1.45
September,1.35
October,1.25
November,1.55
December,1.8`;
