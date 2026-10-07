import { randomUUID } from "node:crypto";
import { readTodoFile, writeTodoFile } from "../todos/storage";
import type { Todo } from "../todos/todo.types";

export async function createTodo(title: string): Promise<Todo> {
  const trimmedTitle = title.trim();

  if (!trimmedTitle || trimmedTitle.length > 500) {
    throw new Error("Title must be 1–500 characters.");
  }

  const todos = await readTodoFile();

  const newTodo: Todo = {
    id: randomUUID(),
    title: trimmedTitle,
    completed: false,
  };

  todos.push(newTodo);

  await writeTodoFile(todos);

  return newTodo;
}

export async function readTodos(): Promise<Todo[]> {
  return await readTodoFile();
}

export async function updateTodo(
  id: string,
  title: string,
  completed: boolean,
): Promise<Todo> {
  const trimmedTitle = title.trim();

  if (!trimmedTitle || trimmedTitle.length > 500) {
    throw new Error("Title must be 1–500 characters.");
  }

  const todos = await readTodoFile();
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    throw new Error("Todo not found.");
  }

  todo.title = trimmedTitle;
  todo.completed = completed;

  await writeTodoFile(todos);

  return todo;
}

export async function deleteTodo(id: string): Promise<{ success: true }> {
  const todos = await readTodoFile();
  const updatedTodos = todos.filter((todo) => todo.id !== id);

  if (updatedTodos.length === todos.length) {
    throw new Error("Todo not found.");
  }

  await writeTodoFile(updatedTodos);

  return { success: true };
}
