import { createContext, useState, useEffect, type ReactNode } from 'react';
import { getAppliedTheme } from '../utils/theme';
import { useUIStore } from '../store/uiStore';

export const ThemeContext = createContext({
  theme: 'light',
  userPref: 'light',
  setUserPrefState: (_: string) => { },
});

type Props = {
  children: ReactNode
}
export const ThemeProvider = ({ children }: Props) => {
  const { theme, updateTheme } = useUIStore((state) => state._ui);
  const [userPref, setUserPrefState] = useState(theme);
  // const [theme, setTheme] = useState('light');

  useEffect(() => {
    const applied = getAppliedTheme(userPref);
    updateTheme(applied);
    document.documentElement.setAttribute('data-theme', applied);
    console.log(typeof updateTheme)
    updateTheme(userPref);
  }, [userPref]);

  useEffect(() => {
    if (userPref !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => {
      const applied = getAppliedTheme('system');
      updateTheme(applied);
      document.documentElement.setAttribute('data-theme', applied);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [userPref]);

  return (
    <ThemeContext.Provider value={{ userPref, setUserPrefState, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};