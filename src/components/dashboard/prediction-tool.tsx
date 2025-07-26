"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { predictFutureOrders, type PredictFutureOrdersOutput } from "@/ai/flows/predict-future-orders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2 } from "lucide-react";
import { sampleSalesDataCSV, sampleSeasonalityDataCSV } from "@/lib/data";
import { Bar, BarChart, YAxis, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const formSchema = z.object({
  salesData: z.string().min(1, "Sales data is required."),
  seasonalityData: z.string().optional(),
  regionalTrendsData: z.string().optional(),
  predictionHorizon: z.coerce.number().min(1, "Prediction horizon must be at least 1 month.").max(24, "Prediction horizon cannot exceed 24 months."),
});

type PredictionFormValues = z.infer<typeof formSchema>;

export function PredictionTool() {
  const [prediction, setPrediction] = useState<PredictFutureOrdersOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salesData: sampleSalesDataCSV,
      seasonalityData: sampleSeasonalityDataCSV,
      regionalTrendsData: "",
      predictionHorizon: 6,
    },
  });

  const onSubmit = async (values: PredictionFormValues) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const result = await predictFutureOrders(values);
      setPrediction(result);
    } catch (e) {
      setError("Failed to generate prediction. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const chartConfig = {
    volume: { label: "Volume", color: "hsl(var(--chart-2))" },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          Predictive Analytics
        </CardTitle>
        <CardDescription>
          Analyze past data to predict future order volume and potential revenue. Provide data in CSV format or use the samples.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="salesData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Sales Data (CSV)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="date,order_volume..." {...field} rows={8} className="font-mono text-xs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seasonalityData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seasonality Data (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="month,trend_factor..." {...field} rows={8} className="font-mono text-xs"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-6">
                <FormField
                    control={form.control}
                    name="regionalTrendsData"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Regional Trends (Optional)</FormLabel>
                        <FormControl>
                        <Textarea placeholder="region,trend..." {...field} rows={3} className="font-mono text-xs"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="predictionHorizon"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Prediction Horizon (Months)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 6" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Prediction
            </Button>
          </form>
        </Form>

        {isLoading && (
          <div className="mt-8 flex items-center justify-center rounded-lg border bg-card p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Generating insights...</p>
          </div>
        )}

        {error && (
            <div className="mt-8 text-center text-destructive">{error}</div>
        )}
        
        {prediction && (
          <div className="mt-8 space-y-6 rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Prediction Results</h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Predicted Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={prediction.predictedOrderVolume}>
                          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} fontSize={12} />
                          <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                          <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
                        </BarChart>
                      </ChartContainer>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Potential Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">${prediction.potentialRevenue.toLocaleString()}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{prediction.insights}</p>
                    </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
