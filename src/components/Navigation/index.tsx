import styles from './styles.module.css';

interface Props {
  currentPage: 'home' | 'shopping-list' | 'shopping';
}

export const Navigation = ({ currentPage }: Props) => {
  return (
    <nav className={styles.navigation}>
      <a
        href="/"
        className={`${styles.navLink} ${currentPage === 'home' ? styles.active : ''}`}
      >
        Todos
      </a>
      <a
        href="/shopping-list"
        className={`${styles.navLink} ${currentPage === 'shopping-list' ? styles.active : ''}`}
      >
        List
      </a>
      <a
        href="/shopping"
        className={`${styles.navLink} ${currentPage === 'shopping' ? styles.active : ''}`}
      >
        Shopping
      </a>
    </nav>
  );
};
