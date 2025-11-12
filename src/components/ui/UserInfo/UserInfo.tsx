import styles from './UserInfo.module.css';

type Props = {
  content: string
  label: string;
}

const UserInfo = ({
  content,
  label
}: Props) => {

  return (
    <div className={styles.container}>
      <span>{content}</span>
      <i>{label}</i>
    </div>
  );
};

export default UserInfo;