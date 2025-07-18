import classNames from 'classnames';
import styles from './InputText.module.css';

type Props = {
  id?: string
  name: string
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'search'
  label?: string
  disabled?: boolean
  value?: string
  placeholder?: string,
  error?: string,
  onChange: (e: React.ChangeEvent) => void
  onBlur?: (e: React.FocusEvent) => void
}

const InputText = ({
  id,
  name,
  value,
  type = 'email',
  disabled = false,
  label,
  placeholder,
  error,
  onChange,
  onBlur
}: Props) => {
  return (
    <div className={styles.container}>
      {label && <label htmlFor={id || name} className={styles.label}>{label}</label>}
      <input
        id={id || name}
        name={name}
        className={classNames(styles.input, { [styles.error]: error })}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span>{error}</span>
    </div>
  );
};

export default InputText;