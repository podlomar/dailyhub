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

export interface Database {
  todos: Todo[];
}

export interface TodoList {
  today: Todo[];
  last3Days: Todo[];
  lastWeek: Todo[];
  lastMonth: Todo[];
  older: Todo[];
}

const adapter = new JSONFile<Database>('data/todos.json');
const db = new Low(adapter, { todos: [] });

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
