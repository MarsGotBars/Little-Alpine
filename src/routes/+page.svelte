<script>
  import List from "$lib/components/List/List.svelte";
  let { data } = $props();
  console.log("Full data object:", data);
  const { titles, descriptions, mugshot } = data;
  console.log("titles:", titles);
  console.log("descriptions:", descriptions);
  console.log("mugshot:", mugshot);
  console.log("Passing to List - mugshot:", mugshot);
</script>

<div class="heading">
  <h1>Little Alpine</h1>
</div>

<main>
  <List items={titles} element="h2" />
  <List items={descriptions} element="p" media={mugshot} />
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
    animation: fade--slide-out var(--duration) calc(var(--duration) * .4)
      var(--easing--extreme-in) forwards;
  }

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
