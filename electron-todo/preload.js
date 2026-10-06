const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("todoAPI", {
  getTodos: () => ipcRenderer.invoke("todos:get"),
  addTodo: (title) => ipcRenderer.invoke("todos:add", title),
  updateTodo: (id, title) => ipcRenderer.invoke("todos:update", id, title),
  deleteTodo: (id) => ipcRenderer.invoke("todos:delete", id),
});
