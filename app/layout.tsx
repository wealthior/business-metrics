import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MetricsHub | Startup Analytics Dashboard Demo",
  description: "SaaS metrics dashboard showcasing MRR, churn, cohort analysis, and revenue analytics. Built by Roberto Mazzotta.",
  keywords: "SaaS metrics, startup analytics, MRR dashboard, churn analysis, cohort retention, Next.js",
  authors: [{ name: "Roberto Mazzotta", url: "https://mazzotta.dev" }],
  openGraph: {
    title: "MetricsHub - SaaS Analytics Dashboard",
    description: "Track MRR, churn, cohorts, and revenue with this premium analytics dashboard",
    url: "https://metrics.mazzotta.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-zinc-950">
          <Sidebar />
          <main className="flex-1 ml-64">
            {children}
            <footer className="border-t border-zinc-800 py-6 px-8 text-center text-sm text-muted-foreground">
              Built by{" "}
              <a
                href="https://mazzotta.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Roberto Mazzotta
              </a>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
