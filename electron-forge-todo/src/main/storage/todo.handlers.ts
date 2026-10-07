import { ipcMain } from "electron";
import {
  createTodo,
  deleteTodo,
  readTodos,
  updateTodo,
} from "./todo.repository";

console.log("✅ Todo IPC handlers file loaded");

ipcMain.handle("todos:list", async () => {
  return await readTodos();
});

ipcMain.handle("todos:create", async (_event, title: unknown) => {
  if (typeof title !== "string") {
    throw new Error("Invalid Todo title.");
  }

  console.log("Registering todos:create handler");

  return await createTodo(title);
});

ipcMain.handle(
  "todos:update",
  async (_event, id: unknown, title: unknown, completed: unknown) => {
    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof completed !== "boolean"
    ) {
      throw new Error("Invalid Todo update.");
    }

    return await updateTodo(id, title, completed);
  },
);

ipcMain.handle("todos:delete", async (_event, id: unknown) => {
  if (typeof id !== "string") {
    throw new Error("Invalid Todo ID.");
  }

  return await deleteTodo(id);
});
