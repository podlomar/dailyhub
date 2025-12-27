import styles from './styles.module.css';

export const TodoForm = () => {
  return (
    <form
      className={styles.form}
      hx-post="/todos"
      hx-target="#today-todos"
      hx-swap="afterbegin"
      {...{
        'hx-on::after-request': "if(event.detail.successful) this.reset()"
      }}
    >
      <textarea
        name="title"
        placeholder="What needs to be done?"
        className={styles.textarea}
        rows={3}
        required
      />
      <button type="submit" className={styles.button}>
        Add Todo
      </button>
    </form>
  );
};
