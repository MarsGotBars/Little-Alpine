<script>
  import { onMount } from "svelte";

  let { items, mugshot, slugs, links, element } = $props();

  // Track selection per item, only set default for non-navigation components
  let selectedIndex = $state(slugs ? null : 2);

  // Initialize selection after mount
  onMount(() => {
    if (slugs) {
      const currentHash = window.location.hash;
      if (currentHash) {
        const target = currentHash.slice(1);
        // Check for hardcoded items first
        if (target === "tracks") {
          selectedIndex = 0;
        } else if (target === "settings") {
          selectedIndex = 1;
        } else {
          // Check in the dynamic slugs array
          const hashIndex = slugs.indexOf(target);
          if (hashIndex !== -1) {
            selectedIndex = hashIndex + 2; // Offset by 2 for the hardcoded items
          }
        }
      } else {
        const nameIndex = items.indexOf("Name");
        selectedIndex = nameIndex !== -1 ? nameIndex + 2 : 2; // Default to first dynamic item
      }
    }
  });

  // Listen for hash changes
  $effect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (slugs && currentHash) {
        const target = currentHash.slice(1);
        // Check for hardcoded items first
        if (target === "tracks") {
          selectedIndex = 0;
        } else if (target === "settings") {
          selectedIndex = 1;
        } else {
          // Check in the dynamic slugs array
          const hashIndex = slugs.indexOf(target);
          if (hashIndex !== -1) {
            selectedIndex = hashIndex + 2; // Offset by 2 for the hardcoded items
          }
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  });

  function handleClick(index) {
    selectedIndex = index;
    console.log(`Selected index: ${selectedIndex}`);
  }
</script>

<ul>
  {#if !links}
    <li class="info-link" data-selected={selectedIndex === 0}>
      <a href="#tracks" onclick={() => handleClick(0)}>
        <h2>Tracks</h2>
      </a>
    </li>
    <li class="info-link" data-selected={selectedIndex === 1}>
      <a href="#settings" onclick={() => handleClick(1)}>
        <h2>Settings</h2>
      </a>
    </li>
  {:else}
    <li class="info" id="tracks">
      <svelte:element this={element}>Will place track stuff here</svelte:element>
    </li>
    <li class="info" id="settings">
      <svelte:element this={element}>Will place settings here</svelte:element>
    </li>
  {/if}
  {#each items as item, index}
    {@const adjustedIndex = index + 2}
    <li
      data-selected={links ? undefined : selectedIndex === adjustedIndex}
      class={links ? "info" : "info-link"}
      id={links && links[index]}
    >
      {#if item === "mugshot"}
        <img
          src={`https://fdnd.directus.app/assets/${mugshot.id}?quality=80&width=800`}
          srcset={`
            https://fdnd.directus.app/assets/${mugshot.id}?quality=60&width=400 400w,
            https://fdnd.directus.app/assets/${mugshot.id}?quality=70&width=600 600w,
            https://fdnd.directus.app/assets/${mugshot.id}?quality=80&width=800 800w,
            https://fdnd.directus.app/assets/${mugshot.id}?quality=85&width=1200 1200w,
            https://fdnd.directus.app/assets/${mugshot.id}?quality=90&width=1600 1600w
          `}
          sizes="(max-width: 480px) 400px, (max-width: 768px) 600px, (max-width: 1024px) 800px, (max-width: 1440px) 1200px, 1600px"
          width="800"
          height="533"
          alt="Profile mugshot"
        />
      {:else if slugs}
        <a href="#{slugs[index]}" onclick={() => handleClick(adjustedIndex)}>
          <svelte:element this={element}>{item}</svelte:element>
        </a>
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
    font-size: 1.75rem;
    width: 600px;
    max-width: 600px;
    align-items: flex-start;
  }

  ul:nth-of-type(2) {
    max-width: unset;
    align-items: center;
    width: 100%;
    grid-column: span 2;
  }

  li.info-link {
    background: var(--color-text-primary);
    color: var(--color-background);
  }

  li.info-link a {
    padding: 0.625rem;
    width: 100%;
    text-align: center;
  }

  li {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      width 0.2s var(--easing--extreme-in),
      font-size 0.2s var(--easing--extreme-out);
  }

  /* moeilijk deel... */
  li.info-link {
    width: clamp(94px, 10vw + 4rem, 400px);
    font-size: var(--font-size-sm);
  }

  li.info-link:hover {
    width: clamp(94px, 10vw + 5rem, 400px);
  }

  li.info-link[data-selected="true"] {
    width: clamp(94px, 30vw + 2rem, 600px);
    font-size: var(--font-size-lg);
  }

  /* Style the item immediately before the selected one (using reverse logic) */
  li.info-link:has(+ li.info-link[data-selected="true"]),
  li.info-link[data-selected="true"] + li.info-link {
    width: clamp(94px, 20vw + 3rem, 500px);
    font-size: var(--font-size-md);
  }

  /* Style the item immediately before the selected one (using reverse logic) */
  li.info-link:has(+ li.info-link[data-selected="true"]):hover,
  li.info-link[data-selected="true"] + li.info-link:hover {
    width: clamp(94px, 20vw + 4rem, 500px);
    font-size: var(--font-size-md);
  }

  li.info {
    list-style: none;
    background: var(--color-text-primary);
    color: var(--color-background);
    text-align: center;
    max-width: 420px;
    display: none;
    color: var(--color-text-primary);
    height: 100%;
  }

  .info:target {
    background: var(--color-background);
    display: inline-flex;
  }

  li img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
