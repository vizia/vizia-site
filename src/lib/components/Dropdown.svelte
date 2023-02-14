<script lang="ts">
	import { base } from '$app/paths';
	import ChevronDown from '$lib/assets/chevron_down.svg';
	import type { DropdownItem } from '$lib/types';

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

	let indexString = '';

	for (const idx of indexStack) {
		indexString += `${idx}.`;
	}

	const formattedHeader = `${indexString} ${header}`;
</script>

<div
	class="dropdown-header {open ? 'open' : ''} {matcher(indexStack, header, link) ? 'active' : ''}"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#if linkOnClick}
		<a href="{base}/{link}" class={items.length !== 0 ? 'compact' : ''}>{formattedHeader}</a>
	{:else}
		<p
			class={items.length !== 0 ? 'compact' : ''}
			on:click={() => {
				onClick(indexStack);
			}}
		>
			{formattedHeader}
		</p>
	{/if}
	{#if items.length !== 0}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<img
			src={ChevronDown}
			class="logo"
			alt="v"
			on:click={() => {
				open = !open;
			}}
		/>
	{/if}
</div>

{#if open && items.length !== 0}
	<div class="dropdown">
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
{/if}

<style lang="scss">
	.dropdown {
		width: auto;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-left: 0.8rem;
		pointer-events: none;
	}

	.dropdown-header {
		width: 100%;
		height: auto;

		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;
		border-radius: 0.25rem;
		pointer-events: none;

		* {
			cursor: pointer;
			pointer-events: all;
		}

		a,
		p {
			flex: 1;
			color: #aaa;
		}

		&.open {
			img {
				transform: rotate(0deg);
			}
		}

		&.active {
			a,
			p {
				color: var(--accent);
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

	img {
		transform: rotate(-90deg);
		padding: 0.5rem;
		border-radius: 0.25rem;
	}

	img:hover,
	.dropdown-header:hover {
		background-color: #ffffff22;
	}
</style>
