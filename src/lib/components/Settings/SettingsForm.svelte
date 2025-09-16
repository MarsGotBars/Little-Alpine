<script>
  import { ColorField } from "$lib";
  import "./SettingsForm-styles.css";

  let { volume = $bindable(), pauseOnBlur = $bindable() } = $props();
</script>

<form action="">
  <label class="setting-box">
    <span>Volume</span>
    <p>{volume}%</p>
    <div>
      <input
        type="range"
        name="volume"
        id="volume"
        min="0"
        max="100"
        bind:value={volume}
      />
    </div>
  </label>
  <ColorField />
  <label for="pauseOnBlur">
    Pause on loss of focus
    <div class="custom-checkbox"></div>
  </label>
  <input
    type="checkbox"
    name="pauseOnBlur"
    id="pauseOnBlur"
    bind:checked={pauseOnBlur}
  />
</form>
