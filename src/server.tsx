import { createServer } from 'ionbeam';
import type { Request, Response } from 'express';
import { HomePage } from './components/HomePage';
import { ShoppingListPage } from './components/ShoppingListPage';
import { HouseholdPage } from './components/HouseholdPage';
import { TodoItem } from './components/TodoItem';
import { ShoppingItemView } from './components/ShoppingItemView';
import { getTodos, addTodo, toggleTodo, getHousehold, getShoppingList, addShoppingItem, toggleShoppingItem, clearPurchasedItems } from './db';
import './global.css';
import { ShoppingList } from './components/ShoppingList';

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
  await addShoppingItem(name.trim(), qty);
  const items = await getShoppingList();
  await req.ionbeam.renderElement(<ShoppingList shoppingList={items} />);
});

app.post('/shopping-list/:id/toggle', async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await toggleShoppingItem(id);

  if (item) {
    await req.ionbeam.renderElement(<ShoppingItemView item={item} />);
  } else {
    res.status(404).send('Item not found');
  }
});

app.post('/shopping-list/clear-purchased', async (req: Request, res: Response) => {
  await clearPurchasedItems();
  const items = await getShoppingList();
  await req.ionbeam.renderElement(<ShoppingList shoppingList={items} />);
});

app.get('/household', async (req: Request, res: Response) => {
  const household = await getHousehold();
  await req.ionbeam.renderPage("Household", <HouseholdPage household={household} />);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
