import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { Column } from './components/Column';
import { ListView } from './components/ListView';
import { AddTaskModal } from './components/AddTaskModal';
import { EditTaskModal } from './components/EditTaskModal';
import { AddColumnModal } from './components/AddColumnModal';
import { BoardHeader } from './components/BoardHeader';
import { SearchBar } from './components/SearchBar';
import { ViewToggle } from './components/ViewToggle';
import { Sidebar } from './components/Sidebar';
import { useBoardStore } from './store/boardStore';
import { useTheme } from './hooks/useTheme';
import { useViewMode } from './hooks/useViewMode';
import { useFilters } from './hooks/useFilters';
import { filterTasks } from './utils/filterTasks';
import { Task } from './types';

function App() {
  const { board, addTask, moveTask, deleteTask, addColumn, updateTask } = useBoardStore();
  const { theme } = useTheme();
  const { viewMode } = useViewMode();
  const { filters } = useFilters();
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEditTask = (columnId: string, task: Task) => {
    setSelectedTask(task);
    setActiveColumn(columnId);
    setIsEditTaskModalOpen(true);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    if (activeColumn) {
      updateTask(activeColumn, updatedTask.id, updatedTask);
    }
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    deleteTask(columnId, taskId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveColumn(
      board.columns.find((col) =>
        col.tasks.some((task) => task.id === active.id)
      )?.id || null
    );
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeColumn === overId) return;

    if (board.columns.some((col) => col.id === overId)) {
      moveTask(activeId.toString(), activeColumn!, overId.toString());
      setActiveColumn(overId.toString());
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
  };

  // Obter todas as tarefas de todas as colunas
  const allTasks = board.columns.flatMap(col => col.tasks);
  const filteredTasks = filterTasks(allTasks, filters);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <BoardHeader 
        onAddColumn={() => setIsAddColumnModalOpen(true)}
        onToggleStats={() => setIsSidebarOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <SearchBar />
          <ViewToggle />
        </div>

        {viewMode === 'kanban' ? (
          <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
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
                  onAddTask={() => {
                    setActiveColumn(column.id);
                    setIsAddTaskModalOpen(true);
                  }}
                  onEditTask={(task) => handleEditTask(column.id, task)}
                  onDeleteTask={(taskId) => handleDeleteTask(column.id, taskId)}
                />
              ))}
            </div>
          </DndContext>
        ) : (
          <ListView
            tasks={filteredTasks}
            onTaskClick={(task) => {
              const columnId = board.columns.find(col => 
                col.tasks.some(t => t.id === task.id)
              )?.id;
              if (columnId) {
                handleEditTask(columnId, task);
              }
            }}
          />
        )}
      </main>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => {
          setIsAddTaskModalOpen(false);
          setActiveColumn(null);
        }}
        onSubmit={(task) => {
          addTask(activeColumn || board.columns[0].id, task);
          setIsAddTaskModalOpen(false);
          setActiveColumn(null);
        }}
      />

      {selectedTask && (
        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          onClose={() => {
            setIsEditTaskModalOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={handleUpdateTask}
          task={selectedTask}
        />
      )}

      <AddColumnModal
        isOpen={isAddColumnModalOpen}
        onClose={() => setIsAddColumnModalOpen(false)}
        onSubmit={(column) => {
          addColumn({
            id: Date.now().toString(),
            title: column.title,
            color: column.color,
          });
        }}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        tasks={allTasks}
      />
    </div>
  );
}

export default App;