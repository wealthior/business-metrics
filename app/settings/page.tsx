'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle } from 'lucide-react';

/**
 * Settings page with demo mode information
 */
export default function SettingsPage() {
  const integrations = [
    { name: 'Stripe', connected: true, description: 'Payment processing and subscription management' },
    { name: 'Chargebee', connected: false, description: 'Subscription billing platform' },
    { name: 'HubSpot', connected: true, description: 'CRM and marketing automation' },
    { name: 'Segment', connected: false, description: 'Customer data platform' },
    { name: 'Slack', connected: true, description: 'Team communication and notifications' },
    { name: 'Intercom', connected: false, description: 'Customer messaging platform' },
  ];

  const teamMembers = [
    { name: 'Roberto Mazzotta', email: 'roberto@metricshub.com', role: 'Admin' },
    { name: 'Sarah Chen', email: 'sarah@metricshub.com', role: 'Member' },
    { name: 'Mike Johnson', email: 'mike@metricshub.com', role: 'Member' },
  ];

  return (
    <div className="min-h-screen">
      <Header title="Settings" breadcrumb={['Dashboard', 'Settings']} />

      <div className="p-8 space-y-6 max-w-5xl">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic configuration for your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                <p className="mt-1 text-base">Acme Inc</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                <p className="mt-1 text-base">UTC+1</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Currency</label>
                <p className="mt-1 text-base">USD ($)</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Fiscal Year Start</label>
                <p className="mt-1 text-base">January</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Metrics Configuration</CardTitle>
            <CardDescription>Customize how metrics are calculated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">MRR Calculation Method</label>
              <p className="mt-1 text-base">Contract Value</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Trial Length</label>
              <p className="mt-1 text-base">14 days</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Churn Definition</label>
              <p className="mt-1 text-base">Subscription cancellation</p>
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect your data sources and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-start gap-3 p-4 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
                >
                  <div className="mt-0.5">
                    {integration.connected ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-zinc-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-medium">{integration.name}</h4>
                      <Badge variant={integration.connected ? 'success' : 'outline'}>
                        {integration.connected ? 'Connected' : 'Not connected'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage who has access to your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.email}
                  className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>
                    {member.role}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Invite Team Member
            </Button>
          </CardContent>
        </Card>

        {/* Demo Mode Notice */}
        <Card className="border-indigo-500/50 bg-indigo-500/5">
          <CardHeader>
            <CardTitle>Demo Mode</CardTitle>
            <CardDescription>This is a portfolio demonstration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This dashboard is a portfolio demo showcasing SaaS analytics capabilities. All data is
              simulated for demonstration purposes. If you&apos;d like a custom analytics dashboard built
              for your startup, get in touch!
            </p>
            <div className="flex gap-3">
              <Button className="bg-indigo-500 hover:bg-indigo-600">
                Get Started with MetricsHub
              </Button>
              <Button variant="outline" asChild>
                <a href="https://mazzotta.dev" target="_blank" rel="noopener noreferrer">
                  Contact Roberto
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
