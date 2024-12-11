<template>
  <div>
    <search-bar @search="handleSearch" />
    <button @click="openAddDialog" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
      TODO を追加
    </button>

    <div v-if="isLoading" class="text-center">読み込み中...</div>
    <div v-else>
      <div v-for="todo in todos" :key="todo.id" class="border p-4 mb-4">
        <h2 class="text-lg font-bold">{{ todo.title }}</h2>
        <p>{{ todo.content }}</p>

        <div class="mt-4">
          <button @click="openEditDialog(todo)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">編集</button>
          <button @click="deleteTodo(todo.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">削除</button>
        </div>
      </div>
    </div>

    <todo-form :show="showDialog" :todo="selectedTodo" @close="closeDialog" @save="saveTodo" />
  </div>
</template>

<script>
import TodoForm from './TodoForm.vue';
import SearchBar from './SearchBar.vue';
import api from './api';
import { z } from 'zod';

const todoSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  content: z.string().min(1, { message: 'コンテンツは必須です' }),
  content_type: z.string().optional(),
  public_type: z.boolean().optional(),
  food_orange: z.boolean().optional(),
  food_apple: z.boolean().optional(),
  food_banana: z.boolean().optional(),
  food_melon: z.boolean().optional(),
  food_grape: z.boolean().optional(),
  category_food: z.boolean().optional(),
  category_drink: z.boolean().optional(),
  category_gadget: z.boolean().optional(),
  category_sport: z.boolean().optional(),
  category_government: z.boolean().optional(),
  category_internet: z.boolean().optional(),
  category_smartphone: z.boolean().optional(),
  country_jp: z.string().optional(),
  country_en: z.string().optional(),
  prefecture_jp: z.string().optional(),
  prefecture_en: z.string().optional(),
  post_no_jp: z.string().optional(),
  post_no_en: z.string().optional(),
  address_1_jp: z.string().optional(),
  address_1_en: z.string().optional(),
  address_2_jp: z.string().optional(),
  address_2_en: z.string().optional(),
  address_other_jp: z.string().optional(),
  address_other_en: z.string().optional(),
  pub_date1: z.string().optional(),
  pub_date2: z.string().optional(),
  pub_date3: z.string().optional(),
  pub_date4: z.string().optional(),
  pub_date5: z.string().optional(),
  pub_date6: z.string().optional(),
  qty1: z.string().optional(),
  qty2: z.string().optional(),
  qty3: z.string().optional(),
  qty4: z.string().optional(),
  qty5: z.string().optional(),
  qty6: z.string().optional(),
});

export default {
  components: {
    TodoForm,
    SearchBar,
  },
  data() {
    return {
      todos: [],
      showDialog: false,
      selectedTodo: null,
      isLoading: false,
    };
  },
  async created() {
    await this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      this.isLoading = true;
      try {
        const response = await api.getTodos();
        console.log(response.data);
        this.todos = response.data;
      } catch (error) {
        console.error('TODO の取得に失敗しました:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteTodo(id) {
      if (!confirm('本当に削除しますか？')) return;

      try {
        await api.deleteTodo(id);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error('TODO の削除に失敗しました:', error);
      }
    },
    openAddDialog() {
      this.selectedTodo = null; // 新規作成時は selectedTodo を null にする
      this.showDialog = true;
    },
    openEditDialog(todo) {
      this.selectedTodo = { ...todo }; // 編集する TODO をコピーして selectedTodo に設定
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    async saveTodo(todo) {
      try {
        todoSchema.parse(todo);

        if (this.selectedTodo) {
          // 更新
          const response = await api.updateTodo(this.selectedTodo.id, todo);
          const index = this.todos.findIndex((t) => t.id === this.selectedTodo.id);
          this.todos[index] = response.data;
        } else {
          // 新規作成
          const response = await api.createTodo(todo);
          this.todos.push(response.data);
        }
        this.closeDialog();
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Zod バリデーションエラー
          console.error('バリデーションエラー:', error.errors);
          alert(
            error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('\n')
          );
        } else {
          console.error('TODO の保存に失敗しました:', error);
          alert('TODO の保存に失敗しました');
        }
      }
    },
    async handleSearch(query) {
      if (!query) {
        await this.fetchTodos();
        return;
      }

      this.isLoading = true;
      try {
        const response = await api.searchTodos(query);
        this.todos = response.data;
      } catch (error) {
        console.error('TODO の検索に失敗しました:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>