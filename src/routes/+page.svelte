<script>
  import List from "$lib/components/List/List.svelte";
  import "./Index-styles.css";
  let { data } = $props();
  const { titles, descriptions, mugshot, slugs } = data;
</script>

<main>
  <div class="heading">
    <h1>Little Alpine</h1>
  </div>
  <div class="lists">
    <List items={titles} {slugs} element="h2" />
    <List items={descriptions} links={slugs} {mugshot} element="p" />
  </div>
</main>