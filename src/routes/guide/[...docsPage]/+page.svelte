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

	let tocOpen = false;

	onMount(async () => {
		await document.fonts.ready;
		update();
		highlight();
		processDropdownItems();
		tocOpen = false;
	});

	afterNavigate(() => {
		update();
		highlight();
		tocOpen = false;
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
		let rPath = /(.+?)\.md/.exec(step.markdownFile)?.[1];
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<nav class="table-of-contents" class:open={tocOpen}>
	<div class="table-of-contents-close" on:click={() => (tocOpen = false)}>
		<Svg icon={SvgIcon.Cross} />
	</div>
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

<svelte:window on:scroll={highlight} on:resize={update} />

<style lang="scss">
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

	.table-of-contents {
		border-right: 1px solid var(--border-color);

		flex-direction: column;
		gap: 0.25rem;
		pointer-events: all;

		.table-of-contents-close {
			width: 2rem;
			height: 2rem;
			--svg-size: 2rem;
			--svg-fill: var(--c-6);
			--svg-hover-fill: var(--c-6);
		}
	}

	@media (min-width: 0) {
		.on-this-page {
			display: none;
		}

		.table-of-contents {
			overflow-y: scroll;
			position: fixed;
			top: 0;

			height: 100vh;
			display: flex;
			// transform: translateX(-100%);
			width: 100%;
			padding: 2rem;
			padding-right: calc(100% - var(--sidebar-width));

			z-index: 100;
			background-color: #121212cc;
			backdrop-filter: blur(4px);

			transform: translateX(-100%);

			.table-of-contents-close {
				display: block;
			}

			&.open {
				transform: translateX(0%);
			}
		}

		.page-content {
			margin-left: 0;
		}
	}

	@media (min-width: 50rem) {
		.table-of-contents-menu {
			display: none;
		}

		.table-of-contents {
			position: fixed;
			display: flex;
			padding: 2rem;
			width: var(--sidebar-width);
			padding-right: 0.5rem;
			background-color: var(--c-2);
			height: calc(100% - var(--header-size));
			transform: translateX(0%);
			margin-top: var(--header-size);
			z-index: 0;

			.table-of-contents-close {
				display: none;
			}
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

		.table-of-contents {
			padding-left: calc((100% - var(--page-width)) / 2 + 2rem);
			width: calc((100% - var(--page-width)) / 2 + var(--sidebar-width));
			padding-right: 0.5rem;
		}

		.page-content {
			margin-left: calc((100vw - var(--page-width)) / 2 + var(--sidebar-width));
			width: calc(var(--page-width) - var(--sidebar-width) * 2);
		}
	}
</style>
