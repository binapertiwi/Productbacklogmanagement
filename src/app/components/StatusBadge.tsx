import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, MinusCircle, Wrench } from 'lucide-react';
import { HealthStatus } from '../data/inspectionTypes';

interface StatusBadgeProps {
  status: HealthStatus;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'pill' | 'dot-label';
}

const statusConfig: Record<HealthStatus, {
  label: string;
  icon: React.ReactNode;
  classes: string;
  dotClass: string;
}> = {
  Good: {
    label: 'Good',
    icon: <CheckCircle2 className="w-3 h-3" />,
    classes: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
    dotClass: 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.4)]',
  },
  Caution: {
    label: 'Caution',
    icon: <AlertTriangle className="w-3 h-3" />,
    classes: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    dotClass: 'bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.4)]',
  },
  Critical: {
    label: 'Critical',
    icon: <XCircle className="w-3 h-3" />,
    classes: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
    dotClass: 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]',
  },
  'N/A': {
    label: 'N/A',
    icon: <MinusCircle className="w-3 h-3" />,
    classes: 'bg-muted text-muted-foreground border-border',
    dotClass: 'bg-muted-foreground/30',
  },
  Monitor: {
    label: 'Monitor',
    icon: <AlertTriangle className="w-3 h-3" />,
    classes: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    dotClass: 'bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.4)]',
  },
  Replace: {
    label: 'Replace Now',
    icon: <Wrench className="w-3 h-3" />,
    classes: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
    dotClass: 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]',
  },
};

export function StatusBadge({ status, size = 'sm', variant = 'badge' }: StatusBadgeProps) {
  const cfg = statusConfig[status] ?? statusConfig['N/A'];

  if (variant === 'dot-label') {
    return (
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dotClass}`} />
        <span className="text-xs font-bold text-foreground">{cfg.label}</span>
      </div>
    );
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }[size];

  return (
    <span className={`inline-flex items-center rounded-md border font-bold uppercase tracking-wide ${sizeClasses} ${cfg.classes}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}
