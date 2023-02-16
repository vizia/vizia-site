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
