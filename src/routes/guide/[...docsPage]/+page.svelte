<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import type { PageData } from './$types';
	import CodeRenderer from '$lib/components/renderers/CodeRenderer.svelte';
	import TableCellRenderer from '$lib/components/renderers/TableCellRenderer.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import ImageRenderer from '$lib/components/renderers/ImageRenderer.svelte';
	import LinkRenderer from '$lib/components/renderers/LinkRenderer.svelte';
	import Svg from '$lib/components/Svg.svelte';
	import { SvgIcon } from '$lib/svg';
	import TableOfContents from '$lib/components/GuideTableOfContents.svelte';
	import { afterNavigate } from '$app/navigation';

	export let data: PageData;

	let loaded = false;

	let hash = '';
	let content: Element;
	let headings: NodeListOf<Element>;
	let positions: number[];
	let height: number;

	$: matchDocPage = `guide/${data.docsPage}`;

	let tocOpen = false;

	onMount(async () => {
		await document.fonts.ready;
		update();
		highlight();
		tocOpen = false;
	});

	afterNavigate(async () => {
		update();
		highlight();
		tocOpen = false;
	});

	function update() {
		let content_ = document.querySelector('.page-content');
		if (content_) {
			content = content_;

			let headings_ = content?.querySelectorAll('h1[id]');
			headings = headings_;
			const top = content.getBoundingClientRect().top;
			positions = Array.from(headings).map((heading) => {
				const style = getComputedStyle(heading);
				return heading.getBoundingClientRect().top - parseFloat(style.scrollMarginTop) - top;
			});
			height = window.innerHeight - 64;
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
<div class="doc-page">
	<TableOfContents open={tocOpen} {matchDocPage} items={data.items} />

	<div class="table-of-contents-menu">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="svg-button"
			on:click={() => {
				tocOpen = true;
			}}
		>
			<Svg icon={SvgIcon.HamburgerMenu} />
			<p>Contents</p>
		</div>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#">Return to Top</a>
	</div>

	<div class="on-this-page">
		{#if loaded}
			<ol>
				{#each headings as heading}
					<li class:active={`#${heading.id}` === hash}>
						<Svg icon={`#${heading.id}` === hash ? SvgIcon.Selector : SvgIcon.None} />
						<a href={`#${heading.id}`}>
							{get_text(heading.id)}
						</a>
					</li>
				{/each}
			</ol>
		{/if}
	</div>

	<div class="page-content">
		{#if data.markdownMeta}
			<h1 class="title" id={data.markdownMeta.title.toLowerCase()}>
				{data.markdownMeta.title}
			</h1>
		{/if}
		<SvelteMarkdown
			source={data.markdown}
			renderers={{
				code: CodeRenderer,
				tablecell: TableCellRenderer,
				image: ImageRenderer,
				link: LinkRenderer
			}}
		/>
	</div>
</div>

<style lang="scss">
	.doc-page {
		display: flex;
		flex-direction: row;
	}

	.title {
		margin-bottom: 3rem;

		font-size: 2.5rem;
		font-weight: 600;
	}

	.page-content {
		display: flex;
		flex-direction: column;

		padding: 2rem;

		gap: 1rem;
		align-items: center;

		overflow-x: hidden;
		overflow-y: auto;
	}

	.on-this-page {
		position: fixed;
		height: calc(100% - var(--header-size));

		padding: 2rem 8rem;
		padding-left: 0.5rem;

		overflow-x: hidden;
		overflow-y: auto;

		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		width: calc((100% - var(--page-width)) / 2 + var(--sidebar-width));

		ol {
			gap: 0.5rem;

			li {
				--svg-size: 1.5rem;
				--svg-fill: var(--c-5);
				--svg-hover-fill: var(--c-5);

				display: flex;
				flex-direction: row;

				a {
					color: var(--c-4);
					width: 100%;
					height: 100%;
					line-height: 120%;
				}

				&.active {
					--svg-fill: var(--accent);
					--svg-hover-fill: var(--accent);

					a {
						color: var(--c-6);
					}
				}
			}
		}
	}

	.table-of-contents-menu {
		top: 0;
		width: 100%;
		position: sticky;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 2rem;
		border-bottom: 1px solid var(--border-color);
		background-color: var(--c-1);
		z-index: 10;

		.svg-button {
			width: 1.5rem;
			height: 1.5rem;
			--svg-size: 1.5rem;
			--svg-fill: var(--c-5);
			--svg-hover-fill: var(--c-6);
			display: flex;
			flex-direction: row;
			gap: 0.2rem;
			border-radius: 0.25rem;
			cursor: pointer;
			pointer-events: all;

			* {
				pointer-events: none;
			}

			&:hover {
				--svg-fill: var(--c-6);
				p {
					color: var(--c-6);
				}
			}
		}
	}

	@media (min-width: 0) {
		.on-this-page {
			display: none;
		}

		.page-content {
			margin-left: 0;
		}
	}

	@media (min-width: 50rem) {
		.table-of-contents-menu {
			display: none;
		}

		.page-content {
			margin-left: var(--sidebar-width);
		}
	}

	@media (min-width: 85rem) {
		.on-this-page {
			display: flex;
			width: var(--sidebar-width);
			margin-left: calc(var(--sidebar-width) + 100vw - var(--sidebar-width) * 2);
			padding-right: 2rem;
		}

		.page-content {
			margin-left: var(--sidebar-width);
			width: calc(100vw - var(--sidebar-width) * 2);
		}
	}

	@media (min-width: 100rem) {
		.on-this-page {
			margin-left: calc(
				(100vw - var(--page-width)) / 2 + var(--sidebar-width) + var(--page-width) -
					var(--sidebar-width) * 2
			);
		}

		.page-content {
			margin-left: calc((100vw - var(--page-width)) / 2 + var(--sidebar-width));
			width: calc(var(--page-width) - var(--sidebar-width) * 2);
		}
	}
</style>
