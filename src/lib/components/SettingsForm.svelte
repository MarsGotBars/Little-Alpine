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

<form action="">
  <label class="setting-box">
    <span>Volume</span>
    <div>
      <input
        type="range"
        name="volume"
        id="volume"
        min="0"
        max="100"
        value="30"
      />
    </div>
  </label>
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
  <label>Autoplay <input type="checkbox" name="" id="" /></label>
</form>

<style>
  form {
    gap: 0.625rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-self: start;
  }

  label.setting-box {
    width: 400px;
    display: flex;
    flex-direction: column;
    border: 5px solid var(--color-text-primary);
  }

  .setting-box span {
    font-size: var(--font-size-sm);
    background: var(--color-text-primary);
    color: var(--color-background);
    padding: 0.625rem;
    width: 100%;
    text-align: center;
  }

  .setting-box p {
    padding: 1.25rem;
    padding-bottom: 0.625rem;
  }
  .setting-box div {
    padding: 1.25rem;
    padding-top: 0.625rem;
  }

  .setting-box input {
    width: 100%;
  }

  /* Range input styling */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 5px;
    background: var(--color-text-primary);
    border-radius: 0;
    outline: none;
  }

  /* Webkit browsers (Chrome, Safari, Edge) */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 25px;
    background: var(--color-text-primary);
    border-radius: 0;
    cursor: pointer;
    border: none;
  }

  /* Firefox */
  input[type="range"]::-moz-range-thumb {
    width: 15px;
    height: 25px;
    background: var(--color-text-primary);
    border-radius: 0;
    cursor: pointer;
    border: none;
  }

  input[type="range"]::-moz-range-track {
    height: 5px;
    background: var(--color-text-primary);
    border-radius: 0;
    border: none;
  }
</style>
