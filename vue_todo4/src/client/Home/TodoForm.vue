<template>
  <div v-if="show" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-lg  max-h-[90vh] overflow-y-auto">
      <h2 class="text-lg font-bold mb-4">{{ selectedTodo ? 'TODO の編集' : 'TODO の追加' }}</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="title" class="block mb-2">タイトル</label>
          <input type="text" id="title" v-model="formData.title" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="content" class="block mb-2">コンテンツ</label>
          <textarea id="content" v-model="formData.content" class="w-full border p-2 rounded"></textarea>
        </div>

        <div class="mb-4">
          <label for="content_type" class="block mb-2">Content Type</label>
          <input type="text" id="content_type" v-model="formData.content_type" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label class="block mb-2">公開設定</label>
          <label class="inline-flex items-center">
            <input type="radio" v-model="formData.public_type" :value="true" class="form-radio" />
            <span class="ml-2">公開</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="radio" v-model="formData.public_type" :value="false" class="form-radio" />
            <span class="ml-2">非公開</span>
          </label>
        </div>

        <div class="mb-4">
          <span class="block mb-2">食べ物</span>
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="formData.food_orange" class="form-checkbox" />
            <span class="ml-2">オレンジ</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="checkbox" v-model="formData.food_apple" class="form-checkbox" />
            <span class="ml-2">りんご</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="checkbox" v-model="formData.food_banana" class="form-checkbox" />
            <span class="ml-2">バナナ</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="checkbox" v-model="formData.food_melon" class="form-checkbox" />
            <span class="ml-2">メロン</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="checkbox" v-model="formData.food_grape" class="form-checkbox" />
            <span class="ml-2">ぶどう</span>
          </label>
        </div>

        <div class="mb-4">
          <span class="block mb-2">カテゴリ</span>
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="formData.category_food" class="form-checkbox" />
            <span class="ml-2">食べ物</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="checkbox" v-model="formData.category_drink" class="form-checkbox" />
            <span class="ml-2">飲み物</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="checkbox" v-model="formData.category_gadget" class="form-checkbox" />
            <span class="ml-2">ガジェット</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="checkbox" v-model="formData.category_sport" class="form-checkbox" />
            <span class="ml-2">スポーツ</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="checkbox" v-model="formData.category_government" class="form-checkbox" />
            <span class="ml-2">政治</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="checkbox" v-model="formData.category_internet" class="form-checkbox" />
            <span class="ml-2">インターネット</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="checkbox" v-model="formData.category_smartphone" class="form-checkbox" />
            <span class="ml-2">スマートフォン</span>
          </label>
        </div>

        <div class="mb-4">
          <label for="country_jp" class="block mb-2">国 (日本語)</label>
          <input type="text" id="country_jp" v-model="formData.country_jp" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="country_en" class="block mb-2">国 (英語)</label>
          <input type="text" id="country_en" v-model="formData.country_en" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="prefecture_jp" class="block mb-2">都道府県 (日本語)</label>
          <input type="text" id="prefecture_jp" v-model="formData.prefecture_jp" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="prefecture_en" class="block mb-2">都道府県 (英語)</label>
          <input type="text" id="prefecture_en" v-model="formData.prefecture_en" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="post_no_jp" class="block mb-2">郵便番号 (日本語)</label>
          <input type="text" id="post_no_jp" v-model="formData.post_no_jp" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="post_no_en" class="block mb-2">郵便番号 (英語)</label>
          <input type="text" id="post_no_en" v-model="formData.post_no_en" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="address_1_jp" class="block mb-2">住所 1 (日本語)</label>
          <input type="text" id="address_1_jp" v-model="formData.address_1_jp" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="address_1_en" class="block mb-2">住所 1 (英語)</label>
          <input type="text" id="address_1_en" v-model="formData.address_1_en" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="address_2_jp" class="block mb-2">住所 2 (日本語)</label>
          <input type="text" id="address_2_jp" v-model="formData.address_2_jp" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="address_2_en" class="block mb-2">住所 2 (英語)</label>
          <input type="text" id="address_2_en" v-model="formData.address_2_en" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="address_other_jp" class="block mb-2">その他住所 (日本語)</label>
          <input type="text" id="address_other_jp" v-model="formData.address_other_jp" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="address_other_en" class="block mb-2">その他住所 (英語)</label>
          <input type="text" id="address_other_en" v-model="formData.address_other_en" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="pub_date1" class="block mb-2">日付 1</label>
          <input type="date" id="pub_date1" v-model="formData.pub_date1" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="pub_date2" class="block mb-2">日付 2</label>
          <input type="date" id="pub_date2" v-model="formData.pub_date2" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="pub_date3" class="block mb-2">日付 3</label>
          <input type="date" id="pub_date3" v-model="formData.pub_date3" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="pub_date4" class="block mb-2">日付 4</label>
          <input type="date" id="pub_date4" v-model="formData.pub_date4" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="pub_date5" class="block mb-2">日付 5</label>
          <input type="date" id="pub_date5" v-model="formData.pub_date5" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="pub_date6" class="block mb-2">日付 6</label>
          <input type="date" id="pub_date6" v-model="formData.pub_date6" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="qty1" class="block mb-2">数量 1</label>
          <input type="number" id="qty1" v-model="formData.qty1" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="qty2" class="block mb-2">数量 2</label>
          <input type="number" id="qty2" v-model="formData.qty2" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="qty3" class="block mb-2">数量 3</label>
          <input type="number" id="qty3" v-model="formData.qty3" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="qty4" class="block mb-2">数量 4</label>
          <input type="number" id="qty4" v-model="formData.qty4" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="qty5" class="block mb-2">数量 5</label>
          <input type="number" id="qty5" v-model="formData.qty5" class="w-full border p-2 rounded" />
        </div>

        <div class="mb-4">
          <label for="qty6" class="block mb-2">数量 6</label>
          <input type="number" id="qty6" v-model="formData.qty6" class="w-full border p-2 rounded" />
        </div>

        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            保存
          </button>
          <button type="button" @click="close" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            キャンセル
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    todo: Object,
  },
  emits: ['close', 'save'],
  data() {
    return {
      formData: {
        title: this.todo?.title || '',
        content: this.todo?.content || '',
        content_type: this.todo?.content_type || '',
        public_type: this.todo?.public_type !== undefined ? this.todo.public_type : true,
        food_orange: this.todo?.food_orange || false,
        food_apple: this.todo?.food_apple || false,
        food_banana: this.todo?.food_banana || false,
        food_melon: this.todo?.food_melon || false,
        food_grape: this.todo?.food_grape || false,
        category_food: this.todo?.category_food || false,
        category_drink: this.todo?.category_drink || false,
        category_gadget: this.todo?.category_gadget || false,
        category_sport: this.todo?.category_sport || false,
        category_government: this.todo?.category_government || false,
        category_internet: this.todo?.category_internet || false,
        category_smartphone: this.todo?.category_smartphone || false,
        country_jp: this.todo?.country_jp || '',
        country_en: this.todo?.country_en || '',
        prefecture_jp: this.todo?.prefecture_jp || '',
        prefecture_en: this.todo?.prefecture_en || '',
        post_no_jp: this.todo?.post_no_jp || '',
        post_no_en: this.todo?.post_no_en || '',
        address_1_jp: this.todo?.address_1_jp || '',
        address_1_en: this.todo?.address_1_en || '',
        address_2_jp: this.todo?.address_2_jp || '',
        address_2_en: this.todo?.address_2_en || '',
        address_other_jp: this.todo?.address_other_jp || '',
        address_other_en: this.todo?.address_other_en || '',
        pub_date1: this.todo?.pub_date1 || '',
        pub_date2: this.todo?.pub_date2 || '',
        pub_date3: this.todo?.pub_date3 || '',
        pub_date4: this.todo?.pub_date4 || '',
        pub_date5: this.todo?.pub_date5 || '',
        pub_date6: this.todo?.pub_date6 || '',
        qty1: this.todo?.qty1 || '',
        qty2: this.todo?.qty2 || '',
        qty3: this.todo?.qty3 || '',
        qty4: this.todo?.qty4 || '',
        qty5: this.todo?.qty5 || '',
        qty6: this.todo?.qty6 || '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('save', this.formData);
    },
    close() {
      this.$emit('close');
    },
  },
  watch: {
    todo: {
      handler(newTodo) {
        // プロパティが変更されたときに formData を更新する
        this.formData.title = newTodo?.title || '';
        this.formData.content = newTodo?.content || '';
        this.formData.content_type = newTodo?.content_type || '';
        this.formData.public_type = newTodo?.public_type !== undefined ? newTodo.public_type : true;
        this.formData.food_orange = newTodo?.food_orange || false;
        this.formData.food_apple = newTodo?.food_apple || false;
        this.formData.food_banana = newTodo?.food_banana || false;
        this.formData.food_melon = newTodo?.food_melon || false;
        this.formData.food_grape = newTodo?.food_grape || false;
        this.formData.category_food = newTodo?.category_food || false;
        this.formData.category_drink = newTodo?.category_drink || false;
        this.formData.category_gadget = newTodo?.category_gadget || false;
        this.formData.category_sport = newTodo?.category_sport || false;
        this.formData.category_government = newTodo?.category_government || false;
        this.formData.category_internet = newTodo?.category_internet || false;
        this.formData.category_smartphone = newTodo?.category_smartphone || false;
        this.formData.country_jp = newTodo?.country_jp || '';
        this.formData.country_en = newTodo?.country_en || '';
        this.formData.prefecture_jp = newTodo?.prefecture_jp || '';
        this.formData.prefecture_en = newTodo?.prefecture_en || '';
        this.formData.post_no_jp = newTodo?.post_no_jp || '';
        this.formData.post_no_en = newTodo?.post_no_en || '';
        this.formData.address_1_jp = newTodo?.address_1_jp || '';
        this.formData.address_1_en = newTodo?.address_1_en || '';
        this.formData.address_2_jp = newTodo?.address_2_jp || '';
        this.formData.address_2_en = newTodo?.address_2_en || '';
        this.formData.address_other_jp = newTodo?.address_other_jp || '';
        this.formData.address_other_en = newTodo?.address_other_en || '';
        this.formData.pub_date1 = newTodo?.pub_date1 || '';
        this.formData.pub_date2 = newTodo?.pub_date2 || '';
        this.formData.pub_date3 = newTodo?.pub_date3 || '';
        this.formData.pub_date4 = newTodo?.pub_date4 || '';
        this.formData.pub_date5 = newTodo?.pub_date5 || '';
        this.formData.pub_date6 = newTodo?.pub_date6 || '';
        this.formData.qty1 = newTodo?.qty1 || '';
        this.formData.qty2 = newTodo?.qty2 || '';
        this.formData.qty3 = newTodo?.qty3 || '';
        this.formData.qty4 = newTodo?.qty4 || '';
        this.formData.qty5 = newTodo?.qty5 || '';
        this.formData.qty6 = newTodo?.qty6 || '';
      },
      deep: true,
    },
  },
};
</script>