<script lang="ts">
	import '$lib/styles.scss';
	import Header from '$lib/components/Header.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	main {
		position: relative;
		height: 100%;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 0) {
		main {
			margin-top: 0;
			overflow-y: visible;
		}
	}

	@media (min-width: 50rem) {
		main {
			margin-top: var(--header-size);
			overflow: hidden;
		}
	}
</style>
