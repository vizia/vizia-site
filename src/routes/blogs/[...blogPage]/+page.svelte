<script lang="ts">
	import type { PageData } from './$types';
	import CodeRenderer from '$lib/components/renderers/CodeRenderer.svelte';
	import TableCellRenderer from '$lib/components/renderers/TableCellRenderer.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { onMount } from 'svelte';
	import LinkRenderer from '$lib/components/renderers/LinkRenderer.svelte';
	import { base } from '$app/paths';

	export let data: PageData;

	onMount(async () => {
		await document.fonts.ready;
	});
</script>

<div class="blog-post-wrapper">
	<div class="blog-post-info">
		<h1>
			{data.blogPost.title}
		</h1>
		<p>
			{data.blogPost.date}
		</p>

		<h2>
			{data.blogPost.author}
		</h2>
	</div>

	<!-- svelte-ignore a11y-missing-attribute -->
	<img class="post-img" src="{base}/imgs/{data.blogPost.image}" />
	<div class="blog-post">
		<SvelteMarkdown
			source={data.markdown}
			renderers={{ code: CodeRenderer, tablecell: TableCellRenderer, link: LinkRenderer }}
		/>
	</div>
</div>

<style lang="scss">
	.blog-post-wrapper {
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
		position: relative;
		display: block;
	}

	.blog-post-info {
		position: relative;
		left: 50%;
		border-radius: 0.5rem;
		transform: translate(-50%, 0);
		margin: 2rem 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h1,
		h2 {
			width: 100%;
			font-size: 2.5rem;
			font-weight: 600;
			text-align: center;
		}

		h2 {
			font-size: 1.5rem;
		}

		p {
			width: 100%;
			color: #ffffff88;
			font-size: 1.2rem;
			text-align: center;
		}
	}

	.post-img {
		position: relative;
		width: calc(100% - 2 * var(--sidebar-width));
		margin: 0 var(--sidebar-width);
		box-shadow: 0 0 1rem #00000044;
	}

	.blog-post {
		position: relative;
		width: calc(100% - 2 * var(--sidebar-width));
		margin: 0 var(--sidebar-width);
		padding: 4rem;
		background-color: #222;
		z-index: 1;
		box-shadow: 0 0 1rem #00000044;
	}
</style>
