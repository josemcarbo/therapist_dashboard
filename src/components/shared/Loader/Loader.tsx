import classNames from "classnames"
import styles from './Loader.module.css';

type Props = {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary'
  position?: 'start' | 'end' | 'auto'
}

const Loader = ({ size = 'small', variant = 'primary', position = 'auto' }: Props) => {
  return (
    <span className={classNames(
      styles.loader,
      {
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
        [styles.large]: size === 'large',
        [styles.auto]: position === 'auto',
        [styles.start]: position === 'start',
        [styles.end]: position === 'end',
      },
      variant === 'primary' ? styles.primary : styles.secondary)}
    ></span>
  )
}

export default Loader;