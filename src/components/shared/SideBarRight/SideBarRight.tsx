import { X } from 'lucide-react';
import styles from './SideBarRight.module.css';
import { type ReactNode } from 'react';
import classNames from 'classnames';
import Overlay from '../Overlay/Overlay';

type Props = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
};
const SideBarRight = ({ show, children, onClose }: Props) => {
  return (
    <>
      {show && <Overlay onClick={onClose} />}
      <aside className={classNames(styles.sidebar, show && styles.open)}>
        <div className={styles.content}>
          <div className={styles.close}>
            <X strokeWidth={2} size={20} color="var(--color-primary)" onClick={onClose} />
          </div>
          {children}
        </div>
      </aside>
    </>
  );
};

export default SideBarRight;
