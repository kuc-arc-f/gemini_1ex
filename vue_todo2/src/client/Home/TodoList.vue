<template>
  <div>
    <ul class="space-y-4">
      <li v-for="todo in todos" :key="todo.id" class="bg-white shadow p-4 rounded-md">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">{{ todo.title }}</h3>
          <div class="flex space-x-2">
            <button @click="editTodo(todo)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <!-- 
              <PencilIcon class="h-5 w-5" />
              -->
              Edit
            </button>
            <button @click="deleteTodoItem(todo.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              <!--
              <TrashIcon class="h-5 w-5" />
              -->
              Delete
            </button>
          </div>
        </div>
        <p class="mt-2 text-gray-600">{{ todo.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTodos, deleteTodo } from './api';
import { Todo } from './types';
//import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const todos = ref<Todo[]>([]);

const props = defineProps<{
  onEdit: (todo: Todo) => void;
}>();

onMounted(async () => {
  await fetchTodos();
});

const fetchTodos = async () => {
  todos.value = await getTodos();
};

const deleteTodoItem = async (id?: number) => {
  if (!id) return;
  if (confirm('本当に削除しますか？')) {
    await deleteTodo(id);
    await fetchTodos();
  }
};

const editTodo = (todo: Todo) => {
  props.onEdit(todo);
};

defineExpose({
  fetchTodos
});
</script>
