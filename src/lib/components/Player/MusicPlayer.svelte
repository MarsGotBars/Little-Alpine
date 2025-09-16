<script>
  import {TrackInfo, Equalizer} from "$lib";
  import "./MusicPlayer-styles.css";
  let { tracks, volume, selectedTrack = $bindable() } = $props();
  let customBars = 32;
  
  let bars = $state(customBars ?? 16);
  let frequencyData = $state([]);
</script>

<aside class="music-player">
  <TrackInfo {tracks} {bars} {volume} bind:selectedTrack bind:frequencyData />
  <Equalizer {bars} {frequencyData} />
</aside>
