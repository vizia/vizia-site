<script lang="ts">
	import type { PageData } from './$types';
	import CodeRenderer from '$lib/components/renderers/CodeRenderer.svelte';
	import TableCellRenderer from '$lib/components/renderers/TableCellRenderer.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	export let data: PageData;
</script>

<div class="blog-post-wrapper">
	<div class="blog-post-info">
		<h1>
			{data.meta?.title}
		</h1>
		<p>
			{data.meta?.date}
		</p>
	</div>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img class="post-img" src={data.meta?.landing_image} alt="An image that reflects the blog post" />
	<div class="blog-post">
		<SvelteMarkdown
			source={data.markdown}
			renderers={{ code: CodeRenderer, tablecell: TableCellRenderer }}
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
	}

	.blog-post-info {
		position: absolute;
		width: 100%;
		margin-top: 8rem;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h1 {
			width: 100%;
			font-size: 2.5rem;
			font-weight: 600;
			text-align: center;
		}

		p {
			width: 100%;
			color: #888;
			font-size: 1.2rem;
			text-align: center;
		}
	}

	.post-img {
		position: absolute;
		width: 100%;
		padding: 0 calc(var(--sidebar-width) * 2 / 3);
		margin-top: 16rem;
	}

	.blog-post {
		position: relative;
		width: calc(100% - 2 * var(--sidebar-width));
		margin: 0 var(--sidebar-width);
		margin-top: 40rem;
		padding: 4rem;
		background-color: #1d1d1d;
		z-index: 1;
	}
</style>
