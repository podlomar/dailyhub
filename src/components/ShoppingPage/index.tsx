import { Container } from '../Container';
import { ShoppingSection } from '../ShoppingSection';
import type { ShoppingCategory } from '../../db';
import styles from './styles.module.css';

interface Props {
  shopping: ShoppingCategory[];
}

export const ShoppingPage = ({ shopping }: Props) => {
  return (
    <Container>
      <header className={styles.header}>
        <h1>Shopping List</h1>
        <p className={styles.subtitle}>Items to purchase</p>
      </header>

      <main className={styles.shoppingList}>
        {shopping.map((category) => (
          <ShoppingSection key={category.category} category={category} />
        ))}
      </main>
    </Container>
  );
};
