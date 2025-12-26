import { createServer } from 'ionbeam';
import type { Request, Response } from 'express';
import { HomePage } from './components/HomePage';
import { db } from './db';
import './global.css';

const app = createServer();

app.get('/', async (req: Request, res: Response) => {
  await db.read();
  await req.ionbeam.render(<HomePage todos={db.data.todos} />);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
