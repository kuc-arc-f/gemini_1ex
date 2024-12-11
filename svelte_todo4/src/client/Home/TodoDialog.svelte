<!-- src/components/TodoDialog.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { todoSchema, type FormData } from './validation';
  import { z } from 'zod';
  import type { NewTodo } from './schema';
  import {
    getTodos, createTodo, updateTodo, deleteTodo, searchTodos 
  } from "./api";

  export let isOpen: boolean;
  export let todo: NewTodo | null = null;

  let formData = undefined;
  if(todo){
    formData = todo;
  }else{
    formData = {
      title: '',
      content: '',
      contentType: '',
      publicType: 'public',
      foodOrange: false,
      foodApple: false,
      foodBanana: false,
      foodMelon: false,
      foodGrape: false,
      categoryFood: false,
      categoryDrink: false,
      categoryGadget: false,
      categorySport: false,
      categoryGovernment: false,
      categoryInternet: false,
      categorySmartphone: false,
      countryJp: '',
      countryEn: '',
      prefectureJp: '',
      prefectureEn: '',
      postNoJp: '',
      postNoEn: '',
      address1Jp: '',
      address1En: '',
      address2Jp: '',
      address2En: '',
      addressOtherJp: '',
      addressOtherEn: '',
      pubDate1: '',
      pubDate2: '',
      pubDate3: '',
      pubDate4: '',
      pubDate5: '',
      pubDate6: '',
      qty1: '',
      qty2: '',
      qty3: '',
      qty4: '',
      qty5: '',
      qty6: '',
    };
  }
  /*
  let formData: FormData = {
    title: '',
    content: '',
    contentType: '',
    publicType: 'public',
    foodOrange: false,
    foodApple: false,
    foodBanana: false,
    foodMelon: false,
    foodGrape: false,
    categoryFood: false,
    categoryDrink: false,
    categoryGadget: false,
    categorySport: false,
    categoryGovernment: false,
    categoryInternet: false,
    categorySmartphone: false,
    countryJp: '',
    countryEn: '',
    prefectureJp: '',
    prefectureEn: '',
    postNoJp: '',
    postNoEn: '',
    address1Jp: '',
    address1En: '',
    address2Jp: '',
    address2En: '',
    addressOtherJp: '',
    addressOtherEn: '',
    pubDate1: '',
    pubDate2: '',
    pubDate3: '',
    pubDate4: '',
    pubDate5: '',
    pubDate6: '',
    qty1: '',
    qty2: '',
    qty3: '',
    qty4: '',
    qty5: '',
    qty6: '',
  };
  $: if (todo) {
    formData.title = todo.title;
    formData.content = todo.content;
    formData.contentType = todo.contentType || '';
    formData.publicType = todo.publicType || 'public';
    formData.foodOrange = todo.foodOrange || false;
    formData.foodApple = todo.foodApple || false;
    formData.foodBanana = todo.foodBanana || false;
    formData.foodMelon = todo.foodMelon || false;
    formData.foodGrape = todo.foodGrape || false;
    formData.categoryFood = todo.categoryFood || false;
    formData.categoryDrink = todo.categoryDrink || false;
    formData.categoryGadget = todo.categoryGadget || false;
    formData.categorySport = todo.categorySport || false;
    formData.categoryGovernment = todo.categoryGovernment || false;
    formData.categoryInternet = todo.categoryInternet || false;
    formData.categorySmartphone = todo.categorySmartphone || false;
    formData.countryJp = todo.countryJp || '';
    formData.countryEn = todo.countryEn || '';
    formData.prefectureJp = todo.prefectureJp || '';
    formData.prefectureEn = todo.prefectureEn || '';
    formData.postNoJp = todo.postNoJp || '';
    formData.postNoEn = todo.postNoEn || '';
    formData.address1Jp = todo.address1Jp || '';
    formData.address1En = todo.address1En || '';
    formData.address2Jp = todo.address2Jp || '';
    formData.address2En = todo.address2En || '';
    formData.addressOtherJp = todo.addressOtherJp || '';
    formData.addressOtherEn = todo.addressOtherEn || '';
    formData.pubDate1 = todo.pubDate1 || '';
    formData.pubDate2 = todo.pubDate2 || '';
    formData.pubDate3 = todo.pubDate3 || '';
    formData.pubDate4 = todo.pubDate4 || '';
    formData.pubDate5 = todo.pubDate5 || '';
    formData.pubDate6 = todo.pubDate6 || '';
    formData.qty1 = todo.qty1 || '';
    formData.qty2 = todo.qty2 || '';
    formData.qty3 = todo.qty3 || '';
    formData.qty4 = todo.qty4 || '';
    formData.qty5 = todo.qty5 || '';
    formData.qty6 = todo.qty6 || '';
  }  
  */


  let errors: { [key: string]: string[] } = {};

  const dispatch = createEventDispatcher();

  const handleSubmit = async () => {
    const result = todoSchema.safeParse(formData);
    console.log(todo);
    if (result.success) {
      if(!todo){
        console.log("#create")
        const createdTodo = await createTodo(formData);
        console.log(createdTodo);
      }else{
        console.log(formData);
        const result = await updateTodo(formData.id, formData);
        console.log(result);
      }
      location.reload();
      resetForm();
      isOpen = false;
    } else {
      errors = result.error.flatten().fieldErrors;
    }
  };

  const handleClose = () => {
    resetForm();
    isOpen = false;
  };

  const resetForm = () => {
    formData = {
      title: '',
      content: '',
      contentType: '',
      publicType: 'public',
      foodOrange: false,
      foodApple: false,
      foodBanana: false,
      foodMelon: false,
      foodGrape: false,
      categoryFood: false,
      categoryDrink: false,
      categoryGadget: false,
      categorySport: false,
      categoryGovernment: false,
      categoryInternet: false,
      categorySmartphone: false,
      countryJp: '',
      countryEn: '',
      prefectureJp: '',
      prefectureEn: '',
      postNoJp: '',
      postNoEn: '',
      address1Jp: '',
      address1En: '',
      address2Jp: '',
      address2En: '',
      addressOtherJp: '',
      addressOtherEn: '',
      pubDate1: '',
      pubDate2: '',
      pubDate3: '',
      pubDate4: '',
      pubDate5: '',
      pubDate6: '',
      qty1: '',
      qty2: '',
      qty3: '',
      qty4: '',
      qty5: '',
      qty6: '',
    };
    errors = {};
  };
