<script>
  import { List, MusicPlayer } from "$lib";
  import "./Index-styles.css";
  import { onMount } from "svelte";

  let { data } = $props();
  const { titles, descriptions, mugshot, slugs, tracks } = data;

  // Globale volume state; die we vanuit de settings en de player kunnen gebruiken
  let volume = $state(30);

  // Laad de volume vanuit localStorage als deze bestaat
  onMount(() => {
    const savedVolume = localStorage.getItem("volume");
    if (savedVolume !== null) {
      volume = parseInt(savedVolume, 10);
    }
  });

  // Sla de volume op in localStorage wanneer deze verandert
  $effect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("volume", volume.toString());
    }
  });
</script>

<div class="heading">
  <h1>Little Alpine</h1>
</div>
<div class="lists">
  <List items={titles} {slugs} element="h2" />
  <!-- Bind omdat we de volume state willen delen tussen de settings en de player -->
  <List
    items={descriptions}
    links={slugs}
    {mugshot}
    {tracks}
    element="p"
    bind:volume
  />
</div>
<!-- Dus sturen we de volume mee -->
<MusicPlayer {tracks} {volume} />
