<script>
  import List from "$lib/components/List/List.svelte";
  import MusicPlayer from "$lib/components/Player/MusicPlayer.svelte";
  import "./Index-styles.css";
  let { data } = $props();
  const { titles, descriptions, mugshot, slugs, tracks } = data;
  // console.log(allAudio);
  
</script>

<div class="heading">
  <h1>Little Alpine</h1>
</div>
<div class="lists">
  <List items={titles} {slugs} element="h2" />
  <List items={descriptions} links={slugs} {mugshot} element="p" />
  <!-- <audio src={} controls></audio> -->
</div>
<MusicPlayer {tracks} />
