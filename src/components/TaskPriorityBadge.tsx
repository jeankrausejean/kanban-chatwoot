import React from 'react';
import { cn } from '../utils/cn';

interface TaskPriorityBadgeProps {
  priority: 'low' | 'medium' | 'high';
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  return (
    <span className={cn(
      'px-2 py-1 rounded-full text-xs font-medium',
      priorityColors[priority]
    )}>
      {priorityLabels[priority]}
    </span>
  );
}