<script lang="ts">
	import TutorialPost from '$lib/components/TutorialPost.svelte';
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
		<div class="tutorials-grid" style="--items: {data.tutorials.length}">
			{#each data.tutorials as tutorial}
				<TutorialPost {tutorial} />
			{/each}
		</div>
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

	.tutorials-grid {
		display: grid;
		height: fit-content;

		grid-template-rows: repeat(calc((var(--items) - 1) / 2), 1fr);
		grid-template-columns: 1fr 1fr;

		grid-gap: 1rem;
	}
</style>
