# MetricsHub - Startup Analytics Dashboard

A premium SaaS metrics dashboard built with Next.js 14, showcasing MRR, churn, cohort analysis, and revenue analytics. Built by [Roberto Mazzotta](https://mazzotta.dev).

![MetricsHub Dashboard](https://via.placeholder.com/1200x630/09090B/6366F1?text=MetricsHub)

## Features

- **Real-time Metrics**: MRR, ARR, Active Customers, Churn Rate
- **Revenue Analytics**: Deep-dive into MRR growth, ARPU trends, revenue breakdown
- **Customer Analytics**: Customer health scores, LTV analysis, churn reasons
- **Acquisition Funnel**: Channel performance, CAC, conversion rates
- **Cohort Analysis**: Retention heatmaps, cohort-based insights
- **Premium Dark Theme**: Glassmorphism effects, smooth animations
- **Fully Responsive**: Works beautifully on desktop, tablet, and mobile
- **No Backend Required**: All data is generated client-side for demo purposes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Tables**: @tanstack/react-table
- **Animations**: Framer Motion
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/startup-metrics-dashboard.git
cd startup-metrics-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/startup-metrics-dashboard)

Or manually:

```bash
npm install -g vercel
vercel --prod
```

### Other Platforms

The dashboard can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Docker

## Project Structure

```
startup-metrics-dashboard/
├── app/                      # Next.js 14 App Router
│   ├── dashboard/           # Main dashboard page
│   ├── revenue/             # Revenue analytics
│   ├── customers/           # Customer analytics
│   ├── acquisition/         # Acquisition funnel
│   ├── cohorts/             # Cohort analysis
│   ├── settings/            # Settings page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Layout components
│   ├── dashboard/           # Dashboard-specific components
│   └── charts/              # Chart components
├── lib/
│   ├── utils.ts             # Utility functions
│   ├── format.ts            # Number formatting
│   ├── mock-data.ts         # Demo data generation
│   └── calculations.ts      # Metric calculations
├── types/
│   └── metrics.ts           # TypeScript definitions
└── public/                  # Static assets
```

## Features Deep-Dive

### Dashboard Page

- Key metrics cards with sparklines
- MRR growth area chart
- Revenue breakdown donut chart
- Customer health score widget
- Recent activity feed
- Top customers table

### Revenue Page

- MRR movement waterfall
- Revenue over time with annotations
- ARPU trends by plan
- Revenue by plan breakdown table

### Customers Page

- Customer segmentation visualization
- LTV analysis
- Churn rate trends
- Churn reason breakdown
- Customer health scores
- Full customer table with filters

### Acquisition Page

- Conversion funnel visualization
- Channel performance comparison
- CAC payback period
- Trial to paid conversion metrics

### Cohorts Page

- Retention heatmap (12-month)
- Cohort size visualization
- Net Revenue Retention
- Cohort comparison tools

## Customization

### Colors

Edit the color scheme in `app/globals.css`:

```css
:root {
  --primary: 239 84% 67%;  /* Indigo-500 */
  --background: 224 71.4% 4.1%;  /* Zinc-950 */
  /* ... */
}
```

### Mock Data

Customize demo data in `lib/mock-data.ts`:

```typescript
export const dashboardMetrics = {
  mrr: { value: 127450, change: 8.2, trend: 'up' },
  // ...
};
```

### Components

All components are modular and can be customized:
- `components/dashboard/MetricCard.tsx` - Metric display cards
- `components/charts/*` - All chart types
- `components/layout/*` - Sidebar, Header

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2.5s
- Bundle size: ~250KB (gzipped)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this for your portfolio or projects.

## Credits

Built by [Roberto Mazzotta](https://mazzotta.dev)

- Design: Custom SaaS metrics dashboard
- Icons: [Lucide Icons](https://lucide.dev)
- Charts: [Recharts](https://recharts.org)
- UI Components: [shadcn/ui](https://ui.shadcn.com)

## Contact

For custom dashboard development or inquiries:

- Website: [mazzotta.dev](https://mazzotta.dev)
- Email: roberto@mazzotta.dev
- GitHub: [@yourusername](https://github.com/yourusername)

---

**Note**: This is a portfolio demo. All data is simulated for demonstration purposes. For production use with real data, integrate with your analytics platform (Stripe, Chargebee, etc.).
