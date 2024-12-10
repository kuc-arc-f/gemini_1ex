<template>
  <Dialog :open="isOpen" @close="closeDialog" class="relative z-10">
    <div class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
            {{ isEditing ? 'TODO編集' : 'TODO追加' }}
          </DialogTitle>
          <div class="mt-4 space-y-4">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700">タイトル</label>
              <input type="text" id="title" v-model="formData.title" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</span>
            </div>
            <div>
              <label for="content" class="block text-sm font-medium text-gray-700">内容</label>
              <textarea id="content" v-model="formData.content" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              <span v-if="errors.content" class="text-red-500 text-sm">{{ errors.content }}</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">公開設定</label>
              <div class="mt-2 space-x-4">
                <label class="inline-flex items-center">
                  <input type="radio" v-model="formData.publicType" :value="1" class="form-radio">
                  <span class="ml-2">公開</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" v-model="formData.publicType" :value="0" class="form-radio">
                  <span class="ml-2">非公開</span>
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">好きな果物</label>
              <div class="mt-2 space-x-4">
                <label class="inline-flex items-center">
                  <input type="checkbox" v-model="formData.foodOrange" class="form-checkbox">
                  <span class="ml-2">オレンジ</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="checkbox" v-model="formData.foodApple" class="form-checkbox">
                  <span class="ml-2">りんご</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="checkbox" v-model="formData.foodBanana" class="form-checkbox">
                  <span class="ml-2">バナナ</span>
                </label>
              </div>
            </div>
            <div>
              <label for="pubDate1" class="block text-sm font-medium text-gray-700">日付1</label>
              <input type="date" id="pubDate1" v-model="formData.pubDate1" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="pubDate2" class="block text-sm font-medium text-gray-700">日付2</label>
              <input type="date" id="pubDate2" v-model="formData.pubDate2" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="pubDate3" class="block text-sm font-medium text-gray-700">日付3</label>
              <input type="date" id="pubDate3" v-model="formData.pubDate3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="qty1" class="block text-sm font-medium text-gray-700">数量1</label>
              <input type="number" id="qty1" v-model.number="formData.qty1" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="qty2" class="block text-sm font-medium text-gray-700">数量2</label>
              <input type="number" id="qty2" v-model.number="formData.qty2" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="qty3" class="block text-sm font-medium text-gray-700">数量3</label>
              <input type="number" id="qty3" v-model.number="formData.qty3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>
          <div class="mt-4">
            <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none" @click="saveTodo">
              保存
            </button>
            <button type="button" class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ml-3" @click="closeDialog">
              キャンセル
            </button>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import { createTodo, updateTodo } from './api';
import { Todo } from './types';
import { todoSchema } from './validation';

const props = defineProps<{
  isOpen: boolean;
  editingTodo: Todo | null;
}>();

const emit = defineEmits(['close', 'save']);

const isEditing = computed(() => !!props.editingTodo);

const formData = reactive<Todo>({
  title: '',
  content: '',
  publicType: 1,
  foodOrange: false,
  foodApple: false,
  foodBanana: false,
  pubDate1: null,
  pubDate2: null,
  pubDate3: null,
  qty1: null,
  qty2: null,
  qty3: null,
});

const errors = ref<{ [key: string]: string }>({});

watch(() => props.editingTodo, (newVal) => {
  errors.value = {};
  if (newVal) {
    Object.assign(formData, newVal);
  } else {
    Object.assign(formData, {
      title: '',
      content: '',
      publicType: 1,
      foodOrange: false,
      foodApple: false,
      foodBanana: false,
      pubDate1: null,
      pubDate2: null,
      pubDate3: null,
      qty1: null,
      qty2: null,
      qty3: null,
    });
  }
});

const closeDialog = () => {
  emit('close');
};

const saveTodo = async () => {
  try {
    console.log("#saveTodo");
    //await todoSchema.validate(formData, { abortEarly: false });
    const result = todoSchema.parse(formData);
    errors.value = {};

    if (isEditing.value && props.editingTodo?.id) {
      await updateTodo(props.editingTodo.id, formData);
    } else {
      console.log("#createTodo");
      await createTodo(formData);
    }
    emit('save');
    closeDialog();
  } catch (err: any) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const validationErrors: { [key: string]: string } = {};
      err.inner.forEach((e: any) => {
        validationErrors[e.path] = e.message;
      });
      errors.value = validationErrors;
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
};
</script>
