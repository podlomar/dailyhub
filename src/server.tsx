import { createServer } from 'ionbeam';
import type { Request, Response } from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { HomePage } from './components/HomePage';
import './global.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Database {
  todos: Todo[];
}

const adapter = new JSONFile<Database>('data/todos.json');
const db = new Low(adapter, { todos: [] });

const app = createServer();

app.get('/', async (req: Request, res: Response) => {
  await db.read();
  await req.ionbeam.render(<HomePage todos={db.data.todos} />);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
