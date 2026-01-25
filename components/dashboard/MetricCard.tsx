'use client';

import { Card } from '@/components/ui/card';
import { Sparkline } from '@/components/charts/Sparkline';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/format';
import { MetricCardProps } from '@/types/metrics';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Animated metric card with sparkline and delta indicator
 */
export function MetricCard({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  trend,
  icon: Icon,
  iconColor,
  sparklineData,
  format = 'number',
  invertColors = false,
  href,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    const duration = 1000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formatValue = (val: number) => {
    if (format === 'currency') return formatCurrency(val);
    if (format === 'percentage') return `${val.toFixed(1)}%`;
    return formatNumber(val);
  };

  const deltaColor = invertColors
    ? change < 0
      ? 'text-green-500'
      : 'text-red-500'
    : change > 0
    ? 'text-green-500'
    : 'text-red-500';

  const DeltaIcon = change > 0 ? ArrowUp : change < 0 ? ArrowDown : Minus;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-3xl font-bold tabular-nums tracking-tight">
              {formatValue(displayValue)}
            </h3>
          </div>
          <div
            className={`p-3 rounded-full transition-transform group-hover:scale-110`}
            style={{ backgroundColor: `${iconColor}15` }}
          >
            <Icon className="w-5 h-5" style={{ color: iconColor }} />
          </div>
        </div>

        {sparklineData && (
          <div className="mb-3 -mx-2">
            <Sparkline data={sparklineData} color={iconColor} />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1 text-sm font-medium ${deltaColor}`}>
            <DeltaIcon className="w-4 h-4" />
            <span>{formatPercentage(Math.abs(change))}</span>
          </div>
          <p className="text-xs text-muted-foreground">{changeLabel}</p>
        </div>
      </Card>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
