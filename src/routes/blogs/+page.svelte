<script lang="ts">
	import BlogPost from '$lib/components/BlogPost.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
		await document.fonts.ready;
	});

	console.log({ data });
</script>

<div class="blogs">
	<h1>Blogs</h1>
	{#if data.posts}
		{#each data.posts as post}
			<BlogPost {post} />
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
