<script lang="ts">
  import type { Todo } from "../../db/schema";
  import { getTodos, createTodo, updateTodo, deleteTodo, searchTodos } from "./api";
  import { createEventDispatcher } from "svelte";
  import TodoForm from "./TodoForm.svelte";

  export let todos: Todo[] = [];

  let showForm = false;
  let editingTodo: Partial<Todo> | undefined = undefined;

  const dispatch = createEventDispatcher();

  function handleEdit(todo: Todo) {
    console.log(todo);
    editingTodo = todo;
    showForm = true;
    //dispatch("edit", todo);
  }

  async function handleDelete(id: number) {
    console.log("#handleDelete=", id);
    await deleteTodo(id);
    location.reload();
    //dispatch("delete", id);
  }
</script>

<!-- HTML -->
<ul class="space-y-2">
  {#each todos as todo (todo.id)}
    <li class="bg-white p-4 rounded-lg shadow">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">{todo.title}</h3>
        <div class="space-x-2">
          <button on:click={() => handleEdit(todo)} class="px-3 py-1 bg-blue-500 text-white rounded-md">
            Edit
          </button>
          <button on:click={() => handleDelete(todo.id)} class="px-3 py-1 bg-red-500 text-white rounded-md">
            Delete
          </button>
        </div>
      </div>
      <p class="mt-2 text-gray-600">{todo.content}</p>
    </li>
  {/each}
</ul>

{#if showForm}
<TodoForm
  bind:open={showForm}
  todo={editingTodo}
  on:submit={null}
/>
{/if}
