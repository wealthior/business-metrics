import { addDays, subDays, format, startOfMonth, endOfMonth } from 'date-fns';

/**
 * Generates realistic MRR growth data with some variation
 */
export function generateMRRData(months: number = 12) {
  const data = [];
  let baseMRR = 45000;
  const startDate = subDays(new Date(), months * 30);

  for (let i = 0; i < months; i++) {
    const growth = 1 + (Math.random() * 0.08 + 0.02);
    baseMRR *= growth;

    const newMRR = baseMRR * (0.12 + Math.random() * 0.06);
    const expansionMRR = baseMRR * (0.04 + Math.random() * 0.04);
    const contractionMRR = baseMRR * (0.01 + Math.random() * 0.02);
    const churnedMRR = baseMRR * (0.02 + Math.random() * 0.02);

    data.push({
      date: format(addDays(startDate, i * 30), 'MMM yyyy'),
      mrr: Math.round(baseMRR),
      newMRR: Math.round(newMRR),
      expansionMRR: Math.round(expansionMRR),
      contractionMRR: Math.round(contractionMRR),
      churnedMRR: Math.round(churnedMRR),
      customers: Math.round(baseMRR / 69),
      arpu: Math.round(baseMRR / (baseMRR / 69)),
    });
  }

  return data;
}

/**
 * Generates customer data
 */
export function generateCustomers(count: number = 50) {
  const plans = [
    { name: 'Enterprise', price: 1500, weight: 0.03 },
    { name: 'Pro', price: 149, weight: 0.17 },
    { name: 'Basic', price: 9, weight: 0.80 },
  ];

  const companies = [
    'Acme Corp', 'TechStart', 'DataFlow Inc', 'CloudNine', 'StartupXYZ',
    'MegaCo', 'InnovateTech', 'GrowthLabs', 'ScaleUp', 'DisruptCo',
    'FutureTech', 'AlphaBase', 'BetaWorks', 'GammaLabs', 'DeltaForce',
    'OmegaSoft', 'ZetaCloud', 'NovaStar', 'QuantumLeap', 'NexGen',
    'Velocity Inc', 'Zenith Labs', 'Axiom Tech', 'Catalyst Co', 'Momentum',
    'Paradigm', 'Synergy Labs', 'Vertex Tech', 'Horizon Inc', 'Summit Co',
    'Eclipse Tech', 'Fusion Labs', 'Genesis Co', 'Helix Inc', 'Ignite Labs',
    'Kinetic Tech', 'Nexus Co', 'Orbit Inc', 'Phoenix Labs', 'Quantum Co',
    'Radiant Tech', 'Stellar Inc', 'Titan Labs', 'Unity Co', 'Vortex Inc',
    'Wavelength', 'Xcel Labs', 'Yonder Tech', 'Zenith Co', 'Apex Inc',
  ];

  const statuses = ['active', 'active', 'active', 'active', 'at_risk', 'churned'];

  return Array.from({ length: count }, (_, i) => {
    const planRand = Math.random();
    let plan = plans[2];
    if (planRand < 0.03) plan = plans[0];
    else if (planRand < 0.20) plan = plans[1];

    const health = Math.floor(Math.random() * 60) + 40;
    const status = health > 70 ? 'active' : health > 40 ? 'at_risk' : 'churned';

    return {
      id: `cust_${String(i + 1).padStart(4, '0')}`,
      name: companies[i % companies.length] + (i >= companies.length ? ` ${Math.floor(i / companies.length) + 1}` : ''),
      email: `contact@${companies[i % companies.length].toLowerCase().replace(/\s+/g, '').replace(/inc/g, '').replace(/labs/g, '').replace(/tech/g, '').replace(/co/g, '')}.com`,
      plan: plan.name,
      mrr: plan.price,
      health,
      status,
      joinedAt: format(subDays(new Date(), Math.floor(Math.random() * 365)), 'yyyy-MM-dd'),
      lastActive: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
    };
  });
}

/**
 * Generates cohort retention data
 */
export function generateCohortData() {
  const cohorts = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < 12; i++) {
    const retention = [100];
    let current = 100;

    for (let j = 1; j <= 12 - i; j++) {
      const drop = Math.random() * 15 + 5;
      current = Math.max(current - drop / (j * 0.5 + 1), 20);
      retention.push(Math.round(current));
    }

    cohorts.push({
      cohort: `${months[i]} 2024`,
      size: Math.floor(Math.random() * 150) + 50,
      retention,
    });
  }

  return cohorts;
}

