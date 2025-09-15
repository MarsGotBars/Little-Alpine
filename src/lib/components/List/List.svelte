<script>
  import { onMount } from "svelte";
  import SettingsForm from "../Settings/SettingsForm.svelte";

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
  }
</script>

<ul style={!links ? undefined : "--child-count: 6;"}>
  {#if !links}
    <li
      class="info-link"
      data-selected={selectedIndex === 0}
      style="--index: 0;"
    >
      <a href="#tracks" onclick={() => handleClick(0)}>
        <h2>Tracks</h2>
      </a>
    </li>
    <li
      class="info-link"
      data-selected={selectedIndex === 1}
      style="--index: 1;"
    >
      <a href="#settings" onclick={() => handleClick(1)}>
        <h2>Settings</h2>
      </a>
    </li>
  {:else}
    <li class="info" id="tracks" style="--child-count: 6;">
      <svelte:element this={element}>Will place track stuff here</svelte:element
      >
    </li>
    <li class="info" id="settings" style="--child-count: 6;">
      <SettingsForm />
    </li>
  {/if}
  {#each items as item, index}
    {@const adjustedIndex = index + 2}
    <li
      data-selected={links ? undefined : selectedIndex === adjustedIndex}
      class={links ? "info" : "info-link"}
      id={links && links[index]}
      style="--index: {adjustedIndex};"
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
        <svelte:element this={element} class="xl-text">{item}</svelte:element>
      {/if}
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    gap: 0.625rem;
    font-size: 1.75rem;
    width: 100%;
    align-items: flex-start;
    overflow-x: auto;
    grid-column: 1 / -1;
  }

  ul:nth-of-type(2) {
    max-width: unset;
    align-items: center;
    justify-content: start;
    width: 100%;
    opacity: 0;
    animation: fade--slide-in 0.5s
      calc(var(--loading-timer) + (0.15s * var(--child-count)))
      var(--easing--extreme-out) forwards;
  }

  /* loading animation */

  ul:nth-of-type(1) > li {
    opacity: 0;
    transform: translateX(-100%);
    animation: fade--slide-in 0.5s
      calc(var(--loading-timer) + (0.15s * var(--index)))
      var(--easing--extreme-out) forwards;
  }

  li.info-link a {
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
    justify-content: start;
    transition:
      width 0.2s var(--easing--extreme-in),
      font-size 0.2s var(--easing--extreme-out),
      opacity 0.2s var(--easing--extreme-in);
  }

  ul:nth-of-type(2) li:nth-of-type(2) {
    align-self: end;
  }

  li.info-link {
    width: clamp(5.875rem, 10vw + 4rem, 25rem);
    font-size: var(--font-size-sm);
  }

  li.info-link:is(:hover, :focus-within) {
    width: clamp(5.875rem, 10vw + 5rem, 25rem);
  }
  a {
    isolation: isolate;
  }
  a:focus-visible {
    outline: 2px solid var(--color-text-primary);
    outline-offset: -3px;
    box-shadow: 0 0 0 3px var(--color-background); /* adds a contrasting buffer */
  }

  li.info-link[data-selected="true"] {
    width: clamp(5.875rem, 30vw + 2rem, 37.5rem);
    font-size: var(--font-size-lg);
  }

  li.info-link:has(+ li.info-link[data-selected="true"]),
  li.info-link[data-selected="true"] + li.info-link {
    width: clamp(5.875rem, 20vw + 3rem, 31.25rem);
    font-size: var(--font-size-md);
  }

  li.info-link:has(+ li.info-link[data-selected="true"]):is(
      :hover,
      :focus-within
    ),
  li.info-link[data-selected="true"] + li.info-link:is(:hover, :focus-within) {
    width: clamp(5.875rem, 20vw + 4rem, 31.25rem);
    font-size: var(--font-size-md);
  }

  li.info {
    list-style: none;
    background: var(--color-text-primary);
    color: var(--color-background);
    text-align: center;
    max-width: 26.25rem;
    width: 100%;
    display: none;
    color: var(--color-text-primary);
    height: 100%;
    opacity: 0;
  }

  :global(
      main:has(li:nth-of-type(3)[data-selected="true"]) li.info:nth-of-type(3)
    ),
  .info:target {
    background: var(--color-background);
    display: inline-flex;
    animation: fade--slide-in 0.5s 0.15s var(--easing--extreme-out) forwards;
  }

  li img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media (min-width: 56.25rem) {
    ul {
      overflow: unset;
      max-width: 37.5rem;
      width: fit-content;
      flex-direction: column;
    }

    ul:nth-of-type(1) {
      grid-column: 1;
    }
    ul:nth-of-type(2) {
      justify-content: unset;
      grid-column: span 2;
    }

    li{
      justify-content: center;
    }
  }

  @keyframes fade--slide-in {
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
