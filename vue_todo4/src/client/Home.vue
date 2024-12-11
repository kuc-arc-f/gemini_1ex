<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">TODO アプリ</h1>
    <todo-list />
  </div>
</template>

<script>
import TodoList from './Home/TodoList.vue';

export default {
  components: {
    TodoList,
  },
};
</script>