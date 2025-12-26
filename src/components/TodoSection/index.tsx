import { TodoItem } from '../TodoItem';
import type { Todo } from '../../db';
import styles from './styles.module.css';

interface Props {
  title: string;
  todos: Todo[];
}

export const TodoSection = ({ title, todos }: Props) => {
  if (todos.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionTodos}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </section>
  );
};
