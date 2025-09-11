<script>
  let { items, media, element } = $props();
  let selected = $state(false);
  console.log("List component - element prop:", items);

  console.log("List component - media prop:", media);
  function handleClick() {
    selected = !selected;
    onclick?.(selected);
  }
</script>

<ul>
  {#each items as item}
    <li class="data" data-selected={selected}>
      {#if item === "mugshot" && media}
        <img
          src={`https://fdnd.directus.app/assets/${media.id}?quality=80&width=800`}
          srcset={`
            https://fdnd.directus.app/assets/${media.id}?quality=60&width=400 400w,
            https://fdnd.directus.app/assets/${media.id}?quality=70&width=600 600w,
            https://fdnd.directus.app/assets/${media.id}?quality=80&width=800 800w,
            https://fdnd.directus.app/assets/${media.id}?quality=85&width=1200 1200w,
            https://fdnd.directus.app/assets/${media.id}?quality=90&width=1600 1600w
          `}
          sizes="(max-width: 480px) 400px, (max-width: 768px) 600px, (max-width: 1024px) 800px, (max-width: 1440px) 1200px, 1600px"
          width="800"
          height="533"
          alt="Profile mugshot"
        />
      {:else}
        <svelte:element this={element}>{item}</svelte:element>
      {/if}
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
    font-size: 1.75rem;
    max-height: calc((1em + 4rem) * 3);
    max-width: 420px;
    align-items: center;
  }

  li.data {
    list-style: none;
    background: var(--color-text-primary);
    color: var(--color-background);
    text-align: center;
    padding: 1rem;
    cursor: pointer;
    transition:
      opacity 0.3s ease,
      background 0.3s ease,
      color 0.3s ease;
    border: 2px solid var(--color-text-primary);
    font-size: 1.75rem;
    width: 80%;
  }

  .data[data-selected="true"] {
    background: var(--color-background);
    color: var(--color-text-primary);
  }
</style>
