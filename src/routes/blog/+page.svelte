<script lang="ts">
	import BlogPost from '$lib/components/BlogPost.svelte';
	import type { Post } from '$lib/types';
	import { onMount } from 'svelte';

	let posts: Post[];

	onMount(async () => {
		const data = await fetch('/get-blogs', {
			method: 'GET'
		});
		let json = await data.json();
		posts = json as Post[];
	});
</script>

<div class="blogs">
	<h1>Blogs</h1>
	{#if posts}
		<BlogPost post={posts[0]} />
		<div class="blogs-grid" style="--items: {posts.length}">
			{#each posts.splice(1) as post}
				<BlogPost {post} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.blogs {
		width: 100%;
		padding: 4rem var(--sidebar-width);
		display: flex;
		flex-direction: column;
		gap: 2rem;

		h1 {
			font-weight: 600;
		}
	}

	.blogs-grid {
		display: grid;
		height: fit-content;

		grid-template-rows: repeat(calc((var(--items) - 1) / 2), 1fr);
		grid-template-columns: 1fr 1fr;

		grid-gap: 1rem;
	}
</style>
