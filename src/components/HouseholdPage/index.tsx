import { Container } from '../Container';
import { Navigation } from '../Navigation';
import { HouseholdSection } from '../ShoppingSection';
import type { HouseholdCategory } from '../../db';
import styles from './styles.module.css';

interface Props {
  household: HouseholdCategory[];
}

export const HouseholdPage = ({ household }: Props) => {
  return (
    <Container>
      <header className={styles.header}>
        <h1>Household</h1>
        <p className={styles.subtitle}>All available items</p>
      </header>

      <Navigation currentPage="household" />
      <main className={styles.shoppingList}>
        {household.map((category) => (
          <HouseholdSection key={category.category} category={category} />
        ))}
      </main>
    </Container>
  );
};
