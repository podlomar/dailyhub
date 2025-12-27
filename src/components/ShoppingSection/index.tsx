import { ShoppingItem } from '../ShoppingItem';
import type { ShoppingCategory } from '../../db';
import styles from './styles.module.css';

interface Props {
  category: ShoppingCategory;
}

export const ShoppingSection = ({ category }: Props) => {
  if (category.items.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{category.category}</h2>
      <div className={styles.sectionItems}>
        {category.items.map((item) => (
          <ShoppingItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
