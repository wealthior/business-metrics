'use client';

import { Header } from '@/components/layout/Header';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { AreaChart } from '@/components/charts/AreaChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import {
  dashboardMetrics,
  generateSparklineData,
  generateMRRData,
  revenueByPlan,
} from '@/lib/mock-data';
import { formatCurrency, formatNumber } from '@/lib/format';
import { Badge } from '@/components/ui/badge';

/**
 * Revenue analytics page with MRR deep-dive
 */
export default function RevenuePage() {
  const mrrData = generateMRRData(12);

  return (
    <div className="min-h-screen">
      <Header title="Revenue Analytics" breadcrumb={['Dashboard', 'Revenue']} />

      <div className="p-8 space-y-6">
        {/* Hero Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard
            title="MRR"
            value={dashboardMetrics.mrr.value}
            change={dashboardMetrics.mrr.change}
            trend="up"
            icon={DollarSign}
            iconColor="#6366F1"
            format="currency"
          />
          <MetricCard
            title="New MRR"
            value={18200}
            change={12.4}
            trend="up"
            icon={TrendingUp}
            iconColor="#22C55E"
            format="currency"
          />
          <MetricCard
            title="Expansion MRR"
            value={8450}
            change={8.7}
            trend="up"
            icon={TrendingUp}
            iconColor="#3B82F6"
            format="currency"
          />
          <MetricCard
            title="Contraction MRR"
            value={3200}
            change={-5.2}
            trend="down"
            icon={TrendingDown}
            iconColor="#F59E0B"
            format="currency"
            invertColors
          />
          <MetricCard
            title="Churned MRR"
            value={5100}
            change={-8.1}
            trend="down"
            icon={TrendingDown}
            iconColor="#EF4444"
            format="currency"
            invertColors
          />
          <MetricCard
            title="Net New MRR"
            value={18350}
            change={15.3}
            trend="up"
            icon={TrendingUp}
            iconColor="#8B5CF6"
            format="currency"
          />
        </div>

        {/* Main Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={mrrData}
              xKey="date"
              yKeys={[
                { key: 'mrr', color: '#6366F1', name: 'Total MRR' },
              ]}
              height={350}
            />
          </CardContent>
        </Card>

        {/* ARPU Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>ARPU Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={mrrData}
                xKey="date"
                yKeys={[
                  { key: 'arpu', color: '#6366F1', name: 'ARPU' },
                ]}
                height={250}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Count</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={mrrData}
                xKey="date"
                yKeys={[
                  { key: 'customers', color: '#22C55E', name: 'Customers' },
                ]}
                height={250}
              />
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Plan Table */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Plan</th>
                    <th className="pb-3 font-medium">Customers</th>
                    <th className="pb-3 font-medium">MRR</th>
                    <th className="pb-3 font-medium">% of Total</th>
                    <th className="pb-3 font-medium">ARPU</th>
                    <th className="pb-3 font-medium">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueByPlan.map((plan) => (
                    <tr key={plan.plan} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                      <td className="py-4">
                        <Badge variant="outline">{plan.plan}</Badge>
                      </td>
                      <td className="py-4 font-medium tabular-nums">
                        {formatNumber(plan.customers)}
                      </td>
                      <td className="py-4 font-medium tabular-nums">
                        {formatCurrency(plan.mrr)}
                      </td>
                      <td className="py-4 text-muted-foreground">
                        {plan.percentage}%
                      </td>
                      <td className="py-4 font-medium tabular-nums">
                        {formatCurrency(plan.arpu)}
                      </td>
                      <td className="py-4">
                        <span className="text-green-500 font-medium">
                          +{plan.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
