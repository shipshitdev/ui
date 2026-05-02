import type { Meta, StoryObj } from '@storybook/react-vite';
import { Activity, Coins } from 'lucide-react';
import {
  CartesianGrid,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  chartColorVar,
} from './index';

const data = [
  { day: 'Mon', revenue: 3200, runs: 18 },
  { day: 'Tue', revenue: 4100, runs: 23 },
  { day: 'Wed', revenue: 3900, runs: 21 },
  { day: 'Thu', revenue: 5200, runs: 28 },
  { day: 'Fri', revenue: 6100, runs: 34 },
];

const config = {
  revenue: {
    label: 'Revenue',
    color: '#38bdf8',
    icon: Coins,
  },
  runs: {
    label: 'Runs',
    color: '#f59e0b',
    icon: Activity,
  },
};

const meta: Meta<typeof ChartContainer> = {
  title: 'Charts/ChartContainer',
  component: ChartContainer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
  render: () => (
    <main className="min-h-screen bg-primary p-8">
      <ChartContainer config={config} className="mx-auto max-w-4xl" height={320}>
        <LineChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--text-muted)' }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
          <Tooltip content={<ChartTooltipContent />} cursor={{ stroke: 'var(--border-strong)' }} />
          <Legend content={<ChartLegendContent />} />
          <Line
            dataKey="revenue"
            name="Revenue"
            stroke={chartColorVar('revenue')}
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            dataKey="runs"
            name="Runs"
            stroke={chartColorVar('runs')}
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </main>
  ),
};
