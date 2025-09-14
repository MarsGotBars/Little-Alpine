<script>
  import ColorField from "./Fields/ColorField.svelte";
  import "./SettingsForm-styles.css";
  let volume = $state(30);
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
  <ColorField />
  <label>Autoplay <input type="checkbox" name="" id="" /></label>
</form>