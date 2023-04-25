<script lang="ts">
	export let dropdownName = 'Dropdown';
	export let options: [string, string][] = [
		['Option 1', '/'],
		['Option 2', '/']
	];

	let open = false;
	let hoveringTitle = false;
	let hoveringContainer = false;

	function enterHoverTitle() {
		hoveringTitle = true;
		open = true;
	}

	function exitHoverTitle() {
		hoveringTitle = false;

		setTimeout(() => {
			if (!hoveringContainer) {
				open = false;
			}
		}, 1000)
	}

	function enterHoverContainer() {
		hoveringContainer = true;
	}

	function exitHoverContainer() {
		hoveringContainer = false;
		open = false;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="dropdown-title"
	on:mouseenter={() => enterHoverTitle()}
	on:mouseleave={() => exitHoverTitle()}
	on:click={() => (open = !open)}
>
	<p>
		{dropdownName}
	</p>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="dropdown-contents"
	class:open
	on:pointerenter={() => enterHoverContainer()}
	on:pointerleave={() => exitHoverContainer()}
	on:click={() => (open = false)}
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

		& > p {
			color: var(--c-6);
		}

		&:hover {
			& > p {
				color: var(--accent);
			}
		}
	}

	.dropdown-contents {
		user-select: none;
		pointer-events: none;
		width: 10rem;
		transition: all ease-in-out 100ms;

		position: fixed;
		top: 3.5rem;
		background-color: var(--c-2);
		border: 1px solid var(--c-0);
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
		pointer-events: all;
		opacity: 1;
	}
</style>
