<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let query = "";

  function handleSearch() {
    dispatch("search", query);
  }
</script>

<div class="mb-4">
  <input
    type="text"
    bind:value={query}
    placeholder="Search todos..."
    class="w-full px-3 py-2 border rounded-md"
  />
  <button on:click={handleSearch} class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
    Search
  </button>
</div>