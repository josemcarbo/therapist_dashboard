import { useEffect, useState, type ReactNode } from "react";
import styles from './PositionedMenu.module.css';

type Props = {
  visible: boolean
  triggerRef: any
  children: ReactNode
}

const PositionedMenu = ({ visible, triggerRef, children }: Props) => {
  // const [visible, setVisible] = useState(show);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [triggerRef.current]);

  // const calculatePosition = (bottom: number, left: number) => {
  //   const difX = left - window.innerWidth
  // }

  return (
    <>
      {visible && (
        <div
          className={styles.container}
          style={{
            position: 'absolute',
            top: position.top,
            left: 100,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default PositionedMenu;