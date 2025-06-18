import { useContext, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import styles from './ThemeToggle.module.css'

export const ThemeToggle = () => {
  const { userPref, setUserPrefState } = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState(userPref === 'dark');

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setUserPrefState(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const handleClick = () => {
    toggleTheme();
  };
  
  return (
    <div className={styles.container}>
      {isDarkMode ? (
        <Sun size={20} color="#eeebeb" onClick={() => handleClick()} />
      ) : (
        <Moon size={20} color="#121212" onClick={() => handleClick()} />
      )}
    </div>
  );
};