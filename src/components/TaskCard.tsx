import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import { Trash2 } from 'lucide-react';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { TaskLabels } from './TaskLabels';
import { TaskDueDate } from './TaskDueDate';
import { TaskContactInfo } from './TaskContactInfo';

interface TaskCardProps {
  task: Task;
  columnId: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, columnId, onEdit, onDelete }: TaskCardProps) {
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

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onDelete();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-md transition-shadow"
      onClick={onEdit}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{task.description}</p>
      
      <TaskContactInfo task={task} />
      <TaskLabels labels={task.labels} />

      <div className="flex items-center justify-between text-sm">
        <TaskDueDate dueDate={task.dueDate} />
        <TaskPriorityBadge priority={task.priority} />
      </div>
    </div>
  );
}