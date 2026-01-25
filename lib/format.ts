/**
 * Formats a number as currency
 */
export function formatCurrency(value: number, compact = false): string {
  if (compact) {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a number with thousands separators
 */
export function formatNumber(value: number, compact = false): string {
  if (compact) {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  }
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Formats a number as a percentage
 */
export function formatPercentage(value: number, decimals = 1, includeSign = true): string {
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Formats a delta value with color and icon information
 */
export function formatDelta(value: number, invert = false): {
  text: string;
  color: 'green' | 'red' | 'gray';
  icon: 'up' | 'down' | 'neutral';
} {
  const isPositive = invert ? value < 0 : value > 0;
  return {
    text: formatPercentage(value),
    color: value === 0 ? 'gray' : isPositive ? 'green' : 'red',
    icon: value > 0 ? 'up' : value < 0 ? 'down' : 'neutral',
  };
}
