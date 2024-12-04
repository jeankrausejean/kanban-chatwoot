import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import { Clock, Tag, User, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {task.labels.map((label) => (
          <div
            key={label}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300"
          >
            <Tag size={12} />
            {label}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {task.assignee && (
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <User size={14} />
              <span>{task.assignee}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {task.dueDate && (
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <Clock size={14} />
              <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
          
          <span className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            priorityColors[task.priority]
          )}>
            {priorityLabels[task.priority]}
          </span>
        </div>
      </div>
    </div>
  );
}