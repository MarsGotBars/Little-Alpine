<script>
    let { bars } = $props();
</script>

<div class="equalizer">
    {#each {length: bars}, index}
        <div class="bar" id={index}>

        </div>
    {/each}
</div>