/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
declare module '*.css';


interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoAPI {
  list: () => Promise<TodoItem[]>;

  create: (title: string) => Promise<TodoItem>;

  update: (
    id: string,
    title: string,
    completed: boolean,
  ) => Promise<TodoItem>;

  delete: (id: string) => Promise<{ success: true }>;
}

declare global {
  interface Window {
    todoAPI: TodoAPI;
  }
}

export {};
