import { createServer } from 'ionbeam';
import type { Request, Response } from 'express';
import { HomePage } from './components/HomePage';
import { TodoItem } from './components/TodoItem';
import { db } from './db';
import './global.css';

const app = createServer();

app.get('/', async (req: Request, res: Response) => {
  await db.read();
  await req.ionbeam.renderPage("Daily Hub", <HomePage todos={db.data.todos} />);
});

app.post('/todos', async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    res.status(400).send('Title is required');
    return;
  }

  await db.read();

  const newTodo = {
    id: db.data.todos.length > 0
      ? Math.max(...db.data.todos.map(t => t.id)) + 1
      : 1,
    title: title.trim(),
    completed: false,
  };

  db.data.todos.push(newTodo);
  await db.write();

  await req.ionbeam.renderElement(<TodoItem todo={newTodo} />);
});

app.post('/todos/:id/toggle', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  await db.read();
  const todo = db.data.todos.find(t => t.id === id);

  if (todo) {
    todo.completed = !todo.completed;
    await db.write();
    await req.ionbeam.renderElement(<TodoItem todo={todo} />);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
