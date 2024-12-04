import React from 'react';
import { PieChart, BarChart2, Clock } from 'lucide-react';
import { Task } from '../types';

interface BoardStatsProps {
  tasks: Task[];
}

export function BoardStats({ tasks }: BoardStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => 
    task.labels.includes('concluído')).length;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < new Date()).length;

  const priorityCount = {
    low: tasks.filter(task => task.priority === 'low').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    high: tasks.filter(task => task.priority === 'high').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Progresso</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
            </p>
          </div>
          <PieChart className="h-8 w-8 text-blue-500" />
        </div>
        <div className="mt-4 h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Por Prioridade</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {totalTasks}
            </p>
          </div>
          <BarChart2 className="h-8 w-8 text-purple-500" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Alta</span>
            <span className="font-medium text-gray-900 dark:text-white">{priorityCount.high}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Média</span>
            <span className="font-medium text-gray-900 dark:text-white">{priorityCount.medium}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Baixa</span>
            <span className="font-medium text-gray-900 dark:text-white">{priorityCount.low}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Atrasadas</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {overdueTasks}
            </p>
          </div>
          <Clock className="h-8 w-8 text-red-500" />
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {overdueTasks === 0 ? 'Nenhuma tarefa atrasada' : 
             overdueTasks === 1 ? '1 tarefa atrasada' :
             `${overdueTasks} tarefas atrasadas`}
          </p>
        </div>
      </div>
    </div>
  );
}