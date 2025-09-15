<script>
  import { favicon, Linescan, Frameshadow } from "$lib";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<!-- <Linescan /> -->
<!-- <Frameshadow /> -->

<main>
  {@render children?.()}
</main>
