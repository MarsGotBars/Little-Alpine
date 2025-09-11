<script>
  import List from "$lib/components/List/List.svelte";
  let { data } = $props();
  const { titles, descriptions, mugshot, slugs } = data;
</script>

<main>
  <div class="heading">
    <h1>Little Alpine</h1>
  </div>
  <div class="lists">
    <List items={titles} {slugs} element="h2" />
    <List items={descriptions} links={slugs} {mugshot} element="p" />
  </div>
</main>

<style>
  .heading {
    /* Zetten we om de delay te bepalen op de h1 */
    --duration: 2s;
    opacity: 0;
    animation: fade--slide-in var(--duration) var(--easing--extreme-out)
      forwards;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-250%, -50%);
    z-index: 100;
  }

  h1 {
    opacity: 1;
    transform: translate(0, 0);
    /* We willen een delay van 50% van de duration */
    animation: fade--slide-out var(--duration) calc(var(--duration) * 0.4)
      var(--easing--extreme-in) forwards;
  }

  main {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    overflow: clip;
    height: 100%;
    width: 100%;
    justify-content: space-between;
  }

  .lists {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    height: fit-content;
    width: 100%;
    justify-content: space-between;
  }

  /* Animations */

  @keyframes fade--slide-in {
    5% {
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes fade--slide-out {
    85% {
      opacity: 0;
    }
    to {
      opacity: 0;
      transform: translate(250%, 0);
    }
  }
</style>
