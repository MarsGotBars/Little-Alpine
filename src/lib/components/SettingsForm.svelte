<script>
  import { browser } from "$app/environment";

  let volume = $state(30);

  // Check local storage en anders gebruiken we de default
  let uiColorValue = $state(
    browser && localStorage.getItem("uiColorValue")
      ? parseInt(localStorage.getItem("uiColorValue"))
      : 100
  );

  // Tekst
  let currentColor = $state("white");

  // Array met kleuren van het spectrum
  const colorOptions = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "pink",
    "white",
  ];

  // map slider (0-100) naar hue (0-300)
  let hslColor = $derived(`hsl(${(uiColorValue / 100) * 300}, 100%, 64%)`);
    // Correcte kleur uit de array instellen
    function getCurrentColor(value) {
        if (value > 99) {
            return "white"; // Show "white" text for the transition range
        }
        // Map 0-94 to the array (excluding "white")
        const index = Math.floor((value / 95) * (colorOptions.length - 2));
        return colorOptions[Math.min(index, colorOptions.length - 2)];
    }

  // Update currentColor en sla deze op in localStorage wanneer uiColorValue verandert
  $effect(() => {
    currentColor = getCurrentColor(uiColorValue);
    if (browser) {
      localStorage.setItem("uiColorValue", uiColorValue.toString());
      // Update CSS custom property direct in de body
      let color;
      if (uiColorValue >= 95) {
        // transitie van wit naar roze tot 95%
        const transitionProgress = (uiColorValue - 95) / 5; // 0 to 1
        const violetHue = 300;
        const saturation = Math.round(100 * (1 - transitionProgress));
        const lightness = Math.round(64 + (91 - 64) * transitionProgress);
        color = `hsl(${violetHue}, ${saturation}%, ${lightness}%)`;
      } else {
        color = hslColor;
      }
      console.log("Setting color to:", color);
      document.body.style.setProperty("--color-text-primary", color);
    }
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
