import classNames from 'classnames';
import styles from './Button.module.css';
import Loader from '../../shared/Loader/Loader';

type Props = {
  label: string
  type?: 'button' | 'reset' | 'submit'
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  icon?: any
  loading?: boolean
  onClick?: () => void
}

const Button = ({
  label,
  type = 'submit',
  disabled = false,
  variant = 'primary',
  icon,
  loading = false,
  onClick
}: Props) => {

  return (
    <button type={type} disabled={disabled || loading} className={classNames([styles.button, variant === 'primary' ? styles.primary : styles.secondary])} onClick={onClick}>
      {icon && <img src={icon} width={16} height={16} />}
      <span>{label}</span>
      {loading && (<Loader size="small" variant={variant} position='end' />)}
    </button>
  );
};

export default Button;