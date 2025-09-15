<script>
  import {TrackInfo, Equalizer} from "$lib";
  import "./MusicPlayer-styles.css";
  const { tracks, volume } = $props();
  let customBars = 32;
  let bars = $state(customBars ?? 16);
  let frequencyData = $state([]);
</script>

<aside class="music-player">
  <TrackInfo {tracks} {bars} {volume} bind:frequencyData />
  <Equalizer {bars} {frequencyData} />
</aside>
