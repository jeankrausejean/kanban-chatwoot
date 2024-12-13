import React from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { Column } from './Column';
import { Board, Task } from '../types';

interface KanbanViewProps {
  board: Board;
  filteredTasks: Task[];
  onDragStart: (event: DragStartEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onAddTask: (columnId: string) => void;
  onEditTask: (columnId: string, task: Task) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
}

export function KanbanView({
  board,
  filteredTasks,
  onDragStart,
  onDragOver,
  onDragEnd,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: KanbanViewProps) {
  return (
    <DndContext
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-4">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={{
              ...column,
              tasks: column.tasks.filter(task => 
                filteredTasks.some(ft => ft.id === task.id)
              ),
            }}
            onAddTask={() => onAddTask(column.id)}
            onEditTask={(task) => onEditTask(column.id, task)}
            onDeleteTask={(taskId) => onDeleteTask(column.id, taskId)}
          />
        ))}
      </div>
    </DndContext>
  );
}