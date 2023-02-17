<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import type { PageData } from './$types';
	import CodeRenderer from '$lib/components/renderers/CodeRenderer.svelte';
	import TableCellRenderer from '$lib/components/renderers/TableCellRenderer.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { afterNavigate } from '$app/navigation';
	import ImageRenderer from '$lib/components/renderers/ImageRenderer.svelte';
	import LinkRenderer from '$lib/components/renderers/LinkRenderer.svelte';
	import type { DropdownItem, Item } from '$lib/types';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Svg from '$lib/components/Svg.svelte';
	import { SvgIcon } from '$lib/svg';

	export let data: PageData;

	let loaded = false;

	let hash = '';
	let content: Element;
	let headings: NodeListOf<Element>;
	let positions: number[];
	let height: number;

	let dropdownItems: DropdownItem[] = [];

	$: matchDocPage = `guide/${data.docsPage}`;

	onMount(async () => {
		await document.fonts.ready;
		update();
		highlight();
		processDropdownItems();
	});

	afterNavigate(() => {
		update();
		highlight();
	});

	$: {
		processDropdownItems();
	}

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

	function processDropdownItems() {
		dropdownItems = [];

		for (const step of data.items) {
			dropdownItems.push(processDropdownItem(step));
		}
	}

	function processDropdownItem(step: Item): DropdownItem {
		let rPath = /(.+?)\.md/.exec(step.markdownFileName)?.[1];
		let item: DropdownItem = {
			name: step.title,
			items: [],
			link: `guide/${rPath}`
		};

		if (step.items) {
			for (const subStep of step.items) {
				item.items.push(processDropdownItem(subStep));
			}
		}

		return item;
	}
</script>

<nav class="table-of-contents">
	{#each dropdownItems as item, i}
		<Dropdown
			items={item.items}
			header={item.name}
			link={item.link}
			indexStack={[i + 1]}
			linkOnClick={true}
			matcher={(_i, _h, link) => {
				return link === matchDocPage;
			}}
		/>
	{/each}
</nav>

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

<svelte:window on:scroll={highlight} on:resize={update} />

<style lang="scss">
	.title {
		margin-bottom: 3rem;

		font-size: 2.5rem;
		font-weight: 600;
	}

	.on-this-page {
		position: fixed;
		width: var(--sidebar-width);
		height: 100%;

		padding-left: 4rem;
		padding-top: 4rem;

		left: calc(100% - var(--sidebar-width));

		background-color: var(--c-1);

		ol {
			gap: 0.25rem;

			li {
				--svg-size: 1.5rem;
				--svg-fill: var(--c-5);
				--svg-hover-fill: var(--c-5);

				display: flex;
				flex-direction: row;

				a {
					width: 100%;
					height: 100%;
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

	.table-of-contents {
		position: fixed;
		width: var(--sidebar-width);
		height: calc(100% - var(--header-size));

		padding: 2rem 8rem;
		padding-right: 0.5rem;

		background-color: var(--c-2);
		border-right: 1px solid var(--border-color);

		overflow-x: hidden;
		overflow-y: auto;

		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	@media (min-width: 0) {
		.on-this-page {
			display: none;
		}
	}

	@media (min-width: 90rem) {
		.on-this-page {
			display: block;
		}
	}
</style>
