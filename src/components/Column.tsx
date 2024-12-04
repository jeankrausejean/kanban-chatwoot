import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Column as ColumnType, Task } from '../types';
import { TaskCard } from './TaskCard';
import { Plus, MoreVertical, Edit2, Trash2, Palette } from 'lucide-react';
import { useBoardStore } from '../store/boardStore';

interface ColumnProps {
  column: ColumnType;
  onAddTask: () => void;
  onDeleteTask: (taskId: string) => void;
}

export function Column({ column, onAddTask, onDeleteTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const { updateColumn, deleteColumn, updateColumnColor } = useBoardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [title, setTitle] = useState(column.title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateColumn(column.id, { title });
    setIsEditing(false);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColumnColor(column.id, e.target.value);
  };

  return (
    <div 
      className="flex flex-col rounded-lg p-4 w-80"
      style={{ backgroundColor: column.color }}
    >
      <div className="flex items-center justify-between mb-4">
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
          <h2 className="font-semibold text-gray-700">{column.title}</h2>
        )}
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <MoreVertical size={20} className="text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                >
                  <Edit2 size={16} />
                  Renomear
                </button>
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Palette size={16} />
                  <input
                    type="color"
                    value={column.color}
                    onChange={handleColorChange}
                    className="w-6 h-6 p-0 border-0"
                  />
                </div>
                <button
                  onClick={() => {
                    deleteColumn(column.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                >
                  <Trash2 size={16} />
                  Excluir Lista
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="flex flex-col gap-3 min-h-[200px]"
      >
        <SortableContext
          items={column.tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={column.id}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </SortableContext>
      </div>

      <button
        onClick={onAddTask}
        className="mt-4 flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-200/50 rounded-md transition-colors w-full justify-center"
      >
        <Plus size={20} />
        Adicionar Cartão
      </button>
    </div>
  );
}