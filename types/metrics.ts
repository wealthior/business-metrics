import { LucideIcon } from 'lucide-react';

export interface Metric {
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel?: string;
  trend: 'up' | 'down' | 'stable';
  icon: LucideIcon;
  iconColor: string;
  sparklineData?: { day: number; value: number }[];
  format?: 'currency' | 'percentage' | 'number';
  invertColors?: boolean;
  href?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  plan: string;
  mrr: number;
  health: number;
  status: 'active' | 'at_risk' | 'churned';
  joinedAt: string;
  lastActive: string;
}

export interface MRRDataPoint {
  date: string;
  mrr: number;
  newMRR: number;
  expansionMRR: number;
  contractionMRR: number;
  churnedMRR: number;
  customers: number;
  arpu: number;
}

export interface CohortData {
  cohort: string;
  size: number;
  retention: number[];
}

export interface AcquisitionChannel {
  channel: string;
  visitors: number;
  signups: number;
  trials: number;
  converted: number;
  cac: number;
  ltv: number;
  conversionRate: number;
}

export interface Activity {
  id: number;
  type: 'subscription' | 'upgrade' | 'risk' | 'payment' | 'trial';
  title: string;
  description: string;
  amount: number | null;
  time: string;
}

export interface RevenueBreakdown {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface RevenueByPlan {
  plan: string;
  customers: number;
  mrr: number;
  percentage: number;
  arpu: number;
  growth: number;
}
