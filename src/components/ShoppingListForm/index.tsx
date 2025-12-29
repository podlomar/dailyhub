import styles from './styles.module.css';

export const ShoppingListForm = () => {
  return (
    <form
      className={styles.form}
      hx-post="/shopping-list/items"
      hx-target="#shopping-list"
      hx-swap="outerHTML"
      {...{
        'hx-on::after-request': "if(event.detail.successful) this.reset()"
      }}
    >
      <input
        name="name"
        placeholder="Item name"
        className={styles.input}
        required
      />
      <input
        name="quantity"
        type="number"
        placeholder="Qty"
        className={styles.quantityInput}
        min="1"
        defaultValue="1"
        required
      />
      <button type="submit" className={styles.button}>
        Add Item
      </button>
    </form>
  );
};
