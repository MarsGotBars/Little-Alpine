<script>
  let { bars, frequencyData = [] } = $props();

  // Converteer frequentie data naar bar hoogte
  function getBarHeight(index) {
    if (!frequencyData || !frequencyData.length) return 0;
    
    const binCount = frequencyData.length;
    
    const usefulBins = Math.floor(binCount * 0.66);
    
    // Logarithmische mapping: eerste bars krijgen minder frequentie ruimte
    const normalizedIndex = index / (bars - 1);

    // Op een curve
    const logStart = Math.pow(normalizedIndex, 0.7);
    
    let startBin = Math.floor(logStart * usefulBins);
    let endBin;
    
    // Specifiek voor de laatste bar
    if (index === bars - 1) {
      endBin = usefulBins;
    } else {
      const logEnd = Math.pow((index + 1) / (bars - 1), 0.7);
      endBin = Math.floor(logEnd * usefulBins);
    }
    
    // Zorg ervoor dat elke bar ten minste 1 bin krijgt
    if (endBin <= startBin) {
      endBin = startBin + 1;
    }
    
    // Gemiddelde de frequentie data in deze range
    let sum = 0;
    let count = 0;
    for (let i = startBin; i < endBin; i++) {
      sum += frequencyData[i] || 0;
      count++;
    }
    const rawValue = count > 0 ? sum / count : 0;
    
    // Converteer naar percentage
    const percentage = Math.round((rawValue / 255) * 100);
    
    return percentage;
  }
</script>

<div class="equalizer">
  {#each { length: bars } as _, index}
    <div class="bar" id={index} style="--height: {getBarHeight(index)}%;"></div>
  {/each}
</div>
