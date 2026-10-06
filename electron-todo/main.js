const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("node:fs/promises");
const crypto = require("node:crypto");

// ---------- Todo Storage ----------

let todos = [];
let storagePath;

async function loadTodos() {
  try {
    todos = JSON.parse(await fs.readFile(storagePath, "utf8"));

    if (!Array.isArray(todos)) todos = [];
  } catch {
    todos = [];
  }
}

async function saveTodos() {
  await fs.writeFile(storagePath, JSON.stringify(todos, null, 2));
}

// READ
ipcMain.handle("todos:get", () => todos);

// CREATE
ipcMain.handle("todos:add", async (_event, title) => {
  if (typeof title !== "string" || !title.trim()) {
    return todos;
  }

  todos.push({
    id: crypto.randomUUID(),
    title: title.trim(),
  });

  await saveTodos();
  return todos;
});

// UPDATE
ipcMain.handle("todos:update", async (_event, id, title) => {
  if (typeof title !== "string" || !title.trim()) {
    return todos;
  }

  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, title: title.trim() } : todo,
  );

  await saveTodos();
  return todos;
});

// DELETE
ipcMain.handle("todos:delete", async (_event, id) => {
  todos = todos.filter((todo) => todo.id !== id);

  await saveTodos();
  return todos;
});

// ---------- Create Window ----------
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile("index.html");
}

// ---------- App Lifecycle ----------
app.whenReady().then(async () => {
  storagePath = path.join(app.getPath("userData"), "todos.json");

  await loadTodos();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
