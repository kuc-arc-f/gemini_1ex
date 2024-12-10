<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">TODO App</h1>

    <TodoSearch @search="handleSearch" />

    <div class="mb-4">
      <button @click="openAddDialog" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        TODOを追加
      </button>
    </div>

    <TodoList :todos="filteredTodos" :on-edit="openEditDialog" ref="todoListRef" />

    <TodoDialog :is-open="isDialogOpen" :editing-todo="editingTodo" @close="closeDialog" @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import TodoList from './Home/TodoList.vue';
import TodoDialog from './Home/TodoDialog.vue';
import TodoSearch from './Home/TodoSearch.vue';
import {
   getTodos, createTodo, updateTodo, deleteTodo 
} from './Home/api';
import { Todo } from './Home/types';

const isDialogOpen = ref(false);
const editingTodo = ref<Todo | null>(null);
const todos = ref<Todo[]>([]);
const searchQuery = ref('');
const todoListRef = ref<InstanceType<typeof TodoList> | null>(null);

onMounted(async () => {
  await fetchTodos();
});

const filteredTodos = computed(() => {
  if (!searchQuery.value) {
    return todos.value;
  }
  return todos.value.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchTodos = async () => {
  todos.value = await getTodos();
};

const openAddDialog = () => {
  editingTodo.value = null;
  isDialogOpen.value = true;
};

const openEditDialog = (todo: Todo) => {
  editingTodo.value = todo;
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

const handleSave = async () => {
  await todoListRef.value?.fetchTodos();
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
};
</script>
