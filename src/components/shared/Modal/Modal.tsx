import { type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import styles from './Modal.module.css';

type Props = {
  children: ReactNode,
  onClose: () => void
}

export default function Modal({ children, onClose }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.content}>
        <button className={styles.close} onClick={onClose}>
          <i className={styles.icon}><Plus size={22} strokeWidth={1} /></i>
        </button>
        {children}
      </div>
    </div>
  );
}