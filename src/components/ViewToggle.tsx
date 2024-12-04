import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { useViewMode } from '../hooks/useViewMode';

export function ViewToggle() {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <button
      onClick={toggleViewMode}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm"
      aria-label="Alternar visualização"
    >
      {viewMode === 'kanban' ? (
        <>
          <List className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">Visualização em Lista</span>
        </>
      ) : (
        <>
          <LayoutGrid className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">Visualização Kanban</span>
        </>
      )}
    </button>
  );
}