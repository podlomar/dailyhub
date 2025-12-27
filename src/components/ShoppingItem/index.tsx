import type { ShoppingItem as ShoppingItemType } from '../../db';
import styles from './styles.module.css';

interface Props {
  item: ShoppingItemType;
}

export const ShoppingItem = ({ item }: Props) => {
  return (
    <div
      className={`${styles.shoppingItem} ${item.purchased ? styles.purchased : ''}`}
      hx-post={`/shopping/${item.id}/toggle`}
      hx-swap="outerHTML"
      hx-trigger="click"
    >
      <button className={styles.shoppingCheckbox}>
        {item.purchased ? '✓' : ''}
      </button>
      <div className={styles.itemInfo}>
        <span className={styles.itemName}>{item.name}</span>
        {item.quantity > 1 && (
          <span className={styles.itemQuantity}>× {item.quantity}</span>
        )}
      </div>
    </div>
  );
};
