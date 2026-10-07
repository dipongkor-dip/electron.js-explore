// oxlint-disable eslint-plugin-unicorn/no-empty-file
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("todoAPI", {
  list: () => ipcRenderer.invoke("todos:list"),

  create: (title: string) => ipcRenderer.invoke("todos:create", title),

  update: (id: string, title: string, completed: boolean) =>
    ipcRenderer.invoke("todos:update", id, title, completed),

  delete: (id: string) => ipcRenderer.invoke("todos:delete", id),
});
