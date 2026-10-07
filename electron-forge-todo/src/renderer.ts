/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 */

console.log(
  '👋 This message is being logged by the renderer process, included via Vite',
);



interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const form = document.querySelector<HTMLFormElement>("#todo-form")!;
const input = document.querySelector<HTMLInputElement>("#todo-input")!;
const submitButton =
  document.querySelector<HTMLButtonElement>("#submit-button")!;
const cancelButton =
  document.querySelector<HTMLButtonElement>("#cancel-button")!;
const todoList = document.querySelector<HTMLUListElement>("#todo-list")!;
const emptyMessage =
  document.querySelector<HTMLParagraphElement>("#empty-message")!;
const message = document.querySelector<HTMLParagraphElement>("#message")!;
const todoCount =
  document.querySelector<HTMLSpanElement>("#todo-count")!;

let todos: Todo[] = [];
let editingId: string | null = null;
let busy = false;

function showMessage(text: string, isError = false): void {
  message.textContent = text;
  message.dataset.type = isError ? "error" : "success";
}

function setBusy(value: boolean): void {
  busy = value;
  input.disabled = value;
  submitButton.disabled = value;
  cancelButton.disabled = value || editingId === null;
  todoList.querySelectorAll("button, input").forEach((element) => {
    (element as HTMLButtonElement | HTMLInputElement).disabled = value;
  });
}

function resetForm(): void {
  editingId = null;
  input.value = "";
  submitButton.textContent = "Add Todo";
  cancelButton.hidden = true;
  cancelButton.disabled = true;
}

function createActionButton(
  label: string,
  className: string,
  onClick: () => void,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
}

// READ
async function renderTodos(): Promise<void> {
  todos = await window.todoAPI.list();
  todoList.replaceChildren();

  emptyMessage.hidden = todos.length > 0;
  todoCount.textContent = `${todos.length} ${
    todos.length === 1 ? "task" : "tasks"
  }`;

  for (const todo of todos) {
    const li = document.createElement("li");
    li.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "todo-checkbox";
    checkbox.setAttribute("aria-label", `Complete ${todo.title}`);

    checkbox.addEventListener("change", async () => {
      setBusy(true);

      try {
        await window.todoAPI.update(
          todo.id,
          todo.title,
          checkbox.checked,
        );

        await renderTodos();
        showMessage("Task status updated.");
      } catch {
        showMessage("Could not update task status.", true);
        await renderTodos();
      } finally {
        setBusy(false);
      }
    });

    const title = document.createElement("span");
    title.className = "todo-title";
    title.textContent = todo.title;

    if (todo.completed) {
      title.classList.add("completed");
    }

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const editButton = createActionButton("Edit", "btn-edit", () => {
      editingId = todo.id;
      input.value = todo.title;
      submitButton.textContent = "Save Changes";
      cancelButton.hidden = false;
      cancelButton.disabled = busy;
      input.focus();
      showMessage("Editing task.");
    });

    const deleteButton = createActionButton("Delete", "btn-delete", async () => {
      setBusy(true);

      try {
        await window.todoAPI.delete(todo.id);

        if (editingId === todo.id) {
          resetForm();
        }

        await renderTodos();
        showMessage("Task deleted.");
      } catch {
        showMessage("Could not delete task.", true);
      } finally {
        setBusy(false);
      }
    });

    actions.append(editButton, deleteButton);
    li.append(checkbox, title, actions);
    todoList.append(li);
  }
}

// CREATE + UPDATE
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (busy) return;

  const title = input.value.trim();

  if (!title) {
    showMessage("Please enter a task.", true);
    input.focus();
    return;
  }

  if (title.length > 500) {
    showMessage("Task must be 500 characters or fewer.", true);
    return;
  }

  setBusy(true);

  try {
    if (editingId !== null) {
      const currentTodo = todos.find((todo) => todo.id === editingId);

      if (!currentTodo) {
        throw new Error("Todo not found.");
      }

      await window.todoAPI.update(
        editingId,
        title,
        currentTodo.completed,
      );

      showMessage("Task updated successfully.");
    } else {
      await window.todoAPI.create(title);
      showMessage("Task created successfully.");
    }

    resetForm();
    await renderTodos();
  } catch {
    showMessage("Could not save task. Please try again.", true);
  } finally {
    setBusy(false);
  }
});

cancelButton.addEventListener("click", () => {
  if (busy) return;

  resetForm();
  showMessage("Editing cancelled.");
});

async function initialize(): Promise<void> {
  setBusy(true);

  try {
    await renderTodos();
  } catch {
    showMessage("Could not load tasks. Check your JSON storage.", true);
  } finally {
    setBusy(false);
  }
}

void initialize();