/**
 * Generates channel acquisition data
 */
export function generateAcquisitionData() {
  return [
    { channel: 'Organic Search', visitors: 18500, signups: 890, trials: 445, converted: 148, cac: 45, ltv: 2100, conversionRate: 4.8 },
    { channel: 'Paid Ads', visitors: 12300, signups: 520, trials: 260, converted: 86, cac: 120, ltv: 1800, conversionRate: 4.2 },
    { channel: 'Referral', visitors: 8200, signups: 380, trials: 228, converted: 91, cac: 25, ltv: 3200, conversionRate: 4.6 },
    { channel: 'Social Media', visitors: 6230, signups: 110, trials: 55, converted: 16, cac: 85, ltv: 1200, conversionRate: 1.8 },
    { channel: 'Direct', visitors: 4800, signups: 340, trials: 170, converted: 54, cac: 0, ltv: 2400, conversionRate: 7.1 },
    { channel: 'Email', visitors: 2200, signups: 180, trials: 108, converted: 43, cac: 15, ltv: 2800, conversionRate: 8.2 },
  ];
}

/**
 * Generates sparkline data (last 30 days)
 */
export function generateSparklineData(trend: 'up' | 'down' | 'stable' = 'up') {
  const data = [];
  let value = 50;

  for (let i = 0; i < 30; i++) {
    const change = trend === 'up' ? Math.random() * 3 - 0.5 :
                   trend === 'down' ? Math.random() * 3 - 2.5 :
                   Math.random() * 2 - 1;
    value = Math.max(10, Math.min(90, value + change));
    data.push({ day: i, value: Math.round(value) });
  }

  return data;
}

/**
 * Dashboard metrics
 */
export const dashboardMetrics = {
  mrr: { value: 127450, change: 8.2, trend: 'up' as const },
  arr: { value: 1529400, change: 12.5, trend: 'up' as const },
  customers: { value: 1847, change: 5.3, trend: 'up' as const },
  churn: { value: 2.4, change: -0.8, trend: 'down' as const },
  arpu: { value: 69, change: 3.1, trend: 'up' as const },
  ltv: { value: 2847, change: 7.2, trend: 'up' as const },
  cac: { value: 156, change: -5.4, trend: 'down' as const },
  nrr: { value: 108, change: 2.1, trend: 'up' as const },
};

/**
 * Revenue breakdown
 */
export const revenueBreakdown = [
  { name: 'Subscriptions', value: 91764, percentage: 72, color: '#6366F1' },
  { name: 'Add-ons', value: 22941, percentage: 18, color: '#22C55E' },
  { name: 'Services', value: 12745, percentage: 10, color: '#F59E0B' },
];

/**
 * Recent activity
 */
export const recentActivity = [
  { id: 1, type: 'subscription', title: 'New subscription', description: 'Acme Corp signed up for Pro Plan', amount: 149, time: '2h ago' },
  { id: 2, type: 'upgrade', title: 'Plan upgrade', description: 'TechStart upgraded Basic → Pro', amount: 140, time: '5h ago' },
  { id: 3, type: 'risk', title: 'Churn risk detected', description: 'DataFlow Inc showing low engagement', amount: null, time: '8h ago' },
  { id: 4, type: 'payment', title: 'Payment received', description: 'MegaCo paid invoice #1247', amount: 2400, time: '1d ago' },
  { id: 5, type: 'trial', title: 'New trial started', description: 'StartupXYZ started 14-day trial', amount: null, time: '1d ago' },
];

/**
 * Revenue by plan
 */
export const revenueByPlan = [
  { plan: 'Enterprise', customers: 45, mrr: 67500, percentage: 53, arpu: 1500, growth: 15.2 },
  { plan: 'Pro', customers: 312, mrr: 46488, percentage: 36, arpu: 149, growth: 8.1 },
  { plan: 'Basic', customers: 1490, mrr: 13462, percentage: 11, arpu: 9, growth: 2.3 },
];

/**
 * Churn reasons
 */
export const churnReasons = [
  { name: 'Price', value: 35, color: '#EF4444' },
  { name: 'Features', value: 28, color: '#F59E0B' },
  { name: 'Competition', value: 22, color: '#6366F1' },
  { name: 'Other', value: 15, color: '#71717A' },
];
