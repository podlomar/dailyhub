import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Database {
  todos: Todo[];
}

const adapter = new JSONFile<Database>('data/todos.json');
export const db = new Low(adapter, { todos: [] });
