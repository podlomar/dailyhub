import { TodoItem } from '../TodoItem';
import type { Todo } from '../../db';
import styles from './styles.module.css';

interface Props {
  todosSlot?: string;
  title: string;
  todos: Todo[];
  allowEmpty?: boolean;
}

export const TodoSection = ({ todosSlot, title, todos, allowEmpty }: Props) => {
  if (todos.length === 0 && !allowEmpty) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div id={todosSlot} className={styles.sectionTodos}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </section>
  );
};
