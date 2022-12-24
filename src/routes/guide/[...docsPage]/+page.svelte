<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import CodeRenderer from '$lib/renderers/CodeRenderer.svelte';
	import TableCellRenderer from '$lib/renderers/TableCellRenderer.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	export let data: PageData;

	let loaded = false;

	let content: Element;
	let headings: NodeListOf<Element>;
	let positions: number[];
	let height: number;

	onMount(async () => {
		await document.fonts.ready;

		let content_ = document.querySelector('.docs-content');
		if (content_) {
			content = content_;

			let headings_ = content?.querySelectorAll('h1[id]');
			headings = headings_;
			const top = content.getBoundingClientRect().top;
			positions = Array.from(headings).map((heading) => {
				const style = getComputedStyle(heading);
				return heading.getBoundingClientRect().top - parseFloat(style.scrollMarginTop) - top;
			});
			height = window.innerHeight - 64; /* bottom banner height */
		}

		loaded = true;
	});
</script>

<div class="docs-content">
	<SvelteMarkdown
		source={data.markdown}
		renderers={{ code: CodeRenderer, tablecell: TableCellRenderer }}
	/>
</div>

<div class="on-this-page">
	{#if loaded}
		<ul>
			{#each headings as heading}
				<li>
					<a href={`#${heading.id}`}>
						{heading.id}
					</a>
				</li>
			{/each}
		</ul>
		{#each positions as position}
			<p>{position}</p>
		{/each}
		<p>{height}</p>
	{/if}
</div>

<style lang="scss">
	.docs-content {
		position: relative;
	}

	.on-this-page {
		position: fixed;
		width: 20rem;
		margin-left: calc(100% - 20rem);
		height: 100%;
		padding-left: 2rem;
		padding-top: 4rem;
	}
</style>
