<script>
  import { ColorField } from "$lib";
  import "./SettingsForm-styles.css";
  
  let { volume = $bindable() } = $props();
  
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
  <label>Autoplay <input type="checkbox" name="" id="" /></label>
</form>