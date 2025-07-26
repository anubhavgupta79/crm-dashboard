"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { salesData } from '@/lib/data';

const chartConfig = {
  total: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
};

export function SalesChart() {
  return (
    <div className="h-[250px] w-full">
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
        <BarChart accessibilityLayer data={salesData}>
            <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            fontSize={12}
            />
            <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            fontSize={12}
            tickFormatter={(value) => `$${value / 1000}k`}
            />
            <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
        </BarChart>
        </ChartContainer>
    </div>
  );
}
