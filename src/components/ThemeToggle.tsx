import React, { useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme, applyTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Aplica o tema inicial
  useEffect(() => {
    applyTheme(theme);

    // Observa mudanças na preferência do sistema
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <div className="relative group">
      <button
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Alternar tema"
      >
        {theme === 'light' && <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
        {theme === 'dark' && <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
        {theme === 'system' && <Monitor className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
      </button>

      {/* Menu de seleção de tema */}
      <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <button
          onClick={() => {
            setTheme('light');
            applyTheme('light');
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Sun className="h-4 w-4 mr-2" />
          Claro
        </button>
        <button
          onClick={() => {
            setTheme('dark');
            applyTheme('dark');
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Moon className="h-4 w-4 mr-2" />
          Escuro
        </button>
        <button
          onClick={() => {
            setTheme('system');
            applyTheme('system');
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Monitor className="h-4 w-4 mr-2" />
          Sistema
        </button>
      </div>
    </div>
  );
}