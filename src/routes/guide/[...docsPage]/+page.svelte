<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import CodeRenderer from '$lib/components/renderers/CodeRenderer.svelte';
	import TableCellRenderer from '$lib/components/renderers/TableCellRenderer.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { afterNavigate } from '$app/navigation';

	export let data: PageData;

	let loaded = false;

	let hash = '';
	let content: Element;
	let headings: NodeListOf<Element>;
	let positions: number[];
	let height: number;

	onMount(async () => {
		await document.fonts.ready;
		update();
		highlight();
	});

	afterNavigate(() => {
		update();
		highlight();
	});

	function update() {
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
	}

	function highlight() {
		const { top, bottom } = content.getBoundingClientRect();
		let i = headings.length;
		while (i--) {
			if (bottom - height < 50 || positions[i] + top < 100) {
				const heading = headings[i];
				hash = `#${heading.id}`;
				return;
			}
		}
		hash = '';
	}

	function get_text(name: string): string {
		let entity = document.querySelector('#' + name);
		if (entity) {
			return entity.textContent ? entity.textContent : '';
		}
		return '';
	}
</script>

<svelte:window on:scroll={highlight} on:resize={update} />

<div class="on-this-page">
	{#if loaded}
		<h2>On This Page</h2>
		<ol>
			{#each headings as heading}
				<li>
					<a href={`#${heading.id}`} class:active={`#${heading.id}` === hash}>
						{get_text(heading.id)}
					</a>
				</li>
			{/each}
		</ol>
	{/if}
</div>

<div class="docs-content">
	<SvelteMarkdown
		source={data.markdown}
		renderers={{ code: CodeRenderer, tablecell: TableCellRenderer }}
	/>
</div>

<style lang="scss">
	.on-this-page {
		position: fixed;
		width: var(--sidebar-width);
		margin-left: calc(100% - var(--sidebar-width));
		height: 100%;
		padding-left: 2rem;
		padding-top: 4rem;

		h2 {
			font-size: 1rem;
			font-weight: 600;
			text-transform: uppercase;
			color: #aaa;
			letter-spacing: 0.1em;
		}
	}
</style>
