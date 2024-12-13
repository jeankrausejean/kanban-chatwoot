import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { useTheme, applyTheme } from './hooks/useTheme';

// Aplica o tema inicial antes da renderização
const theme = useTheme.getState().theme;
applyTheme(theme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);