'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { generateAcquisitionData } from '@/lib/mock-data';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/format';

/**
 * Acquisition channels and funnel analysis page
 */
export default function AcquisitionPage() {
  const channels = generateAcquisitionData();
  const funnelData = [
    { stage: 'Visitors', count: 45230, percentage: 100, conversion: 4.2 },
    { stage: 'Signups', count: 1900, percentage: 4.2, conversion: 31.6 },
    { stage: 'Activated', count: 601, percentage: 1.3, conversion: 52.4 },
    { stage: 'Converted', count: 315, percentage: 0.7, conversion: 89.2 },
    { stage: 'Retained', count: 281, percentage: 0.6, conversion: null },
  ];

  return (
    <div className="min-h-screen">
      <Header title="Acquisition Analytics" breadcrumb={['Dashboard', 'Acquisition']} />

      <div className="p-8 space-y-6">
        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{stage.stage}</span>
                      <Badge variant="outline">{formatNumber(stage.count)}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        {stage.percentage}% of total
                      </span>
                      {stage.conversion && (
                        <span className="text-green-500 font-medium">
                          {stage.conversion}% conversion
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-zinc-800 rounded-full h-12 overflow-hidden">
                      <div
                        className="h-12 rounded-full flex items-center px-4 transition-all duration-500"
                        style={{
                          width: `${stage.percentage * 10}%`,
                          minWidth: '120px',
                          background: `linear-gradient(to right, #6366F1${Math.floor(100 - index * 15)}, #4F46E5${Math.floor(100 - index * 15)})`,
                        }}
                      >
                        <span className="text-white font-medium">
                          {formatNumber(stage.count)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {index < funnelData.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div className="text-muted-foreground text-sm">
                        ↓ {funnelData[index].conversion}%
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Channel</th>
                    <th className="pb-3 font-medium">Visitors</th>
                    <th className="pb-3 font-medium">Signups</th>
                    <th className="pb-3 font-medium">Converted</th>
                    <th className="pb-3 font-medium">Conv. Rate</th>
                    <th className="pb-3 font-medium">CAC</th>
                    <th className="pb-3 font-medium">LTV</th>
                    <th className="pb-3 font-medium">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {channels.map((channel) => {
                    const roi = channel.cac > 0 ? (channel.ltv / channel.cac).toFixed(0) : '∞';
                    return (
                      <tr key={channel.channel} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                        <td className="py-4">
                          <span className="font-medium">{channel.channel}</span>
                        </td>
                        <td className="py-4 tabular-nums text-muted-foreground">
                          {formatNumber(channel.visitors)}
                        </td>
                        <td className="py-4 tabular-nums font-medium">
                          {formatNumber(channel.signups)}
                        </td>
                        <td className="py-4 tabular-nums font-medium">
                          {formatNumber(channel.converted)}
                        </td>
                        <td className="py-4 tabular-nums">
                          <Badge variant="outline">{channel.conversionRate}%</Badge>
                        </td>
                        <td className="py-4 tabular-nums font-medium">
                          {formatCurrency(channel.cac)}
                        </td>
                        <td className="py-4 tabular-nums font-medium">
                          {formatCurrency(channel.ltv)}
                        </td>
                        <td className="py-4">
                          <Badge variant="success">{roi}x</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>CAC Payback Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">8.2</p>
                <p className="text-muted-foreground mt-2">months</p>
                <p className="text-sm text-green-500 mt-4">-1.2 months vs last quarter</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trial to Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">16.6%</p>
                <p className="text-muted-foreground mt-2">conversion rate</p>
                <p className="text-sm text-green-500 mt-4">+2.4% vs last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average CAC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">{formatCurrency(156)}</p>
                <p className="text-muted-foreground mt-2">per customer</p>
                <p className="text-sm text-red-500 mt-4">+$12 vs last month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
