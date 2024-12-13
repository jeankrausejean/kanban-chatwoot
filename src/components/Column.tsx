import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Column as ColumnType, Task } from '../types';
import { TaskCard } from './TaskCard';
import { MoreVertical, Edit2, Trash2, Palette } from 'lucide-react';
import { useBoardStore } from '../store/boardStore';
import { ColumnHeader } from './ColumnHeader';
import { ColumnMenu } from './ColumnMenu';

interface ColumnProps {
  column: ColumnType;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function Column({ column, onAddTask, onEditTask, onDeleteTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id });
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

  const handleDeleteColumn = () => {
    if (window.confirm('Tem certeza que deseja excluir esta lista?')) {
      deleteColumn(column.id);
    }
  };

  return (
    <div 
      className="flex flex-col rounded-lg p-4 w-80"
      style={{ backgroundColor: column.color }}
    >
      <ColumnHeader
        title={column.title}
        isEditing={isEditing}
        editTitle={title}
        onEditTitleChange={setTitle}
        onSubmit={handleSubmit}
        onToggleMenu={() => setShowMenu(!showMenu)}
      />

      {showMenu && (
        <ColumnMenu
          onEdit={() => {
            setIsEditing(true);
            setShowMenu(false);
          }}
          onColorChange={handleColorChange}
          onDelete={handleDeleteColumn}
          currentColor={column.color}
        />
      )}

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
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </SortableContext>
      </div>

      <button
        onClick={onAddTask}
        className="mt-4 flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-200/50 rounded-md transition-colors w-full justify-center"
      >
        <span className="text-xl">+</span>
        Adicionar Cartão
      </button>
    </div>
  );
}