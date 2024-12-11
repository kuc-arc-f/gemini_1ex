<!-- src/components/TodoList.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Todo } from './schema';
  import TodoDialog from "./TodoDialog.svelte";
  import { 
    getTodos, createTodo, updateTodo, deleteTodo, searchTodos 
  } from "./api";

  export let todos: Todo[] = [];
  let showForm = false;
  let editingTodo: Partial<Todo> | undefined = undefined;

  const dispatch = createEventDispatcher();

  const handleEdit = (todo: Todo) => {
    editingTodo = todo;
    showForm = true;
    //dispatch('edit', todo);
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    location.reload();
    //dispatch('delete', id);
  };
</script>

<div class="mt-6">
  {#each todos as todo (todo.id)}
    <div class="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
      <div>
        <h3 class="text-lg font-bold">{todo.title}</h3>
        <p class="text-gray-600">{todo.content}</p>
      </div>
      <div>
        <button on:click={() => handleEdit(todo)} class="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 mr-2">
          Edit
        </button>
        <button on:click={() => handleDelete(todo.id)} class="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  {:else}
    <p class="text-gray-600">No todos found.</p>
  {/each}

  {#if showForm}
  <TodoDialog
    bind:isOpen={showForm}
    todo={editingTodo}
    on:submit={null}
  />
  {/if}
</div>