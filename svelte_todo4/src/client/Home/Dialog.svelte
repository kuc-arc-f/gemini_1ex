<script lang="ts">
  import {
    autoUpdate,
    computePosition,
    flip,
    offset,
    shift,
    type ComputePositionConfig,
    type VirtualElement,
  } from "@floating-ui/dom";

  export let virtualReference: VirtualElement;
  export let position: ComputePositionConfig["placement"] = "bottom-start";
  export let open: boolean = false;

  let content: HTMLElement;

  $: if (content) {
    if (open) {
      computePosition(virtualReference, content, {
        placement: position,
        middleware: [offset(10), flip(), shift()],
      }).then(({ x, y }) => {
        Object.assign(content.style, {
          top: `${y}px`,
          left: `${x}px`,
        });
      });
    }

    return autoUpdate(virtualReference, content, () => {
      computePosition(virtualReference, content, {
        placement: position,
        middleware: [offset(10), flip(), shift()],
      }).then(({ x, y }) => {
        Object.assign(content.style, {
          top: `${y}px`,
          left: `${x}px`,
        });
      });
    });
  }
</script>

{#if open}
  <div
    bind:this={content}
    class="fixed z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-300"
  >
    <slot />
  </div>
{/if}