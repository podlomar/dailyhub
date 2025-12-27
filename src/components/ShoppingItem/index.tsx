import type { ShoppingItem as ShoppingItemType } from '../../db';
import styles from './styles.module.css';

interface Props {
  item: ShoppingItemType;
}

export const ShoppingItem = ({ item }: Props) => {
  return (
    <form
      className={`${styles.shoppingItem} ${item.purchased ? styles.purchased : ''}`}
      action={`/shopping/${item.id}/toggle`}
      method="POST"
    >
      <button type="submit" className={styles.shoppingCheckbox}>
        {item.purchased ? '✓' : ''}
      </button>
      <div className={styles.itemInfo}>
        <span className={styles.itemName}>{item.name}</span>
        {item.quantity > 1 && (
          <span className={styles.itemQuantity}>× {item.quantity}</span>
        )}
      </div>
    </form>
  );
};
