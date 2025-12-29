import { Container } from '../Container';
import { Navigation } from '../Navigation';
import { ShoppingListForm } from '../ShoppingListForm';
import type { ShoppingItem } from '../../db';
import styles from './styles.module.css';
import { ShoppingList } from '../ShoppingList';

interface Props {
  shoppingList: ShoppingItem[];
}

export const ShoppingListPage = ({ shoppingList }: Props) => {
  return (
    <Container>
      <header className={styles.header}>
        <h1>Shopping List</h1>
        <p className={styles.subtitle}>Items to purchase</p>
      </header>

      <Navigation currentPage="shopping-list" />

      <ShoppingListForm />

      <ShoppingList shoppingList={shoppingList} />
    </Container>
  );
};
