import React from 'react';
import { MoreVertical } from 'lucide-react';

interface ColumnHeaderProps {
  title: string;
  isEditing: boolean;
  editTitle: string;
  onEditTitleChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMenu: () => void;
}

export function ColumnHeader({
  title,
  isEditing,
  editTitle,
  onEditTitleChange,
  onSubmit,
  onToggleMenu,
}: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      {isEditing ? (
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => onEditTitleChange(e.target.value)}
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
        <h2 className="font-semibold text-gray-700">{title}</h2>
      )}
      
      <button
        onClick={onToggleMenu}
        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
      >
        <MoreVertical size={20} className="text-gray-600" />
      </button>
    </div>
  );
}