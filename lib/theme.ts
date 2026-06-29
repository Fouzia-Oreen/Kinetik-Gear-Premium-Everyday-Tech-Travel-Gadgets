// lib/theme.ts
export type Theme = 'light' | 'dark';

export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('theme') as Theme | null;
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
};