import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  chartColorVar,
  type ChartConfig,
} from './chart';

vi.mock('recharts', () => ({
  ResponsiveContainer: ({
    children,
    width,
    height,
  }: {
    children?: React.ReactNode;
    width?: string | number;
    height?: string | number;
  }) => (
    <div data-testid="responsive-container" data-width={width} data-height={height}>
      {children}
    </div>
  ),
}));

// ---------------------------------------------------------------------------
// chartColorVar
// ---------------------------------------------------------------------------

describe('chartColorVar', () => {
  it('generates a CSS variable for a simple key', () => {
    expect(chartColorVar('revenue')).toBe('var(--chart-revenue)');
  });

  it('replaces special characters with dashes', () => {
    expect(chartColorVar('pipeline/runs')).toBe('var(--chart-pipeline-runs)');
  });

  it('preserves alphanumeric, underscore, and dash characters', () => {
    expect(chartColorVar('series_1-a')).toBe('var(--chart-series_1-a)');
  });
});

// ---------------------------------------------------------------------------
// ChartContainer
// ---------------------------------------------------------------------------

describe('ChartContainer', () => {
  const config: ChartConfig = {
    revenue: { label: 'Revenue', color: '#4ade80' },
    expenses: { label: 'Expenses', color: '#f87171' },
  };

  it('renders children', () => {
    const { getByText } = render(
      <ChartContainer config={config}>
        <span>Chart goes here</span>
      </ChartContainer>
    );
    expect(getByText('Chart goes here')).toBeTruthy();
  });

  it('wraps children in ResponsiveContainer', () => {
    const { getByTestId } = render(
      <ChartContainer config={config}>
        <span>child</span>
      </ChartContainer>
    );
    expect(getByTestId('responsive-container')).toBeTruthy();
  });

  it('injects CSS vars for each series color', () => {
    const { container } = render(
      <ChartContainer config={config}>
        <span>chart</span>
      </ChartContainer>
    );
    const root = container.firstChild as HTMLElement;
    const style = root.getAttribute('style') ?? '';
    expect(style).toContain('--chart-revenue');
    expect(style).toContain('#4ade80');
    expect(style).toContain('--chart-expenses');
    expect(style).toContain('#f87171');
  });

  it('does not inject CSS var for series without color', () => {
    const configNoColor: ChartConfig = { label: { label: 'Label only' } };
    const { container } = render(
      <ChartContainer config={configNoColor}>
        <span>chart</span>
      </ChartContainer>
    );
    const root = container.firstChild as HTMLElement;
    const style = root.getAttribute('style') ?? '';
    expect(style).not.toContain('--chart-label');
  });

  it('applies custom className', () => {
    const { container } = render(
      <ChartContainer config={config} className="custom-chart">
        <span>chart</span>
      </ChartContainer>
    );
    expect((container.firstChild as HTMLElement).className).toContain('custom-chart');
  });

  it('passes height to ResponsiveContainer', () => {
    const { getByTestId } = render(
      <ChartContainer config={config} height={200}>
        <span>chart</span>
      </ChartContainer>
    );
    expect(getByTestId('responsive-container').getAttribute('data-height')).toBe('200');
  });

  it('sets data-chart attribute on the wrapper', () => {
    const { container } = render(
      <ChartContainer config={config}>
        <span>chart</span>
      </ChartContainer>
    );
    expect((container.firstChild as HTMLElement).getAttribute('data-chart')).toBeTruthy();
  });

  it('throws when Chart components used outside ChartContainer', () => {
    const errorSpy = vi.spyOn(globalThis.console, 'error').mockImplementation(() => undefined);
    try {
      expect(() => {
        render(<ChartTooltipContent active payload={[{ dataKey: 'revenue', value: 100 }]} />);
      }).toThrow('Chart components must be used inside <ChartContainer>.');
    } finally {
      errorSpy.mockRestore();
    }
  });
});

// ---------------------------------------------------------------------------
// ChartTooltipContent
// ---------------------------------------------------------------------------

