'use client';

import { Header } from '@/components/layout/Header';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { AreaChart } from '@/components/charts/AreaChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  Users,
  UserMinus,
  ArrowUpRight,
  AlertTriangle,
} from 'lucide-react';
import {
  dashboardMetrics,
  generateSparklineData,
  generateMRRData,
  revenueBreakdown,
  recentActivity,
  generateCustomers,
} from '@/lib/mock-data';
import { formatCurrency, formatNumber } from '@/lib/format';

/**
 * Main dashboard page with overview metrics
 */
export default function DashboardPage() {
  const mrrData = generateMRRData(12);
  const customers = generateCustomers(10);

  return (
    <div className="min-h-screen">
      <Header title="Dashboard" breadcrumb={['Dashboard']} />

      <div className="p-8 space-y-6">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Monthly Recurring Revenue"
            value={dashboardMetrics.mrr.value}
            change={dashboardMetrics.mrr.change}
            trend={dashboardMetrics.mrr.trend}
            icon={DollarSign}
            iconColor="#6366F1"
            format="currency"
            sparklineData={generateSparklineData('up')}
            href="/revenue"
          />
          <MetricCard
            title="Annual Recurring Revenue"
            value={dashboardMetrics.arr.value}
            change={dashboardMetrics.arr.change}
            trend={dashboardMetrics.arr.trend}
            icon={TrendingUp}
            iconColor="#22C55E"
            format="currency"
            sparklineData={generateSparklineData('up')}
            href="/revenue"
          />
          <MetricCard
            title="Active Customers"
            value={dashboardMetrics.customers.value}
            change={dashboardMetrics.customers.change}
            trend={dashboardMetrics.customers.trend}
            icon={Users}
            iconColor="#3B82F6"
            format="number"
            sparklineData={generateSparklineData('up')}
            href="/customers"
          />
          <MetricCard
            title="Churn Rate"
            value={dashboardMetrics.churn.value}
            change={dashboardMetrics.churn.change}
            trend={dashboardMetrics.churn.trend}
            icon={UserMinus}
            iconColor="#F59E0B"
            format="percentage"
            sparklineData={generateSparklineData('down')}
            invertColors
            href="/customers"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MRR Growth Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>MRR Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={mrrData}
                xKey="date"
                yKeys={[
                  { key: 'newMRR', color: '#6366F1', name: 'New MRR' },
                  { key: 'expansionMRR', color: '#22C55E', name: 'Expansion MRR' },
                ]}
                height={300}
                stacked
              />
            </CardContent>
          </Card>

          {/* Revenue Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart
                data={revenueBreakdown}
                height={300}
                centerLabel="Total MRR"
                centerValue={formatCurrency(
                  revenueBreakdown.reduce((sum, item) => sum + item.value, 0),
                  true
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Health Score */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Health Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#27272A"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#6366F1"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(78 / 100) * 2 * Math.PI * 56} ${2 * Math.PI * 56}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold">78</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Engagement', value: 82, color: '#6366F1' },
                  { label: 'Feature Adoption', value: 71, color: '#22C55E' },
                  { label: 'Support Tickets', value: 89, color: '#F59E0B' },
                  { label: 'Payment Health', value: 95, color: '#3B82F6' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-amber-500">
                  3 accounts need attention
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === 'subscription' || activity.type === 'payment'
                            ? 'bg-green-500'
                            : activity.type === 'risk'
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      {activity.amount && (
                        <p className="text-sm font-medium text-green-500 mt-1">
                          {formatCurrency(activity.amount)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Plan</th>
                    <th className="pb-3 font-medium">MRR</th>
                    <th className="pb-3 font-medium">Health</th>
                    <th className="pb-3 font-medium">Last Active</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge variant="outline">{customer.plan}</Badge>
                      </td>
                      <td className="py-3 font-medium tabular-nums">
                        {formatCurrency(customer.mrr)}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-zinc-800 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full"
                              style={{
                                width: `${customer.health}%`,
                                backgroundColor:
                                  customer.health > 70
                                    ? '#22C55E'
                                    : customer.health > 40
                                    ? '#F59E0B'
                                    : '#EF4444',
                              }}
                            />
                          </div>
                          <span className="text-sm tabular-nums">{customer.health}</span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">{customer.lastActive}</td>
                      <td className="py-3">
                        <Badge
                          variant={
                            customer.status === 'active'
                              ? 'success'
                              : customer.status === 'at_risk'
                              ? 'warning'
                              : 'danger'
                          }
                        >
                          {customer.status.replace('_', ' ')}
                        </Badge>
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
