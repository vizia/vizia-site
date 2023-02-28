<script lang="ts">
	import { base } from '$app/paths';
	import { SvgIcon } from '$lib/svg';
	import type { DropdownItem } from '$lib/types';
	import Svg from './Svg.svelte';

	export let header = 'dropdown';
	export let link: string | null = null;
	export let items: DropdownItem[];
	export let level = 0;
	export let open = true;
	export let linkOnClick = false;
	export let indexStack: number[] = [];
	export let enumerate = false;

	export let onClick = (i: number[]) => {};
	export let matcher = (idx: number[], header: string, link: string | null) => false;

	$: active = matcher(indexStack, header, link);
</script>

<div class="dropdown-header {open ? 'open' : ''} {active ? 'active' : ''}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#if linkOnClick}
		<a href="{base}/{link}" class={items.length !== 0 ? 'compact' : ''}>{header}</a>
	{:else}
		<p
			class={items.length !== 0 ? 'compact' : ''}
			on:click={() => {
				onClick(indexStack);
			}}
		>
			{header}
		</p>
	{/if}
	{#if items.length !== 0}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="svg-button"
			on:click={() => {
				open = !open;
			}}
		>
			<Svg icon={open ? SvgIcon.ChevronDown : SvgIcon.ChevronRight} />
		</div>
	{:else}
		<Svg icon={active ? SvgIcon.Selector : SvgIcon.None} />
	{/if}
</div>

{#if open && items.length !== 0}
	<div class="dropdown">
		<div class="line" />
		<div class="dropdown-wrapper">
			{#each items as item, i}
				<svelte:self
					items={item.items}
					header={item.name}
					link={item.link}
					{enumerate}
					{linkOnClick}
					indexStack={[...indexStack, i + 1]}
					{onClick}
					{matcher}
					level={level + 1}
				/>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.dropdown {
		width: calc(100% - 0.5rem);
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		margin-left: 0.5rem;
		pointer-events: none;
	}

	.line {
		height: 100%;
		width: 2px;
		border-radius: 1px;
		background-color: var(--c-1);
		justify-self: stretch;
	}

	.dropdown-wrapper {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		pointer-events: none;
	}

	.dropdown-header {
		width: 100%;
		height: 1.5rem;

		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 0.25rem;
		pointer-events: none;

		--svg-size: 1.5rem;
		--svg-fill: var(--c-5);
		--svg-hover-fill: var(--c-6);

		* {
			cursor: pointer;
			pointer-events: all;
		}

		a,
		p {
			padding-left: 0.5rem;
			flex: 1;
			color: #aaa;
		}

		&.active {
			background-color: var(--c-1);

			--svg-fill: var(--accent);
			a,
			p {
				color: var(--c-6);
			}
		}
	}

	p {
		flex: 1;
		color: #aaa;
		user-select: none;
		padding: 0 0.5rem;
	}

	p:hover {
		color: #fff;
	}

	.svg-button {
		width: 1.5rem;
		height: 1.5rem;
		--svg-size: 1.5rem;
		border-radius: 0.25rem;

		--svg-hover-fill: var(--c-6);
	}

	.dropdown-header:hover {
		background-color: var(--c-1);
	}
</style>
