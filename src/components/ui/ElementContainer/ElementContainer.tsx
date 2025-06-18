import type { ReactNode } from 'react';
import styles from './ElementContainer.module.css';
import classNames from 'classnames';

type Props = {
  children: ReactNode,
  size?: 'small' | 'medium' | 'large',
  orientation?: 'horizontal' | 'vertical'
}

const ElementContainer = ({
  size = 'medium',
  orientation = 'vertical',
  children
}: Props) => {
  return (
    <div className={classNames(styles.container, {
      [styles.small]: size === 'small',
      [styles.medium]: size === 'medium',
      [styles.large]: size === 'large'
    }, {
      [styles.horizontal]: orientation === 'horizontal',
      [styles.vertical]: orientation === 'vertical'
    })}>
      {children}
    </div>
  );
};

export default ElementContainer;