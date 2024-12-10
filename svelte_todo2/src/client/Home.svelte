<script lang="ts">
  import { onMount } from "svelte";
  import TodoList from "./Home/TodoList.svelte";
  import TodoForm from "./Home/TodoForm.svelte";
  import TodoSearch from "./Home/TodoSearch.svelte";
  import { getTodos, createTodo, updateTodo, deleteTodo, searchTodos } from "./Home/api";
  import type { NewTodo, Todo } from "../db/schema";

  let todos: Todo[] = [];
  let showForm = false;
  let editingTodo: Partial<Todo> | undefined = undefined;

  onMount(async () => {
    await loadTodos();
  });

  async function loadTodos() {
    todos = await getTodos();
  }

  async function handleSearch(event: any) {
    const query = event.detail;
    if (query) {
      todos = await searchTodos(query);
    } else {
      await loadTodos();
    }
  }

  async function handleCreate(event: any) {
    const newTodo: NewTodo = event.detail;
    const createdTodo = await createTodo(newTodo);
    todos = [...todos, createdTodo];
    showForm = false;
    editingTodo = undefined;
  }

  async function handleUpdate(event: any) {
    const updatedTodo: NewTodo = event.detail;
    const result = await updateTodo(editingTodo.id, updatedTodo);
    todos = todos.map((t) => (t.id === result.id ? result : t));
    showForm = false;
    editingTodo = undefined;
  }

  async function handleDelete(id: number) {
    await deleteTodo(id);
    todos = todos.filter((t) => t.id !== id);
  }

  function openCreateForm() {
    showForm = true;
    editingTodo = undefined; // 編集中の TODO をリセット
  }

  function openEditForm(todo: Todo) {
    showForm = true;
    editingTodo = todo;
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Svelte CRUD App</h1>

  <TodoSearch on:search={handleSearch} />

  <button on:click={openCreateForm} class="px-4 py-2 bg-green-500 text-white rounded-md mb-4">
    Add Todo
  </button>
  {#if showForm}
  <TodoForm
    bind:open={showForm}
    todo={editingTodo}
    on:submit={editingTodo ? handleUpdate : handleCreate}
  />
  {/if}

  <TodoList {todos} on:edit={openEditForm} on:delete={handleDelete} />
</div>