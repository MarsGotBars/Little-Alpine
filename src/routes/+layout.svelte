<script>
	import favicon from '$lib/assets/favicon.svg';
	import Linescan from '$lib/components/filters/Linescan.svelte';
	import Frameshadow from '$lib/components/filters/Frameshadow.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- <Linescan /> -->
<!-- <Frameshadow /> -->

{@render children?.()}
