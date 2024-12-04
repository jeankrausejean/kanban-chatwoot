import React from 'react';
import { X, BarChart2 } from 'lucide-react';
import { BoardStats } from './BoardStats';
import { Task } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
}

export function Sidebar({ isOpen, onClose, tasks }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Estatísticas</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <BoardStats tasks={tasks} />
      </div>
    </div>
  );
}