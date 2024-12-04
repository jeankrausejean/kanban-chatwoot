import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useFilters } from '../hooks/useFilters';

export function SearchBar() {
  const { filters, updateFilters } = useFilters();

  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar tarefas..."
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <select
        value={filters.priority}
        onChange={(e) => updateFilters({ priority: e.target.value })}
        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">Todas Prioridades</option>
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>

      <select
        value={filters.dueDate}
        onChange={(e) => updateFilters({ dueDate: e.target.value })}
        className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">Todas Datas</option>
        <option value="today">Hoje</option>
        <option value="week">Esta Semana</option>
        <option value="overdue">Atrasadas</option>
      </select>
    </div>
  );
}