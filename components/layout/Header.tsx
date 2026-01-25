'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Calendar, Download, RefreshCw, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

interface HeaderProps {
  title: string;
  breadcrumb?: string[];
}

/**
 * Sticky header with date picker, export, and refresh controls
 */
export function Header({ title, breadcrumb }: HeaderProps) {
  const currentDate = new Date();
  const dateRange = `${format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), 'MMM d')} - ${format(currentDate, 'MMM d, yyyy')}`;

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {breadcrumb && (
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              {breadcrumb.map((item, index) => (
                <span key={index}>
                  {index > 0 && <span className="mx-2">/</span>}
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Picker */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">{dateRange}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Select Period</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 days</DropdownMenuItem>
              <DropdownMenuItem>This year</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Custom range...</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Compare Toggle */}
          <Button variant="outline" size="sm">
            vs previous period
          </Button>

          {/* Refresh */}
          <Button variant="ghost" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>

          {/* Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PNG</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
