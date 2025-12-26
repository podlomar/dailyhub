import styles from './styles.module.css';

export const TodoForm = () => {
  return (
    <form
      className={styles.form}
      hx-post="/todos"
      hx-target="#todo-list"
      hx-swap="afterbegin"
      {...{
        'hx-on::after-request': "if(event.detail.successful) this.reset()"
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="What needs to be done?"
        className={styles.input}
        required
        autoComplete="off"
      />
      <button type="submit" className={styles.button}>
        Add Todo
      </button>
    </form>
  );
};
