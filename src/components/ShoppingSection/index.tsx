import { ShoppingItemView } from '../ShoppingItemView';
import type { HouseholdCategory } from '../../db';
import styles from './styles.module.css';

interface Props {
  category: HouseholdCategory;
}

export const HouseholdSection = ({ category }: Props) => {
  if (category.items.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{category.category}</h2>
      {/* <div className={styles.sectionItems}>
        {category.items.map((item) => (
          <ShoppingItemView key={item.id} item={item} />
        ))}
      </div> */}
    </section>
  );
};
