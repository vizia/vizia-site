<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import type { PageData } from './$types';
	import CodeRenderer from '$lib/components/renderers/CodeRenderer.svelte';
	import TableCellRenderer from '$lib/components/renderers/TableCellRenderer.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { afterNavigate } from '$app/navigation';
	import ImageRenderer from '$lib/components/renderers/ImageRenderer.svelte';
	import LinkRenderer from '$lib/components/renderers/LinkRenderer.svelte';
	import type { DropdownItem, Item, Tutorial } from '$lib/types';
	import Svg from '$lib/components/Svg.svelte';
	import { SvgIcon } from '$lib/svg';
	import Card from '$lib/components/Card.svelte';
	import { base } from '$app/paths';

	export let data: PageData;

	let loaded = false;

	let hash = '';
	let content: Element;
	let headings: NodeListOf<Element>;
	let positions: number[];
	let height: number;

	let tocOpen = false;

	console.log({ data });

	onMount(async () => {
		await document.fonts.ready;
		update();
		highlight();
		tocOpen = false;
	});

	afterNavigate(() => {
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<nav class="sidebar" class:open={tocOpen}>
	<div class="sidebar-close" on:click={() => (tocOpen = false)}>
		<Svg icon={SvgIcon.Cross} />
	</div>

	<h1>Tutorials</h1>
	<p>A collection of interactive guides made for you.</p>

	{#if loaded}
		<ol>
			{#each headings as heading}
				<li class:active={`#${heading.id}` === hash}>
					<!-- <Svg icon={`#${heading.id}` === hash ? SvgIcon.Selector : SvgIcon.None} /> -->
					<a href="#{heading.id}">
						{get_text(heading.id)}
					</a>
				</li>
			{/each}
		</ol>
	{/if}
</nav>


<div class="page-content">
	<div class="info-mobile">
		<h1>Tutorials</h1>
		<p>A collection of interactive guides made for you.</p>
	</div>
	{#each data.tutorials as tutorial}
		<Card
			title={tutorial.title}
			desc={tutorial.description}
			id={tutorial.dir}
			link="tutorials/{tutorial.dir}"
			style="--backgroundColor: #5157EF;"
		/>
	{/each}

	<Card title="Tutorial 0" desc="tutorial description" id="tutorial0" link="" />
	<Card title="Tutorial 1" desc="tutorial description" id="tutorial1" link="" />
	<Card title="Tutorial 2" desc="tutorial description" id="tutorial2" link="" />
	<Card title="Tutorial 3" desc="tutorial description" id="tutorial3" link="" />
	<Card title="Tutorial 4" desc="tutorial description" id="tutorial4" link="" />
	<Card title="Tutorial 5" desc="tutorial description" id="tutorial5" link="" />
	<Card title="Tutorial 6" desc="tutorial description" id="tutorial6" link="" />
	<Card title="Tutorial 7" desc="tutorial description" id="tutorial7" link="" />
	<Card title="Tutorial 8" desc="tutorial description" id="tutorial8" link="" />
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

	.sidebar-menu {
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

	.sidebar, .info-mobile {
		h1 {
			font-size: 2rem;
			font-weight: bold;
		}

		p {
			color: var(--c-5);
		}
	}

	.sidebar {
		border-right: 1px solid var(--border-color);

		flex-direction: column;
		gap: 0.5rem;
		pointer-events: all;

		.sidebar-close {
			width: 2rem;
			height: 2rem;
			--svg-size: 2rem;
			--svg-fill: var(--c-6);
			--svg-hover-fill: var(--c-6);
		}

		ol {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;

			li {
				display: block;
				margin-left: 0;

				* {
					color: var(--c-6);
				}

				&.active {
					* {
						color: var(--accent);
					}
				}
			}
		}
	}

	@media (min-width: 0) {
		.sidebar {
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

			.sidebar-close {
				display: block;
			}

			&.open {
				transform: translateX(0%);
			}
		}

		.page-content {
			margin-left: 0;
			width: 100%;
		}
	}

	@media (min-width: 55rem) {
		.info-mobile {
			display: none;
		}

		.sidebar {
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

			.sidebar-close {
				display: none;
			}
		}

		.page-content {
			margin-left: var(--sidebar-width);
		}
	}

	@media (min-width: 85rem) {
		.page-content {
			margin-left: var(--sidebar-width);
			width: calc(100vw - var(--sidebar-width));
		}
	}

	@media (min-width: 100rem) {
		.sidebar {
			padding-left: calc((100% - var(--page-width)) / 2 + 2rem);
			width: calc((100% - var(--page-width)) / 2 + var(--sidebar-width));
			padding-right: 0.5rem;
		}

		.page-content {
			margin-left: calc((100vw - var(--page-width)) / 2 + var(--sidebar-width));
			width: calc(var(--page-width) - var(--sidebar-width));
		}
	}
</style>
