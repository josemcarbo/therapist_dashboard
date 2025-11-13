import styles from './Overlay.module.css';

type Props = {
  onClick: () => void;
};
const Overlay = ({ onClick }: Props) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};

export default Overlay;
