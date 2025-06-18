import { Link } from 'react-router-dom';
import googleIcon from '../../../assets/images/app_therapy_ally_logo_1024x1024.png';
import styles from './Logo.module.css'

const Logo = () => {
  return (
      <Link to="/" className={styles.content}>
        <img width={48} height={48} src={googleIcon}/>
      </Link>
  );
};

export default Logo;