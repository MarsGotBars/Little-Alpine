<script>
  let { bars, frequencyData = [] } = $props();

  // Convert elke element in de array naar een percentage
  function getBarHeight(index) {
    if (!frequencyData || !frequencyData[index]) return 0;
    const rawValue = frequencyData[index];
    const percentage = Math.round((rawValue / 255) * 100);

    return percentage;
  }
</script>

<div class="equalizer">
  {#each { length: bars } as _, index}
    <div class="bar" id={index} style="--height: {getBarHeight(index)}%;"></div>
  {/each}
</div>
