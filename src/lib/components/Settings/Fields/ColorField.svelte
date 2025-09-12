<script>
  import { browser } from "$app/environment";
  
  // Check local storage en anders gebruiken we de default
  let uiColorValue = $state(
    browser && localStorage.getItem("uiColorValue")
      ? parseInt(localStorage.getItem("uiColorValue"))
      : 100
  );

  // Tekst
  let currentColor = $state("white");

  // map slider (0-100) naar hue (0-300)
  let hslColor = $derived(`hsl(${(uiColorValue / 100) * 300}, 100%, 64%)`);
  
  // Functie om de huidige kleur te bepalen, hue > 95 is wit
  function getCurrentColor(value) {
    if (value >= 95) {
      return "white";
    }
    
    // Map 0-94 naar HSL hue (0-300)
    const hue = (value / 95) * 300;
    
    // Kleuren mapping: [maxHue, colorName]
    const colorRanges = [
      [15, "red"],
      [45, "orange"], 
      [75, "yellow"],
      [135, "green"],
      [180, "cyan"],
      [225, "blue"],
      [270, "indigo"],
      [285, "violet"],
      [300, "pink"]
    ];
    
    // vind de eerste range waar de hue kleiner is dan maxHue
    return colorRanges.find(([maxHue]) => hue < maxHue)?.[1] || "red";
  }

  // Update currentColor en sla deze op in localStorage wanneer uiColorValue verandert
  $effect(() => {
    currentColor = getCurrentColor(uiColorValue);
    localStorage.setItem("uiColorValue", uiColorValue.toString());
    // Update CSS custom property direct in de body
    let color;
    if (uiColorValue >= 95) {
      // transitie naar wit
      const transitionProgress = (uiColorValue - 95) / 5;
      
      const startHue = (95 / 100) * 300;
      const targetHue = 320;
      const targetSaturation = 20;
      const targetLightness = 95;
      
      const hue = Math.round(startHue + (targetHue - startHue) * transitionProgress);
      const saturation = Math.round(100 + (targetSaturation - 100) * transitionProgress);
      const lightness = Math.round(64 + (targetLightness - 64) * transitionProgress);
      
      color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    } else {
      color = hslColor;
    }
    document.body.style.setProperty("--color-text-primary", color);
  });
</script>

<label class="setting-box">
  <span>UI Color</span>
  <p>{currentColor}</p>
  <div>
    <input
      type="range"
      name="uiColor"
      id="uiColor"
      min="0"
      max="100"
      bind:value={uiColorValue}
    />
  </div>
</label>
