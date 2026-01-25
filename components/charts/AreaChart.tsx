'use client';

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/lib/format';

interface AreaChartProps {
  data: any[];
  xKey: string;
  yKeys: { key: string; color: string; name: string }[];
  height?: number;
  stacked?: boolean;
}

/**
 * Reusable area chart component with custom styling
 */
export function AreaChart({
  data,
  xKey,
  yKeys,
  height = 300,
  stacked = false,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data}>
        <defs>
          {yKeys.map((item) => (
            <linearGradient key={item.key} id={`gradient-${item.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={item.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={item.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
        <XAxis
          dataKey={xKey}
          stroke="#71717A"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#71717A"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatCurrency(value, true)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#18181B',
            border: '1px solid #3F3F46',
            borderRadius: '8px',
            padding: '12px',
          }}
          labelStyle={{ color: '#FAFAFA', marginBottom: '8px' }}
          itemStyle={{ color: '#A1A1AA' }}
          formatter={(value: any) => formatCurrency(value)}
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
        {yKeys.map((item) => (
          <Area
            key={item.key}
            type="monotone"
            dataKey={item.key}
            stroke={item.color}
            strokeWidth={2}
            fill={`url(#gradient-${item.key})`}
            name={item.name}
            stackId={stacked ? '1' : undefined}
            isAnimationActive={true}
            animationDuration={800}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
