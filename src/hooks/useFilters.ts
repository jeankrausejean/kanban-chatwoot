import { create } from 'zustand';

interface Filters {
  search: string;
  priority: string;
  dueDate: string;
}

interface FiltersState {
  filters: Filters;
  updateFilters: (updates: Partial<Filters>) => void;
}

export const useFilters = create<FiltersState>((set) => ({
  filters: {
    search: '',
    priority: '',
    dueDate: '',
  },
  updateFilters: (updates) =>
    set((state) => ({
      filters: { ...state.filters, ...updates },
    })),
}));