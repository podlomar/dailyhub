import { Container } from '../Container';
import { TodoItem } from '../TodoItem';
import type { Todo } from '../../db';
import styles from './styles.module.css';

interface Props {
  todos: Todo[];
}

export const HomePage = ({ todos }: Props) => {
  return (
    <Container>
      <header className={styles.header}>
        <h1>Daily Hub</h1>
        <p className={styles.subtitle}>Your everyday tasks</p>
      </header>

      <main className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </main>
    </Container>
  );
};
