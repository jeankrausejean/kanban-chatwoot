import React from 'react';
import { Building2, Mail, Phone, User } from 'lucide-react';
import { Task } from '../types';

interface TaskContactInfoProps {
  task: Task;
}

export function TaskContactInfo({ task }: TaskContactInfoProps) {
  if (!task.contactName && !task.companyName && !task.email && !task.phone) {
    return null;
  }

  return (
    <div className="space-y-2 mb-3 border-t border-b border-gray-100 dark:border-gray-700 py-2">
      {task.contactName && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <User size={14} className="flex-shrink-0" />
          <span className="truncate">{task.contactName}</span>
        </div>
      )}
      
      {task.companyName && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Building2 size={14} className="flex-shrink-0" />
          <span className="truncate">{task.companyName}</span>
        </div>
      )}
      
      {task.email && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Mail size={14} className="flex-shrink-0" />
          <a 
            href={`mailto:${task.email}`}
            className="truncate hover:text-blue-500 dark:hover:text-blue-400"
            onClick={(e) => e.stopPropagation()}
          >
            {task.email}
          </a>
        </div>
      )}
      
      {task.phone && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Phone size={14} className="flex-shrink-0" />
          <a 
            href={`tel:${task.phone}`}
            className="truncate hover:text-blue-500 dark:hover:text-blue-400"
            onClick={(e) => e.stopPropagation()}
          >
            {task.phone}
          </a>
        </div>
      )}
    </div>
  );
}