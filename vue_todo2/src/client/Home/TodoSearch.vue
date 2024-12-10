<template>
  <div class="mb-4">
    <input type="text" v-model="query" placeholder="TODOを検索" class="px-4 py-2 border rounded-md w-full">
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const query = ref('');
const emit = defineEmits(['search']);

watch(query, (newQuery) => {
  emit('search', newQuery);
});
</script>

