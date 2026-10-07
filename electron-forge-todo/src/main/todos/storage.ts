import { app } from "electron";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Todo } from "./todo.types";

function getFilePath(): string {
  return join(app.getPath("userData"), "todos.json");
}

export async function readTodoFile(): Promise<Todo[]> {
  const directory = app.getPath("userData");
  const filePath = getFilePath();

  await mkdir(directory, { recursive: true });

  try {
    const content = await readFile(filePath, "utf-8");
    const data: unknown = JSON.parse(content);

    if (
      !Array.isArray(data) ||
      !data.every(
        (item) =>
          item !== null &&
          typeof item === "object" &&
          typeof item.id === "string" &&
          typeof item.title === "string" &&
          typeof item.completed === "boolean",
      )
    ) {
      throw new Error("Invalid todos.json format.");
    }

    return data as Todo[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await writeFile(filePath, "[]", "utf-8");
      return [];
    }

    throw error;
  }
}

export async function writeTodoFile(todos: Todo[]): Promise<void> {
  const directory = app.getPath("userData");
  await mkdir(directory, { recursive: true });

  await writeFile(getFilePath(), JSON.stringify(todos, null, 2), "utf-8");
}
