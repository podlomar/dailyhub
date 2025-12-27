import { Container } from '../Container';
import { Navigation } from '../Navigation';
import { TodoForm } from '../TodoForm';
import { TodoSection } from '../TodoSection';
import type { TodoList } from '../../db';
import styles from './styles.module.css';

interface Props {
  todoList: TodoList;
}

export const HomePage = ({ todoList }: Props) => {
  return (
    <Container>
      <header className={styles.header}>
        <h1>Daily Hub</h1>
        <p className={styles.subtitle}>Your everyday tasks</p>
      </header>

      <Navigation currentPage="home" />

      <TodoForm />

      <main id="todo-list" className={styles.todoList}>
        <TodoSection todosSlot="today-todos" title="Today" todos={todoList.today} />
        <TodoSection title="Last 3 Days" todos={todoList.last3Days} />
        <TodoSection title="Last Week" todos={todoList.lastWeek} />
        <TodoSection title="Last Month" todos={todoList.lastMonth} />
        <TodoSection title="Older" todos={todoList.older} />
      </main>
    </Container>
  );
};
