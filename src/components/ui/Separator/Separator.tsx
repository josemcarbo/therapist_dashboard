import styles from './Separator.module.css';

type Props = {
  label?: string;
}

const Separator = ({ label = '' }: Props) => {
  return (
    <div className={styles.separator}><span className='text-medium'>{label}</span></div>
  );
};

export default Separator;