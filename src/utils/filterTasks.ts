import { Task } from '../types';

export function filterTasks(tasks: Task[], filters: {
  search: string;
  priority: string;
  dueDate: string;
}) {
  return tasks.filter((task) => {
    // Filtro de busca
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !task.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Filtro de prioridade
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }

    // Filtro de data
    if (filters.dueDate && task.dueDate) {
      const today = new Date();
      const taskDate = new Date(task.dueDate);
      
      switch (filters.dueDate) {
        case 'today':
          if (taskDate.toDateString() !== today.toDateString()) {
            return false;
          }
          break;
        case 'week':
          const weekFromNow = new Date();
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          if (taskDate > weekFromNow || taskDate < today) {
            return false;
          }
          break;
        case 'overdue':
          if (taskDate >= today) {
            return false;
          }
          break;
      }
    }

    return true;
  });
}