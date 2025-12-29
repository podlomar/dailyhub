import type { ShoppingItem } from '../../db';
import { ShoppingItemView } from '../ShoppingItemView';
import styles from './styles.module.css';

interface Props {
  shoppingList: ShoppingItem[];
}

export const ShoppingList = ({ shoppingList }: Props) => {
  return (
    <main id="shopping-list" className={styles.shoppingList}>
      {shoppingList.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No items in your shopping list</p>
          <p className={styles.emptyHint}>Add items using the form above or from the Shopping page</p>
        </div>
      ) : (
        <section className={styles.section}>
          <div className={styles.sectionItems}>
            {shoppingList.map((item) => (
              <ShoppingItemView key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
