import type { Todo } from '../../db';
import styles from './styles.module.css';

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  return (
    <div
      id={`todo-${todo.id}`}
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
      hx-post={`/todos/${todo.id}/toggle`}
      hx-swap="outerHTML"
      hx-trigger="click"
    >
      <div className={styles.todoCheckbox}>
        {todo.completed ? '✓' : ''}
      </div>
      <span className={styles.todoTitle}>{todo.title}</span>
    </div>
  );
};
