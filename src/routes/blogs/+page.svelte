<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
		await document.fonts.ready;
	});
</script>

<div class="blogs">
	<h1>Blogs</h1>
	{#if data.posts}
		{#each data.posts as post}
			<Card title={post.title} link="blogs/{post.queryName}" desc={post.description} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.blogs {
		width: 100%;
		padding: 4rem var(--sidebar-width);
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h1 {
			font-weight: 600;
		}
	}
</style>
