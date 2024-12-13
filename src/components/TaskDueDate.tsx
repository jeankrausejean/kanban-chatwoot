import React from 'react';
import { Clock } from 'lucide-react';

interface TaskDueDateProps {
  dueDate?: string;
}

export function TaskDueDate({ dueDate }: TaskDueDateProps) {
  if (!dueDate) return null;

  return (
    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
      <Clock size={14} />
      <span>{new Date(dueDate).toLocaleDateString('pt-BR')}</span>
    </div>
  );
}