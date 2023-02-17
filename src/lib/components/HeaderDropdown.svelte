<script lang="ts">
	export let dropdownName = 'Dropdown';
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

<div
	class="dropdown-title"
	on:mouseenter={() => hoverTitle(true)}
	on:mouseleave={() => hoverTitle(false)}
>
	<p>
		{dropdownName}
	</p>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="dropdown-contents"
	class:open
	on:pointerenter={() => hoverContainer(true)}
	on:pointerleave={() => hoverContainer(false)}
	on:click={() => hoverContainer(false)}
>
	{#each options as [name, link]}
		<a href={link}>{name}</a>
	{/each}
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
		padding: 0.5rem 1rem;
		height: 100%;
		cursor: pointer;
		transition: all ease-in-out 100ms;
		display: grid;
		place-items: center;

		> p {
			color: var(--c-6);
		}
	}

	.dropdown-contents {
		width: 10rem;
		transition: all ease-in-out 100ms;

		position: fixed;
		top: 3.5rem;
		background-color: var(--c-3);
		border-radius: 0.25rem;

		margin-left: -2rem;

		display: flex;
		flex-direction: column;

		box-shadow: 0px 0rem 1rem #00000044;

		padding: 0.5rem 0;
		opacity: 0;

		> a {
			line-height: 1rem;
			padding: 0.5rem 1rem;
			height: auto;
		}
	}

	.dropdown-contents.open {
		opacity: 1;
	}
</style>
