import { Page } from 'ionbeam';
import styles from './styles.module.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
}

export const HomePage = ({ todos }: Props) => {
  return (
    <Page title="Daily Hub">
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Daily Hub</h1>
          <p className={styles.subtitle}>Your everyday tasks</p>
        </header>

        <main className={styles.todoList}>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
            >
              <div className={styles.todoCheckbox}>
                {todo.completed ? '✓' : ''}
              </div>
              <span className={styles.todoTitle}>{todo.title}</span>
            </div>
          ))}
        </main>
      </div>
    </Page>
  );
};
