<script>
  import TrackInfo from "./TrackInfo/TrackInfo.svelte";
  import Equalizer from "./Equalizer/Equalizer.svelte";
  import "./MusicPlayer-styles.css";
  const { tracks } = $props();
  let customBars = null;

  let bars = $state(customBars ?? 16)
</script>

<aside class="music-player">
  <TrackInfo {tracks} {bars} />
  <Equalizer {bars}/>
</aside>
