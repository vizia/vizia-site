<script lang="ts">
	export let size = 8;
	export let color = '#51afef';
	export let side: 'left' | 'right' = 'left';
	export let type: 'circle' | 'square' = 'square';
	export let rotation = 0;

	export let offset_x = 0;
	export let offset_y = 0;

	$: hovered = (offset_x + offset_y) % 2 == 0;

	function abs(n: number) {
		if (n < 0) {
			return n * -1;
		}
		return n;
	}

	const intervalTime = abs(offset_y) * 500 + abs(offset_x) * 7500 + 1000;

	setInterval(() => {
		hovered = !hovered;
	}, intervalTime);
</script>

<div
	class="bg-element {type} {side} {hovered ? 'hover' : ''}"
	style="--color: {color}; --size: {size}rem; --offset_x: {offset_x * 8}rem; --offset_y: {offset_y *
		8}rem;
   rotate: {rotation}deg; "
/>

<style lang="scss">
	.bg-element {
		pointer-events: all;
		position: absolute;

		width: var(--size);
		height: var(--size);
		left: calc(50% - var(--size) / 2 + var(--offset_x) + 30%);
		top: calc(var(--size) + 10rem - var(--offset_y));

		transition: all ease-in-out 1s;

		&.left {
			left: calc(50% - var(--size) / 2 + var(--offset_x) - 30%);
		}

		&:before {
			content: '';
			height: 100%;
			width: 100%;
			left: 0px;
			top: 0px;
			position: absolute;
			background: linear-gradient(
				to left,
				rgba(84, 81, 239, 0) 0%,
				var(--color) 50%,
				var(--color) 100%
			);
			background-position: 100% 100%;
			background-size: 200% 200%;
			transition: background-position 250ms ease;
			opacity: 50%;
		}

		&.hover:before {
			background-position: 0% 0%;
			opacity: 100%;
		}
	}

	.circle:before {
		border-radius: 50%;
	}
</style>
