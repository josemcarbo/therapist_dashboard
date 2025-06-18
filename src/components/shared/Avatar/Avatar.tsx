import { User } from 'lucide-react';
import { useUserStore } from '../../../store/userStore';
import styles from './Avatar.module.css';
import { useRef, useState } from 'react';
import PositionedMenu from '../PositionedMenu/PositionedMenu';

const Avatar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const triggerRef = useRef(null);
  const { user } = useUserStore((state) => state._user);

  return (
    <div ref={triggerRef} className={styles.content} onClick={() => setShowMenu(!showMenu)}>
      {
        user?.avatar ? (
          <img />
        ) : (
          <User strokeWidth={1} />
        )
      }
      <PositionedMenu visible={showMenu} triggerRef={triggerRef}>
        <h6>{user?.email}</h6>
      </PositionedMenu>
    </div>
  );
};

export default Avatar;