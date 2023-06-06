<script lang="ts">
	import { base } from '$app/paths';
	import type { ItemJSON } from '$lib/parser';
	import { SvgIcon } from '$lib/svg';
	import Dropdown from './Dropdown.svelte';
	import Svg from './Svg.svelte';

	export let open = false;
	export let matchDocPage = '';
	export let items: ItemJSON[] = [];
</script>

<nav class="table-of-contents" class:open>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="table-of-contents-close" on:click={() => (open = false)}>
		<Svg icon={SvgIcon.Cross} />
	</div>
	{#each items as item, i}
		<Dropdown
			{item}
			items={item.subItems ?? []}
			indexStack={[i + 1]}
			linkOnClick={true}
			matcher={(_i, _h, link) => {
				return link === `${base}/${matchDocPage}`;
			}}
		/>
	{/each}
</nav>

<style lang="scss">
	.table-of-contents {
		border-right: 1px solid var(--border-color);

		flex-direction: column;
		gap: 0.5rem;
		pointer-events: all;

		.table-of-contents-close {
			width: 2rem;
			height: 2rem;
			--svg-size: 2rem;
			--svg-fill: var(--c-6);
			--svg-hover-fill: var(--c-6);
		}

		.header {
			margin-top: 1rem;
			margin-left: 0.5rem;
			font-weight: 600;
			color: #fff;
			letter-spacing: 0.125rem;
			text-transform: uppercase;
		}
	}

	@media (min-width: 0) {
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
	}

	@media (min-width: 50rem) {
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
	}

	@media (min-width: 100rem) {
		.table-of-contents {
			padding-left: calc((100% - var(--page-width)) / 2 + 2rem);
			width: calc((100% - var(--page-width)) / 2 + var(--sidebar-width));
			padding-right: 0.5rem;
		}
	}
</style>
