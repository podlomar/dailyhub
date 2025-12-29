import { createServer } from 'ionbeam';
import type { Request, Response } from 'express';
import { HomePage } from './components/HomePage';
import { ShoppingListPage } from './components/ShoppingListPage';
import { ShoppingCatalogPage } from './components/ShoppingCatalogPage';
import { TodoItem } from './components/TodoItem';
import { ShoppingItem } from './components/ShoppingItem';
import { getTodos, addTodo, toggleTodo, getShopping, getShoppingList, addShoppingItem, toggleShoppingItem } from './db';
import './global.css';

const app = createServer();

app.get('/', async (req: Request, res: Response) => {
  const todoList = await getTodos();
  await req.ionbeam.renderPage("Daily Hub", <HomePage todoList={todoList} />);
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

app.get('/shopping-list', async (req: Request, res: Response) => {
  const shoppingList = await getShoppingList();
  await req.ionbeam.renderPage("Shopping List", <ShoppingListPage shoppingList={shoppingList} />);
});

app.post('/shopping-list/items', async (req: Request, res: Response) => {
  const { name, quantity } = req.body;

  if (!name || name.trim() === '') {
    res.status(400).send('Item name is required');
    return;
  }

  const qty = parseInt(quantity) || 1;
  const newItem = await addShoppingItem(name.trim(), qty);
  await req.ionbeam.renderElement(<ShoppingItem item={newItem} />);
});

app.get('/shopping', async (req: Request, res: Response) => {
  const shopping = await getShopping();
  await req.ionbeam.renderPage("Shopping", <ShoppingCatalogPage shopping={shopping} />);
});

app.post('/shopping/:id/toggle', async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await toggleShoppingItem(id);

  if (item) {
    await req.ionbeam.renderElement(<ShoppingItem item={item} />);
  } else {
    res.status(404).send('Item not found');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
