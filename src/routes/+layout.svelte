<script>
  import favicon from "$lib/assets/favicon.svg";
  import Linescan from "$lib/components/Filters/Linescan.svelte";
  import Frameshadow from "$lib/components/Filters/Frameshadow.svelte";

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
