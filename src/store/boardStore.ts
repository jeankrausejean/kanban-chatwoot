import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Board, Task, Column } from '../types';

interface BoardState {
  board: Board;
  addTask: (columnId: string, task: Task) => void;
  moveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
  updateTask: (columnId: string, taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  updateBoardTitle: (title: string) => void;
  addColumn: (column: Omit<Column, 'tasks'>) => void;
  updateColumn: (columnId: string, updates: Partial<Column>) => void;
  deleteColumn: (columnId: string) => void;
  updateTaskColor: (columnId: string, taskId: string, color: string) => void;
  updateColumnColor: (columnId: string, color: string) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      board: {
        id: '1',
        title: 'Quadro Principal',
        columns: [
          { id: 'todo', title: 'A Fazer', tasks: [], color: '#E2E8F0' },
          { id: 'in-progress', title: 'Em Andamento', tasks: [], color: '#FEF3C7' },
          { id: 'done', title: 'Concluído', tasks: [], color: '#DCFCE7' },
        ],
      },

      updateBoardTitle: (title) =>
        set((state) => ({
          board: {
            ...state.board,
            title,
          },
        })),

      addColumn: (column) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: [...state.board.columns, { ...column, tasks: [] }],
          },
        })),

      updateColumn: (columnId, updates) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: state.board.columns.map((col) =>
              col.id === columnId ? { ...col, ...updates } : col
            ),
          },
        })),

      deleteColumn: (columnId) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: state.board.columns.filter((col) => col.id !== columnId),
          },
        })),

      addTask: (columnId, task) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: state.board.columns.map((col) =>
              col.id === columnId
                ? { ...col, tasks: [...col.tasks, task] }
                : col
            ),
          },
        })),

      moveTask: (taskId, fromColumnId, toColumnId) =>
        set((state) => {
          const fromColumn = state.board.columns.find((col) => col.id === fromColumnId);
          const task = fromColumn?.tasks.find((t) => t.id === taskId);
          
          if (!fromColumn || !task) return state;

          return {
            board: {
              ...state.board,
              columns: state.board.columns.map((col) => {
                if (col.id === fromColumnId) {
                  return {
                    ...col,
                    tasks: col.tasks.filter((t) => t.id !== taskId),
                  };
                }
                if (col.id === toColumnId) {
                  return {
                    ...col,
                    tasks: [...col.tasks, task],
                  };
                }
                return col;
              }),
            },
          };
        }),

      updateTask: (columnId, taskId, updatedTask) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: state.board.columns.map((col) =>
              col.id === columnId
                ? {
                    ...col,
                    tasks: col.tasks.map((task) =>
                      task.id === taskId
                        ? { ...task, ...updatedTask }
                        : task
                    ),
                  }
                : col
            ),
          },
        })),

      deleteTask: (columnId, taskId) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: state.board.columns.map((col) =>
              col.id === columnId
                ? {
                    ...col,
                    tasks: col.tasks.filter((task) => task.id !== taskId),
                  }
                : col
            ),
          },
        })),

      updateTaskColor: (columnId, taskId, color) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: state.board.columns.map((col) =>
              col.id === columnId
                ? {
                    ...col,
                    tasks: col.tasks.map((task) =>
                      task.id === taskId
                        ? { ...task, color }
                        : task
                    ),
                  }
                : col
            ),
          },
        })),

      updateColumnColor: (columnId, color) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: state.board.columns.map((col) =>
              col.id === columnId
                ? { ...col, color }
                : col
            ),
          },
        })),
    }),
    {
      name: 'board-storage',
    }
  )
);