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
    const diffDays = now.diff(createdDate, 'day');

    if (diffDays === 0) {
      todoList.today.push(todo);
    } else if (diffDays <= 3) {
      todoList.last3Days.push(todo);
    } else if (diffDays <= 7) {
      todoList.lastWeek.push(todo);
    } else if (diffDays <= 30) {
      todoList.lastMonth.push(todo);
    } else {
      todoList.older.push(todo);
    }
  }

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
