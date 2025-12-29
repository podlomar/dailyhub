import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
}

export interface ShoppingCategory {
  category: string;
  items: ShoppingItem[];
}

export interface Database {
  todos: Todo[];
  shopping: ShoppingCategory[];
}

export interface TodoList {
  today: Todo[];
  last3Days: Todo[];
  lastWeek: Todo[];
  lastMonth: Todo[];
  older: Todo[];
}

const adapter = new JSONFile<Database>('data/todos.json');
const db = new Low(adapter, { todos: [], shopping: [] });

const sortUndoneFirst = (a: Todo, b: Todo): number => {
  if (a.completed === b.completed) {
    return 0;
  }
  return a.completed ? 1 : -1;
};

export const getTodos = async (): Promise<TodoList> => {
  await db.read();
  const todos = db.data.todos;
  const now = dayjs();

  const todoList: TodoList = {
    today: [],
    last3Days: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  };

  for (const todo of todos) {
    const createdDate = dayjs(todo.created);
    const todayStart = now.startOf('day');
    const threeDaysAgo = todayStart.subtract(3, 'day');
    const sevenDaysAgo = todayStart.subtract(7, 'day');
    const thirtyDaysAgo = todayStart.subtract(30, 'day');

    if (createdDate.isAfter(todayStart)) {
      todoList.today.push(todo);
      continue;
    }

    if (todo.completed) {
      continue;
    }

    if (createdDate.isAfter(threeDaysAgo)) {
      todoList.last3Days.push(todo);
    } else if (createdDate.isAfter(sevenDaysAgo)) {
      todoList.lastWeek.push(todo);
    } else if (createdDate.isAfter(thirtyDaysAgo)) {
      todoList.lastMonth.push(todo);
    } else {
      todoList.older.push(todo);
    }
  }

  todoList.today.sort(sortUndoneFirst);
  return todoList;
};

export const addTodo = async (title: string): Promise<Todo> => {
  await db.read();
  const newTodo: Todo = {
    id: nanoid(8),
    title,
    completed: false,
    created: dayjs().toISOString(),
  };
  db.data.todos.push(newTodo);
  await db.write();
  return newTodo;
}

export const toggleTodo = async (id: string): Promise<Todo | null> => {
  await db.read();
  const todo = db.data.todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    await db.write();
    return todo;
  }
  return null;
};

export const getShopping = async (): Promise<ShoppingCategory[]> => {
  await db.read();
  return db.data.shopping || [];
};

export const getShoppingList = async (): Promise<ShoppingItem[]> => {
  await db.read();
  const shoppingList: ShoppingItem[] = [];
  for (const category of db.data.shopping) {
    for (const item of category.items) {
      if (item.purchased) {
        shoppingList.push(item);
      }
    }
  }
  return shoppingList;
};

export const addShoppingItem = async (name: string, quantity: number): Promise<ShoppingItem> => {
  await db.read();

  // Create new item and add it to "Other" category (or create the category if it doesn't exist)
  const newItem: ShoppingItem = {
    id: nanoid(8),
    name,
    quantity,
    purchased: true, // Auto-add to shopping list
  };

  let otherCategory = db.data.shopping.find(cat => cat.category === 'Other');
  if (!otherCategory) {
    otherCategory = { category: 'Other', items: [] };
    db.data.shopping.push(otherCategory);
  }

  otherCategory.items.push(newItem);
  await db.write();
  return newItem;
};

export const toggleShoppingItem = async (id: string): Promise<ShoppingItem | null> => {
  await db.read();
  for (const category of db.data.shopping) {
    const item = category.items.find(i => i.id === id);
    if (item) {
      item.purchased = !item.purchased;
      await db.write();
      return item;
    }
  }
  return null;
};
