<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Todo } from "../../db/schema";
  import * as z from "zod";
  import { getTodos, createTodo, updateTodo, deleteTodo, searchTodos } from "./api";
//  import { computePosition, type ComputePositionConfig } from "@floating-ui/dom";

  export let todo: Partial<Todo> | undefined = undefined;
  export let open: boolean = false;

  let virtualReference = {
    getBoundingClientRect() {
      return {
        width: 0,
        height: 0,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
        right: window.innerWidth / 2,
        bottom: window.innerHeight / 2,
      };
    },
  };

  // バリデーションスキーマ
  const todoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    public_type: z.enum(["public", "private"]),
    food_orange: z.boolean().optional(),
    food_apple: z.boolean().optional(),
    food_banana: z.boolean().optional(),
    pub_date1: z.string().optional(),
    pub_date2: z.string().optional(),
    pub_date3: z.string().optional(),
    qty1: z.coerce.number().optional(),
    qty2: z.coerce.number().optional(),
    qty3: z.coerce.number().optional(),
  });

  type TodoSchema = z.infer<typeof todoSchema>;
  let formData = undefined;
  if(todo){
    formData = todo;
  }else{
    formData = {
      title: "",
      content: "",
      public_type: "public",
      food_orange: false,
      food_apple: false,
      food_banana: false,
      pub_date1: "",
      pub_date2: "",
      pub_date3: "",
      qty1: undefined,
      qty2: undefined,
      qty3: undefined,
    };
  }
  /*
  let formData: TodoSchema = {
    title: "",
    content: "",
    public_type: "public",
    food_orange: false,
    food_apple: false,
    food_banana: false,
    pub_date1: "",
    pub_date2: "",
    pub_date3: "",
    qty1: undefined,
    qty2: undefined,
    qty3: undefined,
  };

  $: if (todo) {
    formData.title = todo.title || "";
    formData.content = todo.content || "";
    formData.public_type = todo.public_type as "public" | "private";
    formData.food_orange = todo.food_orange || false;
    formData.food_apple = todo.food_apple || false;
    formData.food_banana = todo.food_banana || false;
    formData.pub_date1 = todo.pub_date1 || "";
    formData.pub_date2 = todo.pub_date2 || "";
    formData.pub_date3 = todo.pub_date3 || "";
    formData.qty1 = todo.qty1 || undefined;
    formData.qty2 = todo.qty2 || undefined;
    formData.qty3 = todo.qty3 || undefined;
  }
  */
  console.log("#todo");
  console.log(todo);

  const dispatch = createEventDispatcher();

  let errors: { [key: string]: string } = {};

  async function handleSubmit () {
    // バリデーション
    const result = todoSchema.safeParse(formData);
    if (!result.success) {
      errors = result.error.flatten().fieldErrors as {
        [key: string]: string;
      };
      console.error(errors);
      return;
    }
    console.log("#handleSubmit");
    if(todo){
      console.log(todo);
      const result = await updateTodo(todo.id, formData);
    }else{
      // フォーム送信
      dispatch("submit", formData);
    }

    // フォームをリセット
    formData = {
      title: "",
      content: "",
      public_type: "public",
      food_orange: false,
      food_apple: false,
      food_banana: false,
      pub_date1: "",
      pub_date2: "",
      pub_date3: "",
      qty1: undefined,
      qty2: undefined,
      qty3: undefined,
    };
    errors = {}; // エラーをクリア
  }
</script>


<!-- HTML -->
<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  <div class="bg-white p-4 rounded shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto" >
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          bind:value={formData.title}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {#if errors.title}
          <p class="mt-2 text-sm text-red-600">{errors.title}</p>
        {/if}
      </div>
  
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          bind:value={formData.content}
          rows="3"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {#if errors.content}
          <p class="mt-2 text-sm text-red-600">{errors.content}</p>
        {/if}
      </div>
  
      <div>
        <label class="block text-sm font-medium text-gray-700">Public Type</label>
        <div class="mt-1 space-x-4">
          <label class="inline-flex items-center">
            <input
              type="radio"
              bind:group={formData.public_type}
              value="public"
              class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span class="ml-2">Public</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              bind:group={formData.public_type}
              value="private"
              class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span class="ml-2">Private</span>
          </label>
        </div>
        {#if errors.public_type}
          <p class="mt-2 text-sm text-red-600">{errors.public_type}</p>
        {/if}
      </div>
  
      <!-- Checkbox fields -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Foods</label>
        <div class="mt-1 space-y-2">
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                bind:checked={formData.food_orange}
                class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span class="ml-2">Orange</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                bind:checked={formData.food_apple}
                class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span class="ml-2">Apple</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                bind:checked={formData.food_banana}
                class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span class="ml-2">Banana</span>
            </label>
          </div>
        </div>
      </div>
  
      <!-- Date fields -->
      <div class="mt-4 space-y-2">
        <div>
          <label for="pub_date1" class="block text-sm font-medium text-gray-700">Date 1</label>
          <input
            type="date"
            id="pub_date1"
            bind:value={formData.pub_date1}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="pub_date2" class="block text-sm font-medium text-gray-700">Date 2</label>
          <input
            type="date"
            id="pub_date2"
            bind:value={formData.pub_date2}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="pub_date3" class="block text-sm font-medium text-gray-700">Date 3</label>
          <input
            type="date"
            id="pub_date3"
            bind:value={formData.pub_date3}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
  
      <!-- Number fields -->
      <div class="mt-4 space-y-2">
        <div>
          <label for="qty1" class="block text-sm font-medium text-gray-700">Qty 1</label>
          <input
            type="number"
            id="qty1"
            bind:value={formData.qty1}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="qty2" class="block text-sm font-medium text-gray-700">Qty 2</label>
          <input
            type="number"
            id="qty2"
            bind:value={formData.qty2}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="qty3" class="block text-sm font-medium text-gray-700">Qty 3</label>
          <input
            type="number"
            id="qty3"
            bind:value={formData.qty3}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
  
      <div class="mt-4">
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {todo ? "Update" : "Create"}
        </button>
        <button
          type="button"
          class="mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          on:click={() => (open = false)}
        >
          Cancel
        </button>
      </div>
    </form>    
  </div>

</div>
