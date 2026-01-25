'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateCohortData } from '@/lib/mock-data';
import { formatNumber } from '@/lib/format';

/**
 * Cohort retention analysis page with heatmap
 */
export default function CohortsPage() {
  const cohorts = generateCohortData();

  const getColorForRetention = (value: number) => {
    if (value >= 80) return '#22C55E';
    if (value >= 60) return '#84CC16';
    if (value >= 40) return '#F59E0B';
    if (value >= 20) return '#F97316';
    return '#EF4444';
  };

  return (
    <div className="min-h-screen">
      <Header title="Cohort Analysis" breadcrumb={['Dashboard', 'Cohorts']} />

      <div className="p-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Average M1 Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">82%</p>
                <p className="text-sm text-green-500 mt-2">+3% vs previous cohorts</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average M6 Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">58%</p>
                <p className="text-sm text-green-500 mt-2">+2% vs previous cohorts</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Net Revenue Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">108%</p>
                <p className="text-sm text-green-500 mt-2">Above target (100%)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cohort Retention Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Cohort Retention Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="pb-3 pr-4 text-left font-medium text-muted-foreground sticky left-0 bg-card">
                      Cohort
                    </th>
                    <th className="pb-3 px-2 text-center font-medium text-muted-foreground">
                      Size
                    </th>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                      <th key={month} className="pb-3 px-2 text-center font-medium text-muted-foreground">
                        M{month}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cohorts.map((cohort, cohortIndex) => (
                    <tr key={cohort.cohort} className="border-b border-zinc-800/50">
                      <td className="py-2 pr-4 font-medium sticky left-0 bg-card">
                        {cohort.cohort}
                      </td>
                      <td className="py-2 px-2 text-center text-muted-foreground">
                        {formatNumber(cohort.size)}
                      </td>
                      {cohort.retention.map((retention, monthIndex) => (
                        <td
                          key={monthIndex}
                          className="py-2 px-2 text-center font-medium"
                          style={{
                            backgroundColor: `${getColorForRetention(retention)}20`,
                            color: getColorForRetention(retention),
                          }}
                        >
                          {retention}%
                        </td>
                      ))}
                      {Array.from({ length: 13 - cohort.retention.length }).map((_, i) => (
                        <td key={`empty-${i}`} className="py-2 px-2 bg-zinc-900/30" />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <span className="text-muted-foreground">Retention:</span>
              {[
                { label: '80%+', color: '#22C55E' },
                { label: '60-79%', color: '#84CC16' },
                { label: '40-59%', color: '#F59E0B' },
                { label: '20-39%', color: '#F97316' },
                { label: '<20%', color: '#EF4444' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cohort Size Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Cohort Sizes Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cohorts.map((cohort) => (
                <div key={cohort.cohort}>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="font-medium">{cohort.cohort}</span>
                    <span className="text-muted-foreground">{formatNumber(cohort.size)} customers</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-indigo-500"
                      style={{
                        width: `${(cohort.size / 200) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
