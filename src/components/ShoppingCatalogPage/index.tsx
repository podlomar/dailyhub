import { Container } from '../Container';
import { Navigation } from '../Navigation';
import { ShoppingSection } from '../ShoppingSection';
import type { ShoppingCategory } from '../../db';
import styles from './styles.module.css';

interface Props {
  shopping: ShoppingCategory[];
}

export const ShoppingCatalogPage = ({ shopping }: Props) => {
  return (
    <Container>
      <header className={styles.header}>
        <h1>Shopping</h1>
        <p className={styles.subtitle}>All available items</p>
      </header>

      <Navigation currentPage="shopping" />

      <main className={styles.shoppingList}>
        {shopping.map((category) => (
          <ShoppingSection key={category.category} category={category} />
        ))}
      </main>
    </Container>
  );
};
