import { DashboardHeader } from '@/components/dashboard/header';
import { MetricCard } from '@/components/dashboard/metric-card';
import { OrdersTable } from '@/components/dashboard/orders-table';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { OrdersOverview } from '@/components/dashboard/orders-overview';
import { PredictionTool } from '@/components/dashboard/prediction-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Package, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard title="Total Users" value="89,935" icon={<Users className="h-5 w-5 text-muted-foreground" />} description="+20.1% from last month" />
          <MetricCard title="Total Products" value="23,283" icon={<Package className="h-5 w-5 text-muted-foreground" />} description="+18.1% from last month" />
          <MetricCard title="Refunded" value="$12,854" icon={<RefreshCw className="h-5 w-5 text-muted-foreground" />} description="+11% from last month" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>An overview of the most recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Monthly sales performance.</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Orders Overview</CardTitle>
                <CardDescription>Online vs. Offline orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <OrdersOverview />
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <PredictionTool />
        </div>
      </main>
    </div>
  );
}
