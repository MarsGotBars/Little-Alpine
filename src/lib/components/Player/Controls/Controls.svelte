<script>
  import { Pause, Play, Forward } from "$lib";
  let { tracks, selectedTrack } = $props();

  function handlePrevious() {
    if (selectedTrack?.index !== null && selectedTrack?.index !== undefined) {
      const newIndex =
        selectedTrack.index <= 0
          ? tracks.path.length - 1
          : selectedTrack.index - 1;
      selectedTrack.index = newIndex;
    }
  }

  function handleNext() {
    if (selectedTrack?.index !== null && selectedTrack?.index !== undefined) {
      const newIndex =
        selectedTrack.index >= tracks.path.length - 1
          ? 0
          : selectedTrack.index + 1;
      selectedTrack.index = newIndex;
    }
  }

  function handlePlayPause() {
    if (selectedTrack?.index !== null && selectedTrack?.index !== undefined) {
      selectedTrack.isPlaying = !selectedTrack.isPlaying;
    }
  }
</script>

<div class="controls" style="--index: 8">
  <button
    class="ff-btn"
    onclick={handlePrevious}
    disabled={!selectedTrack ||
      selectedTrack.index === null ||
      selectedTrack.index === undefined}>
      <Forward />
    </button
  >
  <button
    class={selectedTrack?.isPlaying ? 'pause-btn' : 'play-btn'}
    onclick={handlePlayPause}
    disabled={!selectedTrack ||
      selectedTrack.index === null ||
      selectedTrack.index === undefined}
    aria-label={selectedTrack?.isPlaying ? "Pause" : "Play"}
  >
    {#if selectedTrack?.isPlaying}
      <Pause />
    {:else}
      <Play />
    {/if}
  </button>
  <button
    class="ff-btn"
    onclick={handleNext}
    disabled={!selectedTrack ||
      selectedTrack.index === null ||
      selectedTrack.index === undefined}>
      <Forward />
    </button
  >
</div>
