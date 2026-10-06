const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let editingId = null;

async function renderTodos() {
  const todos = await window.todoAPI.getTodos();

  list.replaceChildren();

  todos.forEach((todo) => {
    const li = document.createElement("li");

    const title = document.createElement("span");
    title.textContent = todo.title;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
      input.value = todo.title;
      editingId = todo.id;
      input.focus();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", async () => {
      await window.todoAPI.deleteTodo(todo.id);

      if (editingId === todo.id) {
        editingId = null;
        input.value = "";
      }

      renderTodos();
    });

    li.append(title, editButton, deleteButton);
    list.appendChild(li);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  if (editingId) {
    await window.todoAPI.updateTodo(editingId, title);
    editingId = null;
  } else {
    await window.todoAPI.addTodo(title);
  }

  input.value = "";
  renderTodos();
});

renderTodos();
