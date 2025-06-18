import { Boxes, Combine, Settings, Users } from 'lucide-react';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import classNames from 'classnames';

const SideBar = () => {
  const [activeItem, setActiveItem] = useState<'projects' | 'integrations' | 'team' | 'settings'>('projects');

  return (
    <aside className={styles.sidebar}>
      <ul role='list' className={styles.menu}>
        <li
          className={classNames(
            styles.menu_item,
            { [styles.active]: activeItem === 'projects' }
          )}
          onClick={() => setActiveItem('projects')}>
          <i className={styles.icon}><Boxes size={22} strokeWidth={1} /></i>
          <span className={styles.label}>Projects</span>
        </li>
        <li
          className={classNames(
            styles.menu_item,
            { [styles.active]: activeItem === 'team' }
          )}
          onClick={() => setActiveItem('team')}>
          <i className={styles.icon}><Users size={22} strokeWidth={1} /></i>
          <span className={styles.label}>Team</span>
        </li>
        <li
          className={classNames(
            styles.menu_item,
            { [styles.active]: activeItem === 'integrations' }
          )}
          onClick={() => setActiveItem('integrations')}>
          <i className={styles.icon}><Combine size={22} strokeWidth={1} /></i>
          <span className={styles.label}>Integrations</span>
        </li>
        <li
          className={classNames(
            styles.menu_item,
            { [styles.active]: activeItem === 'settings' }
          )}
          onClick={() => setActiveItem('settings')}>
          <i className={styles.icon}><Settings size={22} strokeWidth={1} /></i>
          <span className={styles.label}>Settings</span>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;