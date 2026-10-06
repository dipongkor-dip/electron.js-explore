# Electron Todo App

A small desktop todo application built with Electron. It lets you add, view, edit, and delete todos. Todo data is stored in a JSON file, so it is available again after the app is closed and reopened.

## Requirements

- Node.js and npm
- A desktop environment supported by Electron

## Run the app

From the project directory, install the dependencies:

```bash
npm install
```

Then start the app:

```bash
npm start
```

The `start` script in `package.json` runs `electron .`. Electron uses the project's `main` entry in `package.json` to launch `main.js`.

## Project structure

```text
electron-todo/
├── index.html     # HTML structure for the todo window
├── main.js        # Main process, window, IPC handlers, and JSON storage
├── package.json   # Project metadata, scripts, and Electron dependency
├── preload.js     # Bridge that exposes a limited API to the renderer
├── renderer.js    # Todo UI interactions and rendering
├── style.css      # UI styling
└── README.md      # Project documentation
```

## How the app works, step by step

1. **The npm script starts Electron**  
   `npm start` asks Electron to open the project directory (`.`). Electron reads the `main` property from `package.json` and starts `main.js`.

2. **The main process determines the data location**  
   Once `app.whenReady()` resolves, `main.js` uses `app.getPath("userData")` to get the operating system's user-data directory for the app. The persistent data file, `todos.json`, is stored there, not in the project directory.

3. **Previously saved todos are loaded**  
   Before opening a window, `loadTodos()` reads `todos.json` and parses it as JSON. If the data is not an array, or the file cannot be read or parsed, the app uses an empty array (`[]`) in memory.

4. **A BrowserWindow is created**  
   `createWindow()` creates an 800×600 window and loads `index.html`. It attaches `preload.js`; `contextIsolation: true` and `nodeIntegration: false` prevent page JavaScript from getting direct Node.js access.

5. **The HTML prepares the UI**  
   `index.html` defines the page title, todo input, submit button, and `<ul>` element for the todo list. It loads `style.css` and loads `renderer.js` with `defer`. Its Content Security Policy only permits scripts and styles from the app's own origin.

6. **The preload script exposes a limited API**  
   `contextBridge.exposeInMainWorld()` in `preload.js` creates `window.todoAPI` for the renderer. Its four methods use `ipcRenderer.invoke()` to send requests to the main process: `getTodos`, `addTodo`, `updateTodo`, and `deleteTodo`. The renderer does not receive the raw `ipcRenderer` object.

7. **The renderer displays the todo list**  
   `renderer.js` calls `renderTodos()` when it starts. The function gets the current list through `getTodos()`, clears the existing list content, and creates a title, Edit button, and Delete button for each todo. Todo titles are inserted with `textContent`.

8. **User actions reach the main process through IPC**  
   The preload API's `invoke()` calls match the `ipcMain.handle()` channels in `main.js`. The main process updates the data and saves it when needed, then returns the result to the renderer.

## Todo operations

- **Read:** When the app starts, the renderer invokes the `todos:get` channel and receives the current in-memory `todos` array from the main process.
- **Add:** On form submission, the renderer trims the input and sends no request if it is empty. The main process also validates the title's type and content, adds a todo with a UUID, and saves the array to `todos.json`.
- **Edit:** Clicking Edit puts the todo title in the input and stores its ID in `editingId`. On form submission, the renderer invokes `todos:update`; the main process trims and updates the title for the matching ID, then saves the data.
- **Delete:** Clicking Delete invokes `todos:delete`. The main process removes the matching ID and saves the data. If that todo was being edited, the renderer also clears the input and edit state.
- **Refresh the UI:** After adding, updating, or deleting a todo, the renderer calls `renderTodos()` again to fetch the latest list from the main process and display it.

## Data format and storage

The `todos.json` file contains a JSON array like this:

```json
[
  {
    "id": "generated-uuid",
    "title": "A task"
  }
]
```

After each change, `saveTodos()` writes the entire array to the file with two-space indentation. The storage path depends on the operating system and Electron app identity; `main.js` builds it by joining `app.getPath("userData")` with `todos.json`.

## Responsibilities of each file

- **`package.json`**: Defines the `electron-todo` package metadata, the `main.js` entry point, the `npm start` command, and Electron as a development dependency. The `npm test` script is currently a placeholder and exits with a "no test specified" error.
- **`main.js`**: Manages the authoritative in-memory todo data, JSON loading and saving, four IPC handlers, the BrowserWindow, and the app lifecycle.
- **`preload.js`**: Makes only the required todo operations available to the renderer through the context bridge.
- **`index.html`**: Defines the DOM structure for the form, input, button, and list.
- **`renderer.js`**: Handles form submission, edit and delete buttons, edit state, and DOM rendering.
- **`style.css`**: Defines the visual layout for the page, todo container, form, buttons, and list items.

## Electron lifecycle

- When the app is ready, it sets the storage path, loads the saved data, and then creates the first window.
- On macOS, the app process can remain active after all windows are closed. The `activate` event creates a new window if none are open.
- On platforms other than macOS, closing the last window quits the app.

## Current limitations

- There are no automated tests yet; `npm test` is only a placeholder.
- If the storage file is corrupt or unreadable, the app starts with an empty list. There is currently no error message or recovery flow.
- The UI does not include completion checkboxes, due dates, search, or categories. The current feature set is add, list, edit, and delete.
