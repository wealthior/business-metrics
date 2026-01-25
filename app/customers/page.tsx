'use client';

import { Header } from '@/components/layout/Header';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { AreaChart } from '@/components/charts/AreaChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, UserMinus, TrendingUp } from 'lucide-react';
import {
  dashboardMetrics,
  generateCustomers,
  generateMRRData,
  churnReasons,
} from '@/lib/mock-data';
import { formatCurrency, formatNumber } from '@/lib/format';

/**
 * Customer analytics page with churn analysis
 */
export default function CustomersPage() {
  const customers = generateCustomers(20);
  const mrrData = generateMRRData(12);

  return (
    <div className="min-h-screen">
      <Header title="Customer Analytics" breadcrumb={['Dashboard', 'Customers']} />

      <div className="p-8 space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Customers"
            value={dashboardMetrics.customers.value}
            change={dashboardMetrics.customers.change}
            trend="up"
            icon={Users}
            iconColor="#6366F1"
            format="number"
          />
          <MetricCard
            title="New This Month"
            value={156}
            change={18.2}
            trend="up"
            icon={UserPlus}
            iconColor="#22C55E"
            format="number"
          />
          <MetricCard
            title="Churned This Month"
            value={38}
            change={-12.5}
            trend="down"
            icon={UserMinus}
            iconColor="#EF4444"
            format="number"
            invertColors
          />
          <MetricCard
            title="Net Growth"
            value={118}
            change={24.3}
            trend="up"
            icon={TrendingUp}
            iconColor="#3B82F6"
            format="number"
          />
        </div>

        {/* Customer Segments & LTV */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Enterprise', count: 45, percentage: 2.4, color: '#6366F1' },
                  { name: 'Pro', count: 312, percentage: 16.9, color: '#22C55E' },
                  { name: 'Basic', count: 1490, percentage: 80.7, color: '#71717A' },
                ].map((segment) => (
                  <div key={segment.name}>
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: segment.color }}
                        />
                        <span className="font-medium">{segment.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{formatNumber(segment.count)}</span>
                        <span className="font-medium tabular-nums w-12 text-right">
                          {segment.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${segment.percentage}%`,
                          backgroundColor: segment.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Lifetime Value</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Average LTV</p>
                <p className="text-4xl font-bold">{formatCurrency(dashboardMetrics.ltv.value)}</p>
                <p className="text-sm text-green-500 mt-1">+{dashboardMetrics.ltv.change}% vs last month</p>
              </div>
              <div className="space-y-3">
                {[
                  { plan: 'Enterprise', ltv: 18000 },
                  { plan: 'Pro', ltv: 2200 },
                  { plan: 'Basic', ltv: 180 },
                ].map((item) => (
                  <div key={item.plan} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.plan}</span>
                    <span className="font-medium">{formatCurrency(item.ltv)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">LTV:CAC Ratio</span>
                  <span className="text-2xl font-bold text-green-500">3.2x</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Growth & Churn Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={mrrData}
                xKey="date"
                yKeys={[
                  { key: 'customers', color: '#6366F1', name: 'Total Customers' },
                ]}
                height={300}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Churn Reasons</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart
                data={churnReasons}
                height={300}
              />
            </CardContent>
          </Card>
        </div>

        {/* Customer Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
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
                    <th className="pb-3 font-medium">Joined</th>
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
                      <td className="py-3 text-sm text-muted-foreground">{customer.joinedAt}</td>
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
