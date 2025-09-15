<script>
  import { onMount } from "svelte";

  let { tracks, bars } = $props();

  let currentTrack = 0;
  let audioCtx;
  let analyser;
  let dataArray;

  let audioArray = []

  onMount(() => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();

    let fftSize = nextPowerOf2(bars * 2);
    analyser.fftSize = fftSize;
    

    dataArray = new Uint8Array(analyser.frequencyBinCount);
  });
  
  // Util
  function nextPowerOf2(x) {
    return 2 ** Math.ceil(Math.log2(x));
  }
</script>

<div class="track-info">
  <p>Current Track</p>
  <h2 class="track-title">trackname</h2>
  {#each tracks as track, index}
    <audio src={track} bind:this={audioArray[index]} controls></audio>
  {/each}
</div>
