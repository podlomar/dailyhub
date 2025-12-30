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

export interface HouseholdItem {
  id: string;
  name: string;
  isOut: boolean;
}

export interface HouseholdCategory {
  category: string;
  items: HouseholdItem[];
}

export interface Database {
  todos: Todo[];
  shoppingList: ShoppingItem[];
  household: HouseholdCategory[];
}

export interface TodoList {
  today: Todo[];
  last3Days: Todo[];
  lastWeek: Todo[];
  lastMonth: Todo[];
  older: Todo[];
}

const adapter = new JSONFile<Database>('data/database.json');
const db = new Low(adapter, {
  todos: [],
  shoppingList: [],
  household: []
});

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

export const getHousehold = async (): Promise<HouseholdCategory[]> => {
  await db.read();
  return db.data.household ?? [];
};

export const getShoppingList = async (): Promise<ShoppingItem[]> => {
  await db.read();
  return db.data.shoppingList ?? [];
};

export const addShoppingItem = async (name: string, quantity: number): Promise<ShoppingItem> => {
  await db.read();

  const newItem: ShoppingItem = {
    id: nanoid(8),
    name,
    quantity,
    purchased: false,
  };

  db.data.shoppingList.push(newItem);
  await db.write();
  return newItem;
};

export const toggleShoppingItem = async (id: string): Promise<ShoppingItem | null> => {
  await db.read();
  for (const item of db.data.shoppingList) {
    if (item.id === id) {
      item.purchased = !item.purchased;
      await db.write();
      return item;
    }
  }
  return null;
};

export const clearPurchasedItems = async (): Promise<void> => {
  await db.read();
  db.data.shoppingList = db.data.shoppingList.filter(item => !item.purchased);
  await db.write();
};