describe('ChartTooltipContent', () => {
  const config: ChartConfig = {
    revenue: { label: 'Revenue', color: '#4ade80' },
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ChartContainer config={config}>{children}</ChartContainer>
  );

  it('returns null when active is false', () => {
    const { container } = render(
      <ChartTooltipContent active={false} payload={[{ dataKey: 'revenue', value: 100 }]} />,
      { wrapper }
    );
    // Tooltip renders null — no min-w-[180px] tooltip div present
    expect(container.querySelector('[class*="min-w"]')).toBeNull();
  });

  it('returns null when active is true but payload is empty', () => {
    const { container } = render(<ChartTooltipContent active payload={[]} />, { wrapper });
    expect(container.querySelector('[class*="min-w"]')).toBeNull();
  });

  it('returns null when active is true but payload is undefined', () => {
    const { container } = render(<ChartTooltipContent active />, { wrapper });
    expect(container.querySelector('[class*="min-w"]')).toBeNull();
  });

  it('returns null when active is undefined', () => {
    const { container } = render(
      <ChartTooltipContent payload={[{ dataKey: 'revenue', value: 100 }]} />,
      { wrapper }
    );
    expect(container.querySelector('[class*="min-w"]')).toBeNull();
  });

  it('renders tooltip content when active with payload', () => {
    const { container } = render(
      <ChartTooltipContent active payload={[{ dataKey: 'revenue', value: 500 }]} />,
      { wrapper }
    );
    expect(container.querySelector('[class*="min-w"]')).not.toBeNull();
  });

  it('renders series label from config', () => {
    const { getByText } = render(
      <ChartTooltipContent active payload={[{ dataKey: 'revenue', value: 500 }]} />,
      { wrapper }
    );
    expect(getByText('Revenue')).toBeTruthy();
  });

  it('renders formatted numeric value', () => {
    const { getByText } = render(
      <ChartTooltipContent active payload={[{ dataKey: 'revenue', value: 1000 }]} />,
      { wrapper }
    );
    expect(getByText('1,000')).toBeTruthy();
  });

  it('renders label when provided and hideLabel is false', () => {
    const { getByText } = render(
      <ChartTooltipContent active payload={[{ dataKey: 'revenue', value: 100 }]} label="Q1 2026" />,
      { wrapper }
    );
    expect(getByText('Q1 2026')).toBeTruthy();
  });

  it('hides label when hideLabel is true', () => {
    const { queryByText } = render(
      <ChartTooltipContent
        active
        payload={[{ dataKey: 'revenue', value: 100 }]}
        label="Q1 2026"
        hideLabel
      />,
      { wrapper }
    );
    expect(queryByText('Q1 2026')).toBeNull();
  });

  it('uses labelFormatter when provided', () => {
    const { getByText } = render(
      <ChartTooltipContent
        active
        payload={[{ dataKey: 'revenue', value: 100 }]}
        label="raw"
        labelFormatter={(_label) => 'Formatted Label'}
      />,
      { wrapper }
    );
    expect(getByText('Formatted Label')).toBeTruthy();
  });

  it('uses valueFormatter when provided', () => {
    const { getByText } = render(
      <ChartTooltipContent
        active
        payload={[{ dataKey: 'revenue', value: 100 }]}
        valueFormatter={() => '$100.00'}
      />,
      { wrapper }
    );
    expect(getByText('$100.00')).toBeTruthy();
  });

  it('renders color swatch when series has no icon', () => {
    const { container } = render(
      <ChartTooltipContent active payload={[{ dataKey: 'revenue', value: 100 }]} />,
      { wrapper }
    );
    // Swatch is a span with rounded-full
    expect(container.querySelector('.rounded-full')).toBeTruthy();
  });

  it('renders series icon when configured', () => {
    const IconComponent = ({ className }: { className?: string }) => (
      <svg data-testid="series-icon" className={className} />
    );
    const configWithIcon: ChartConfig = {
      revenue: { label: 'Revenue', icon: IconComponent },
    };
    const wrapperWithIcon = ({ children }: { children: React.ReactNode }) => (
      <ChartContainer config={configWithIcon}>{children}</ChartContainer>
    );
    const { getByTestId } = render(
      <ChartTooltipContent active payload={[{ dataKey: 'revenue', value: 100 }]} />,
      { wrapper: wrapperWithIcon }
    );
    expect(getByTestId('series-icon')).toBeTruthy();
  });

  it('falls back to em dash for null value', () => {
    const { getByText } = render(
      <ChartTooltipContent active payload={[{ dataKey: 'revenue', value: null }]} />,
      { wrapper }
    );
    expect(getByText('—')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ChartTooltipContent
        active
        payload={[{ dataKey: 'revenue', value: 1 }]}
        className="my-tooltip"
      />,
      { wrapper }
    );
    expect(container.querySelector('.my-tooltip')).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// ChartLegendContent
// ---------------------------------------------------------------------------

describe('ChartLegendContent', () => {
  const config: ChartConfig = {
    revenue: { label: 'Revenue', color: '#4ade80' },
    expenses: { label: 'Expenses', color: '#f87171' },
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ChartContainer config={config}>{children}</ChartContainer>
  );

  it('returns null when payload is undefined', () => {
    const { container } = render(<ChartLegendContent />, { wrapper });
    // Legend renders null — no flex-wrap legend div present
    expect(container.querySelector('[class*="flex-wrap"]')).toBeNull();
  });

  it('returns null when payload is empty', () => {
    const { container } = render(<ChartLegendContent payload={[]} />, { wrapper });
    expect(container.querySelector('[class*="flex-wrap"]')).toBeNull();
  });

  it('renders legend items for each payload entry', () => {
    const { getByText } = render(
      <ChartLegendContent
        payload={[
          { dataKey: 'revenue', value: 100 },
          { dataKey: 'expenses', value: 80 },
        ]}
      />,
      { wrapper }
    );
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('Expenses')).toBeTruthy();
  });

  it('renders color swatch when series has no icon', () => {
    const { container } = render(
      <ChartLegendContent payload={[{ dataKey: 'revenue', value: 100 }]} />,
      { wrapper }
    );
    expect(container.querySelector('.rounded-full')).toBeTruthy();
  });

  it('renders series icon when configured', () => {
    const IconComponent = ({ className }: { className?: string }) => (
      <svg data-testid="legend-icon" className={className} />
    );
    const configWithIcon: ChartConfig = {
      revenue: { label: 'Revenue', icon: IconComponent },
    };
    const wrapperWithIcon = ({ children }: { children: React.ReactNode }) => (
      <ChartContainer config={configWithIcon}>{children}</ChartContainer>
    );
    const { getByTestId } = render(
      <ChartLegendContent payload={[{ dataKey: 'revenue', value: 100 }]} />,
      { wrapper: wrapperWithIcon }
    );
    expect(getByTestId('legend-icon')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ChartLegendContent payload={[{ dataKey: 'revenue', value: 100 }]} className="my-legend" />,
      { wrapper }
    );
    expect(container.querySelector('.my-legend')).not.toBeNull();
  });

  it('uses item.name as fallback label when no config entry', () => {
    const { getByText } = render(
      <ChartLegendContent payload={[{ name: 'Unknown Series', value: 50 }]} />,
      { wrapper }
    );
    expect(getByText('Unknown Series')).toBeTruthy();
  });
});
