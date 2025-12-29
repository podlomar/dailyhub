import { Container } from '../Container';
import { Navigation } from '../Navigation';
import { ShoppingListForm } from '../ShoppingListForm';
import { ShoppingItem } from '../ShoppingItem';
import type { ShoppingItem as ShoppingItemType } from '../../db';
import styles from './styles.module.css';

interface Props {
  shoppingList: ShoppingItemType[];
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

      <main className={styles.shoppingList}>
        {shoppingList.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No items in your shopping list</p>
            <p className={styles.emptyHint}>Add items using the form above or from the Shopping page</p>
          </div>
        ) : (
          <section className={styles.section}>
            <div id="shopping-list-items" className={styles.sectionItems}>
              {shoppingList.map((item) => (
                <ShoppingItem key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </Container>
  );
};
