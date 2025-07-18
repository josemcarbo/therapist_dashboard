import { CalendarClock, Users } from 'lucide-react';
import styles from './Sidebar.module.css';
import classNames from 'classnames';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  // const [activeItem, setActiveItem] = useState<'users' | 'therapists'>('users');
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <Logo />
      <ul role='list' className={styles.menu}>
        <li className={styles.menu_item}>
          <Link to={'/users'} className={classNames(styles.menu_item_link, { [styles.active]: location.pathname === '/users' })}>
            <i className={styles.icon}><Users size={22} strokeWidth={1} /></i>
            <span className={styles.label}>Users</span>
          </Link>
        </li>
        <li className={styles.menu_item}>
          <Link to={'/sessions'} className={classNames(styles.menu_item_link, { [styles.active]: location.pathname === '/sessions' })}>
            <i className={styles.icon}><CalendarClock size={22} strokeWidth={1} /></i>
            <span className={styles.label}>Sessions</span>
          </Link>
        </li>
        <li></li>
      </ul>
    </aside>
  );
};

export default SideBar;