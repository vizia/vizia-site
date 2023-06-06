<script lang="ts">
	import type { ItemJSON } from '$lib/parser';
	import { SvgIcon } from '$lib/svg';
	import Svg from './Svg.svelte';

	export let item: ItemJSON;
	export let items: ItemJSON[];
	export let level = 0;
	export let open = false;
	export let linkOnClick = false;
	export let indexStack: number[] = [];
	export let enumerate = false;

	const link = item.filePath.replace('.md', '').replace('docs/', '');

	export let onClick = (i: number[]) => {};
	export let matcher = (idx: number[], header: string, link: string) => false;

	$: active = matcher(indexStack, item.headerName, link);
</script>

<div class="dropdown-header {open ? 'open' : ''} {active ? 'active' : ''}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#if linkOnClick}
		<a href={link} class={items.length !== 0 ? 'compact' : ''}>{item.headerName}</a>
	{:else}
		<p
			class={items.length !== 0 ? 'compact' : ''}
			on:click={() => {
				onClick(indexStack);
			}}
		>
			{item.headerName}
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
					{item}
					items={item.subItems}
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
