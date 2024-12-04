import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ViewMode = 'kanban' | 'list';

interface ViewModeState {
  viewMode: ViewMode;
  toggleViewMode: () => void;
}

export const useViewMode = create<ViewModeState>()(
  persist(
    (set) => ({
      viewMode: 'kanban',
      toggleViewMode: () => set((state) => ({ 
        viewMode: state.viewMode === 'kanban' ? 'list' : 'kanban' 
      })),
    }),
    {
      name: 'view-mode-storage',
    }
  )
);