</script>

{#if isOpen}
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 opacity-75" on:click={handleClose} />
      <div class="bg-white p-8 rounded-lg z-20 w-full max-w-2xl">
        <h2 class="text-xl font-bold mb-4">
          {#if todo}
            Edit Todo
          {:else}
            Add Todo
          {/if}
        </h2>
        <form on:submit|preventDefault={handleSubmit}>
          <!-- Title -->
          <div class="mb-4">
            <label for="title" class="block mb-2">Title</label>
            <input type="text" id="title" bind:value={formData.title} class="w-full px-3 py-2 border rounded" />
            {#if errors.title}
              <p class="text-red-500 text-sm mt-1">{errors.title[0]}</p>
            {/if}
          </div>

          <!-- Content -->
          <div class="mb-4">
            <label for="content" class="block mb-2">Content</label>
            <textarea id="content" bind:value={formData.content} class="w-full px-3 py-2 border rounded" />
            {#if errors.content}
              <p class="text-red-500 text-sm mt-1">{errors.content[0]}</p>
            {/if}
          </div>

          <!-- Content Type -->
          <div class="mb-4">
            <label for="contentType" class="block mb-2">Content Type</label>
            <input type="text" id="contentType" bind:value={formData.contentType} class="w-full px-3 py-2 border rounded" />
            {#if errors.contentType}
              <p class="text-red-500 text-sm mt-1">{errors.contentType[0]}</p>
            {/if}
          </div>

          <!-- Public Type -->
          <div class="mb-4">
            <label class="block mb-2">Public Type</label>
            <div class="flex">
              <label class="mr-4">
                <input type="radio" bind:group={formData.publicType} value="public" /> Public
              </label>
              <label>
                <input type="radio" bind:group={formData.publicType} value="private" /> Private
              </label>
            </div>
            {#if errors.publicType}
              <p class="text-red-500 text-sm mt-1">{errors.publicType[0]}</p>
            {/if}
          </div>

          <!-- Food Checkboxes -->
          <div class="mb-4">
            <label class="block mb-2">Foods</label>
            <div class="flex flex-wrap">
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.foodOrange} /> Orange
              </label>
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.foodApple} /> Apple
              </label>
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.foodBanana} /> Banana
              </label>
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.foodMelon} /> Melon
              </label>
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.foodGrape} /> Grape
              </label>
            </div>
            {#if errors.foodOrange}
              <p class="text-red-500 text-sm mt-1">{errors.foodOrange[0]}</p>
            {/if}
            {#if errors.foodApple}
              <p class="text-red-500 text-sm mt-1">{errors.foodApple[0]}</p>
            {/if}
            {#if errors.foodBanana}
              <p class="text-red-500 text-sm mt-1">{errors.foodBanana[0]}</p>
            {/if}
            {#if errors.foodMelon}
              <p class="text-red-500 text-sm mt-1">{errors.foodMelon[0]}</p>
            {/if}
            {#if errors.foodGrape}
              <p class="text-red-500 text-sm mt-1">{errors.foodGrape[0]}</p>
            {/if}
          </div>

          <!-- Category Checkboxes -->
          <div class="mb-4">
            <label class="block mb-2">Categories</label>
            <div class="flex flex-wrap">
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.categoryFood} /> Food
              </label>
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.categoryDrink} /> Drink
              </label>
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.categoryGadget} /> Gadget
              </label>
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.categorySport} /> Sport
              </label>
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.categoryGovernment} /> Government
              </label>
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.categoryInternet} /> Internet
              </label>
              <label class="mr-4">
                <input type="checkbox" bind:checked={formData.categorySmartphone} /> Smartphone
              </label>
            </div>
            {#if errors.categoryFood}
              <p class="text-red-500 text-sm mt-1">{errors.categoryFood[0]}</p>
            {/if}
            {#if errors.categoryDrink}
              <p class="text-red-500 text-sm mt-1">{errors.categoryDrink[0]}</p>
            {/if}
            {#if errors.categoryGadget}
              <p class="text-red-500 text-sm mt-1">{errors.categoryGadget[0]}</p>
            {/if}
            {#if errors.categorySport}
              <p class="text-red-500 text-sm mt-1">{errors.categorySport[0]}</p>
            {/if}
            {#if errors.categoryGovernment}
              <p class="text-red-500 text-sm mt-1">{errors.categoryGovernment[0]}</p>
            {/if}
            {#if errors.categoryInternet}
              <p class="text-red-500 text-sm mt-1">{errors.categoryInternet[0]}</p>
            {/if}
            {#if errors.categorySmartphone}
              <p class="text-red-500 text-sm mt-1">{errors.categorySmartphone[0]}</p>
            {/if}
          </div>

          <!-- Country -->
          <div class="mb-4">
            <label for="countryJp" class="block mb-2">Country (JP)</label>
            <input type="text" id="countryJp" bind:value={formData.countryJp} class="w-full px-3 py-2 border rounded" />
            {#if errors.countryJp}
              <p class="text-red-500 text-sm mt-1">{errors.countryJp[0]}</p>
            {/if}
            <label for="countryEn" class="block mb-2">Country (EN)</label>
            <input type="text" id="countryEn" bind:value={formData.countryEn} class="w-full px-3 py-2 border rounded" />
            {#if errors.countryEn}
              <p class="text-red-500 text-sm mt-1">{errors.countryEn[0]}</p>
            {/if}
          </div>

          <!-- Prefecture -->
          <div class="mb-4">
            <label for="prefectureJp" class="block mb-2">Prefecture (JP)</label>
            <input type="text" id="prefectureJp" bind:value={formData.prefectureJp} class="w-full px-3 py-2 border rounded" />
            {#if errors.prefectureJp}
              <p class="text-red-500 text-sm mt-1">{errors.prefectureJp[0]}</p>
            {/if}
            <label for="prefectureEn" class="block mb-2">Prefecture (EN)</label>
            <input type="text" id="prefectureEn" bind:value={formData.prefectureEn} class="w-full px-3 py-2 border rounded" />
            {#if errors.prefectureEn}
              <p class="text-red-500 text-sm mt-1">{errors.prefectureEn[0]}</p>
            {/if}
          </div>

          <!-- Post No -->
          <div class="mb-4">
            <label for="postNoJp" class="block mb-2">Post No (JP)</label>
            <input type="text" id="postNoJp" bind:value={formData.postNoJp} class="w-full px-3 py-2 border rounded" />
            {#if errors.postNoJp}
              <p class="text-red-500 text-sm mt-1">{errors.postNoJp[0]}</p>
            {/if}
            <label for="postNoEn" class="block mb-2">Post No (EN)</label>
            <input type="text" id="postNoEn" bind:value={formData.postNoEn} class="w-full px-3 py-2 border rounded" />
            {#if errors.postNoEn}
              <p class="text-red-500 text-sm mt-1">{errors.postNoEn[0]}</p>
            {/if}
          </div>

          <!-- Address 1 -->
          <div class="mb-4">
            <label for="address1Jp" class="block mb-2">Address 1 (JP)</label>
            <input type="text" id="address1Jp" bind:value={formData.address1Jp} class="w-full px-3 py-2 border rounded" />
            {#if errors.address1Jp}
              <p class="text-red-500 text-sm mt-1">{errors.address1Jp[0]}</p>
            {/if}
            <label for="address1En" class="block mb-2">Address 1 (EN)</label>
            <input type="text" id="address1En" bind:value={formData.address1En} class="w-full px-3 py-2 border rounded" />
            {#if errors.address1En}
              <p class="text-red-500 text-sm mt-1">{errors.address1En[0]}</p>
            {/if}
          </div>

          <!-- Address 2 -->
          <div class="mb-4">
            <label for="address2Jp" class="block mb-2">Address 2 (JP)</label>
            <input type="text" id="address2Jp" bind:value={formData.address2Jp} class="w-full px-3 py-2 border rounded" />
            {#if errors.address2Jp}
              <p class="text-red-500 text-sm mt-1">{errors.address2Jp[0]}</p>
            {/if}
            <label for="address2En" class="block mb-2">Address 2 (EN)</label>
            <input type="text" id="address2En" bind:value={formData.address2En} class="w-full px-3 py-2 border rounded" />
            {#if errors.address2En}
              <p class="text-red-500 text-sm mt-1">{errors.address2En[0]}</p>
            {/if}
          </div>

          <!-- Address Other -->
          <div class="mb-4">
            <label for="addressOtherJp" class="block mb-2">Address Other (JP)</label>
            <input
              type="text"
              id="addressOtherJp"
              bind:value={formData.addressOtherJp}
              class="w-full px-3 py-2 border rounded"
            />
            {#if errors.addressOtherJp}
              <p class="text-red-500 text-sm mt-1">{errors.addressOtherJp[0]}</p>
            {/if}
            <label for="addressOtherEn" class="block mb-2">Address Other (EN)</label>
            <input
              type="text"
              id="addressOtherEn"
              bind:value={formData.addressOtherEn}
              class="w-full px-3 py-2 border rounded"
            />
            {#if errors.addressOtherEn}
              <p class="text-red-500 text-sm mt-1">{errors.addressOtherEn[0]}</p>
            {/if}
          </div>

          <!-- Pub Dates -->
          <div class="mb-4">
            <label for="pubDate1" class="block mb-2">Pub Date 1</label>
            <input type="date" id="pubDate1" bind:value={formData.pubDate1} class="w-full px-3 py-2 border rounded" />
            {#if errors.pubDate1}
              <p class="text-red-500 text-sm mt-1">{errors.pubDate1[0]}</p>
            {/if}
            <label for="pubDate2" class="block mb-2">Pub Date 2</label>
            <input type="date" id="pubDate2" bind:value={formData.pubDate2} class="w-full px-3 py-2 border rounded" />
            {#if errors.pubDate2}
              <p class="text-red-500 text-sm mt-1">{errors.pubDate2[0]}</p>
            {/if}
            <label for="pubDate3" class="block mb-2">Pub Date 3</label>
            <input type="date" id="pubDate3" bind:value={formData.pubDate3} class="w-full px-3 py-2 border rounded" />
            {#if errors.pubDate3}
              <p class="text-red-500 text-sm mt-1">{errors.pubDate3[0]}</p>
            {/if}
            <label for="pubDate4" class="block mb-2">Pub Date 4</label>
            <input type="date" id="pubDate4" bind:value={formData.pubDate4} class="w-full px-3 py-2 border rounded" />
            {#if errors.pubDate4}
              <p class="text-red-500 text-sm mt-1">{errors.pubDate4[0]}</p>
            {/if}
            <label for="pubDate5" class="block mb-2">Pub Date 5</label>
            <input type="date" id="pubDate5" bind:value={formData.pubDate5} class="w-full px-3 py-2 border rounded" />
            {#if errors.pubDate5}
              <p class="text-red-500 text-sm mt-1">{errors.pubDate5[0]}</p>
            {/if}
            <label for="pubDate6" class="block mb-2">Pub Date 6</label>
            <input type="date" id="pubDate6" bind:value={formData.pubDate6} class="w-full px-3 py-2 border rounded" />
            {#if errors.pubDate6}
              <p class="text-red-500 text-sm mt-1">{errors.pubDate6[0]}</p>
            {/if}
          </div>

          <!-- Quantities -->
          <div class="mb-4">
            <label for="qty1" class="block mb-2">Quantity 1</label>
            <input type="text" id="qty1" bind:value={formData.qty1} class="w-full px-3 py-2 border rounded" />
            {#if errors.qty1}
              <p class="text-red-500 text-sm mt-1">{errors.qty1[0]}</p>
            {/if}
            <label for="qty2" class="block mb-2">Quantity 2</label>
            <input type="text" id="qty2" bind:value={formData.qty2} class="w-full px-3 py-2 border rounded" />
            {#if errors.qty2}
              <p class="text-red-500 text-sm mt-1">{errors.qty2[0]}</p>
            {/if}
            <label for="qty3" class="block mb-2">Quantity 3</label>
            <input type="text" id="qty3" bind:value={formData.qty3} class="w-full px-3 py-2 border rounded" />
            {#if errors.qty3}
              <p class="text-red-500 text-sm mt-1">{errors.qty3[0]}</p>
            {/if}
            <label for="qty4" class="block mb-2">Quantity 4</label>
            <input type="text" id="qty4" bind:value={formData.qty4} class="w-full px-3 py-2 border rounded" />
            {#if errors.qty4}
              <p class="text-red-500 text-sm mt-1">{errors.qty4[0]}</p>
            {/if}
            <label for="qty5" class="block mb-2">Quantity 5</label>
            <input type="text" id="qty5" bind:value={formData.qty5} class="w-full px-3 py-2 border rounded" />
            {#if errors.qty5}
              <p class="text-red-500 text-sm mt-1">{errors.qty5[0]}</p>
            {/if}
            <label for="qty6" class="block mb-2">Quantity 6</label>
            <input type="text" id="qty6" bind:value={formData.qty6} class="w-full px-3 py-2 border rounded" />
            {#if errors.qty6}
              <p class="text-red-500 text-sm mt-1">{errors.qty6[0]}</p>
            {/if}
          </div>

          <div class="flex justify-end">
            <button type="button" on:click={handleClose} class="mr-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}