'use server';

/**
 * @fileOverview Implements a Genkit flow to predict future order volume based on past sales data.
 *
 * - predictFutureOrders - A function that predicts future order volume.
 * - PredictFutureOrdersInput - The input type for the predictFutureOrders function.
 * - PredictFutureOrdersOutput - The return type for the predictFutureOrders function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictFutureOrdersInputSchema = z.object({
  salesData: z.string().describe('Past sales data in CSV format, including date and order volume.'),
  seasonalityData: z.string().optional().describe('Optional data on seasonality, such as monthly trends.'),
  regionalTrendsData: z.string().optional().describe('Optional data on regional sales trends.'),
  predictionHorizon: z.number().describe('The number of months into the future to predict.'),
});
export type PredictFutureOrdersInput = z.infer<typeof PredictFutureOrdersInputSchema>;

const PredictFutureOrdersOutputSchema = z.object({
  predictedOrderVolume: z.array(z.object({
    month: z.string().describe('The month for which the prediction is made.'),
    volume: z.number().describe('The predicted order volume for the month.'),
  })).describe('An array of predicted order volumes for each month in the prediction horizon.'),
  potentialRevenue: z.number().describe('The potential revenue based on the predicted order volume.'),
  insights: z.string().describe('Insights on potential risks and opportunities based on the prediction.'),
});
export type PredictFutureOrdersOutput = z.infer<typeof PredictFutureOrdersOutputSchema>;

export async function predictFutureOrders(input: PredictFutureOrdersInput): Promise<PredictFutureOrdersOutput> {
  return predictFutureOrdersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictFutureOrdersPrompt',
  input: {schema: PredictFutureOrdersInputSchema},
  output: {schema: PredictFutureOrdersOutputSchema},
  prompt: `You are an expert sales analyst. Given the past sales data, seasonality data, and regional trends data, predict the future order volume and potential revenue.

Past Sales Data (CSV):
{{salesData}}

Seasonality Data (Optional):
{{#if seasonalityData}}
{{seasonalityData}}
{{else}}
No seasonality data provided.
{{/if}}

Regional Trends Data (Optional):
{{#if regionalTrendsData}}
{{regionalTrendsData}}
{{else}}
No regional trends data provided.
{{/if}}

Prediction Horizon: {{predictionHorizon}} months

Based on this data, provide the predicted order volume for each month in the prediction horizon, the potential revenue, and insights on potential risks and opportunities. Format the output as a JSON object conforming to the PredictFutureOrdersOutputSchema schema with predictedOrderVolume, potentialRevenue and insights fields. predictedOrderVolume must be an array of {month, volume} objects, and potentialRevenue must be the estimated revenue.
`,
});

const predictFutureOrdersFlow = ai.defineFlow(
  {
    name: 'predictFutureOrdersFlow',
    inputSchema: PredictFutureOrdersInputSchema,
    outputSchema: PredictFutureOrdersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
