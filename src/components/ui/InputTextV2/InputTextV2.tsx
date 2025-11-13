import classNames from 'classnames';
import styles from './InputTextV2.module.css';

type Props = {
  id?: string
  name: string
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'search'
  label?: string
  disabled?: boolean
  value?: string
  placeholder?: string,
  error?: string,
  max?: string,
  min?: string,
  onChange: (e: React.ChangeEvent) => void
  onBlur?: (e: React.FocusEvent) => void
}

const InputTextV2 = ({
  id,
  name,
  value,
  type = 'email',
  disabled = false,
  label,
  placeholder,
  error,
  max,
  min,
  onChange,
  onBlur
}: Props) => {
  return (
    <div className={styles.container}>
      {label && <label htmlFor={id || name} className={styles.label}>{label}</label>}
      <input
        id={id || name}
        name={name}
        className={classNames(styles.input, { [styles.error]: error }, type === 'date' && styles.input_date)}
        placeholder={label || placeholder}
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        max={max}
        min={min}
      />
      <span>{error}</span>
    </div>
  );
};

export default InputTextV2;