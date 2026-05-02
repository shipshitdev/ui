import { describe, expect, it } from 'vitest';
import { ChartContainer, ChartLegendContent, ChartTooltipContent, chartColorVar } from './index';

describe('public charts contract', () => {
  it('exports the shared chart shell', () => {
    expect(ChartContainer).toBeTruthy();
    expect(ChartTooltipContent).toBeTruthy();
    expect(ChartLegendContent).toBeTruthy();
  });

  it('generates stable CSS variables for data keys', () => {
    expect(chartColorVar('revenue')).toBe('var(--chart-revenue)');
    expect(chartColorVar('pipeline/runs')).toBe('var(--chart-pipeline-runs)');
  });
});
