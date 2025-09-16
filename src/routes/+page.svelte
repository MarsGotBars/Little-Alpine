<script>
  import { List, MusicPlayer } from "$lib";
  import "./Index-styles.css";
  import { onMount } from "svelte";

  let { data } = $props();
  const { titles, descriptions, mugshot, slugs, tracks } = data;

  
  // Globale volume state; die we vanuit de settings en de player kunnen gebruiken
  let volume = $state(30);
  
  // Pause on blur setting - default to true (enabled)
  let pauseOnBlur = $state(true);

  // Zet eerste track als default geselecteerde track
  let selectedTrack = $state({ index: 0, isPlaying: false });
  
  // State to track if music was playing before blur (for resume functionality)
  let wasPlayingBeforeBlur = $state(false);
  
  // Laad het volume en pauseOnBlur vanuit localStorage als deze bestaat
  onMount(() => {
    const savedVolume = localStorage.getItem("volume");
    if (savedVolume !== null) {
      volume = parseInt(savedVolume, 10);
    }
    
    const savedPauseOnBlur = localStorage.getItem("pauseOnBlur");
    if (savedPauseOnBlur !== null) {
      pauseOnBlur = JSON.parse(savedPauseOnBlur);
    }
  });

  // Sla het volume op in localStorage wanneer deze verandert
  $effect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("volume", volume.toString());
    }
  });

  // Sla pauseOnBlur op in localStorage wanneer deze verandert
  $effect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pauseOnBlur", JSON.stringify(pauseOnBlur));
    }
  });

  // Visibility change event listener voor pause on blur functionaliteit
  onMount(() => {
    function handleVisibilityChange() {
      if (pauseOnBlur) {
        if (document.hidden) {
          // Page became hidden (tab switched, window minimized, etc.)
          if (selectedTrack?.isPlaying) {
            wasPlayingBeforeBlur = true;
            selectedTrack.isPlaying = false;
          }
        } else {
          // Page became visible again
          if (wasPlayingBeforeBlur) {
            selectedTrack.isPlaying = true;
            wasPlayingBeforeBlur = false;
          }
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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
    bind:pauseOnBlur
    bind:selectedTrack
  />
</div>
<!-- Dus sturen we het volume mee -->
<MusicPlayer {tracks} {volume} bind:selectedTrack />
