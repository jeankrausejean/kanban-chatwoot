import React from 'react';
import { Edit2, Trash2, Palette } from 'lucide-react';

interface ColumnMenuProps {
  onEdit: () => void;
  onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  currentColor: string;
}

export function ColumnMenu({
  onEdit,
  onColorChange,
  onDelete,
  currentColor,
}: ColumnMenuProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
      <div className="py-1">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
        >
          <Edit2 size={16} />
          Renomear
        </button>
        <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Palette size={16} />
          <input
            type="color"
            value={currentColor}
            onChange={onColorChange}
            className="w-6 h-6 p-0 border-0"
          />
        </div>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
        >
          <Trash2 size={16} />
          Excluir Lista
        </button>
      </div>
    </div>
  );
}