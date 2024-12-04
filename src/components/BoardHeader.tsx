import React, { useState } from 'react';
import { Layout, Plus, Edit2, BarChart2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useBoardStore } from '../store/boardStore';

interface BoardHeaderProps {
  onAddColumn: () => void;
  onToggleStats: () => void;
}

export function BoardHeader({ onAddColumn, onToggleStats }: BoardHeaderProps) {
  const { board, updateBoardTitle } = useBoardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBoardTitle(title);
    setIsEditing(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            {isEditing ? (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Salvar
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {board.title}
                </h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleStats}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Ver estatísticas"
            >
              <BarChart2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <ThemeToggle />
            <button
              onClick={onAddColumn}
              className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Nova Lista
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}