<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
		await document.fonts.ready;
	});
</script>

<div class="tutorials">
	<h1>Tutorials</h1>
	{#if data.tutorials}
		{#each data.tutorials as tutorial}
			<Card {tutorial} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.tutorials {
		width: 100%;
		padding: 4rem var(--sidebar-width);
		display: flex;
		flex-direction: column;
		gap: 2rem;

		h1 {
			font-weight: 600;
		}
	}
</style>
