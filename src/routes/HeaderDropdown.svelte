<script lang="ts">
	export let dropdownName = 'Dropdown';
	export let header_link = '/';
	export let options: [string, string][] = [
		['Option 1', '/'],
		['Option 2', '/']
	];

	$: open = false;
	let hoveringTitle = false;
	let hoveringContainer = false;

	function hoverTitle(bool: boolean) {
		hoveringTitle = bool;
		updateOpen();
	}

	function hoverContainer(bool: boolean) {
		hoveringContainer = bool;
		updateOpen();
	}

	function updateOpen() {
		open = hoveringTitle || hoveringContainer;
	}
</script>

<div class="dropdown">
	<a
		class="dropdown-title"
		on:mouseenter={() => hoverTitle(true)}
		on:mouseleave={() => hoverTitle(false)}
		href={header_link}
	>
		<p>{dropdownName}</p>
	</a>
	{#if open}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="dropdown-contents"
			on:pointerenter={() => hoverContainer(true)}
			on:pointerleave={() => hoverContainer(false)}
			on:click={() => hoverContainer(false)}
		>
			{#each options as [name, link]}
				<a href={link}>{name}</a>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	a {
		font-weight: 500;
		color: white;
		text-decoration: inherit;
		transition: all ease-in-out 100ms;

		&:hover {
			background-color: #51afef22;
			color: #51afef;
		}
	}

	.dropdown-title {
		cursor: pointer;

		p {
			padding: 1rem 1rem;
			width: auto;
			height: 24px;
			overflow: visible;
		}

		&:hover {
			p {
				color: #51afef;
			}
		}
	}

	.dropdown-contents {
		width: 10rem;

		position: fixed;
		top: 3.5rem;
		background-color: #282828;
		border-radius: 0.25rem;

		display: flex;
		flex-direction: column;

		box-shadow: 0px 0.25rem 0.25rem black;

		padding: 0.5rem 0;

		> a {
			line-height: 1rem;
			padding: 0.5rem 1rem;
			height: auto;
		}
	}
</style>
