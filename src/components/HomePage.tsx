import { Page } from 'ionbeam';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface HomePageProps {
  todos: Todo[];
}

export const HomePage = ({ todos }: HomePageProps) => {
  return (
    <Page title="Daily Hub">
      <div className="container">
        <header className="header">
          <h1>Daily Hub</h1>
          <p className="subtitle">Your everyday tasks</p>
        </header>

        <main className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-checkbox">
                {todo.completed ? '✓' : ''}
              </div>
              <span className="todo-title">{todo.title}</span>
            </div>
          ))}
        </main>
      </div>
    </Page>
  );
};
