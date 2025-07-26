"use client"
import { Pie, PieChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { ordersOverviewData } from '@/lib/data';

const chartConfig = {
  orders: {
    label: "Orders",
  },
  online: {
    label: "Online",
    color: "hsl(var(--chart-1))",
  },
  offline: {
    label: "Offline",
    color: "hsl(var(--chart-2))",
  },
};

export function OrdersOverview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[200px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={ordersOverviewData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5} >
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="name" />} className="-mt-4" />
        </PieChart>
      </ChartContainer>
      <div className="flex flex-col gap-1 text-center">
        <p className="text-2xl font-bold text-foreground">$59,442.10</p>
        <p className="text-sm text-muted-foreground">Total earnings this month</p>
      </div>
    </div>
  );
}
