import { createServer } from 'ionbeam';
import type { Request, Response } from 'express';
import { HomePage } from './components/HomePage';
import { TodoItem } from './components/TodoItem';
import { getTodos, addTodo, toggleTodo } from './db';
import './global.css';

const app = createServer();

app.get('/', async (req: Request, res: Response) => {
  const todos = await getTodos();
  await req.ionbeam.renderPage("Daily Hub", <HomePage todos={todos} />);
});

app.post('/todos', async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    res.status(400).send('Title is required');
    return;
  }

  const newTodo = await addTodo(title.trim());
  await req.ionbeam.renderElement(<TodoItem todo={newTodo} />);
});

app.post('/todos/:id/toggle', async (req: Request, res: Response) => {
  const id = req.params.id;
  const todo = await toggleTodo(id);

  if (todo) {
    await req.ionbeam.renderElement(<TodoItem todo={todo} />);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
