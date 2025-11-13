import styles from './IconButton.module.css';

type Props = {
  disabled?: boolean
  icon: any
  onClick?: () => void
}

const IconButton = ({
  disabled = false,
  icon,
  onClick
}: Props) => {

  return (
    <button type="button" disabled={disabled} className={styles.button} onClick={onClick}>
      <i className={styles.icon}>{icon}</i>
    </button>
  );
};

export default IconButton;