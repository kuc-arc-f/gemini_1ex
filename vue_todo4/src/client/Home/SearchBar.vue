<template>
  <div class="mb-4">
    <input type="text" v-model="query" placeholder="TODO を検索" class="border p-2 rounded" />
    <button @click="search" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
      検索
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    };
  },
  methods: {
    search() {
      this.$emit('search', this.query);
    },
  },
};
</script>