import styles from './Image.module.css';

type Props = {
  src: string;
  alt: string;
}

const Image = ({
  src,
  alt
}: Props) => {

  return (
    <div className={styles.container}>
      <img src={src} width={28} height={28} alt={alt} title={alt} />
      <span>{alt}</span>
    </div>
  );
};

export default Image;