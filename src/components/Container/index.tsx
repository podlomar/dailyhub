import type { ReactNode } from 'react';
import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Container = ({ children, maxWidth = 'md', className = '' }: Props) => {
  return (
    <div className={`${styles.container} ${styles[maxWidth]} ${className}`}>
      {children}
    </div>
  );
};
