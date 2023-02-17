<script lang="ts">
	import './styles.scss';
	import Header from '$lib/components/Header.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="app">
	<Header border={data.route.id !== '/'} />

	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	main {
		position: relative;
		width: 100%;
		min-height: 100%;
		margin: 0 auto;
		display: flex;
	}

	@media (min-width: 0) {
		main {
			flex-direction: column;
			padding-top: 0;
			overflow-y: visible;
		}
	}

	@media (min-width: 50rem) {
		main {
			flex-direction: row;
			padding-top: var(--header-size);
			overflow: hidden;
		}
	}
</style>
