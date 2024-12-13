import React from 'react';
import { Tag } from 'lucide-react';

interface TaskLabelsProps {
  labels: string[];
}

export function TaskLabels({ labels }: TaskLabelsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {labels.map((label) => (
        <div
          key={label}
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300"
        >
          <Tag size={12} />
          {label}
        </div>
      ))}
    </div>
  );
}