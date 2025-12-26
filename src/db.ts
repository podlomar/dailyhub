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

const adapter = new JSONFile<Database>('data/todos.json');
const db = new Low(adapter, { todos: [] });

export const getTodos = async (): Promise<Todo[]> => {
  await db.read();
  return db.data.todos;
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
