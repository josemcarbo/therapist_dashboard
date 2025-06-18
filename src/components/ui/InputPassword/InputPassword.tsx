import { useEffect, useState, type ReactNode } from 'react';
import styles from './InputPassword.module.css';
import { Eye, EyeClosed } from 'lucide-react';
import classNames from 'classnames';

type Props = {
  id?: string
  name: string
  label?: string
  disabled?: boolean
  value?: string
  placeholder?: string
  error?: string
  beforeIcon?: ReactNode
  afterIcon?: ReactNode
  onChange: (e: React.ChangeEvent) => void
  onBlur?: (e: React.FocusEvent) => void
}

const InputPassword = ({
  id,
  name,
  disabled = false,
  label,
  placeholder = "••••••••",
  error,
  onChange,
  onBlur
}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [type, setType] = useState<'text' | 'password'>('password');

  const onToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShow(!show);
  }

  useEffect(() => {
    show ? setType('text') : setType('password')
  }, [show]);

  return (
    <div className={styles.container}>
      {label && <label htmlFor={id || name} className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <input
          id={id || name}
          name={name}
          className={classNames(styles.input, { [styles.error]: error })}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
        />
        <a href="#" onClick={onToggle} className={classNames({ [styles.error]: error })}>
          {
            show ? (
              <EyeClosed size={22} strokeWidth={1} />
            ) : (
              <Eye size={22} strokeWidth={1} />
            )
          }
        </a>
      </div>
      <span>{error}</span>
    </div>
  );
};

export default InputPassword;