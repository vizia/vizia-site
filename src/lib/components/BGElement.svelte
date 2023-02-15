<script lang="ts">
	const size = 6;

	export let color = '#51afef';
	export let type: 'circle' | 'square' = 'square';
	export let rotation = 0;

	export let offset_x = 0;
	export let offset_y = 0;

	export let size_x = size;
	export let size_y = size;

	$: hovered = (offset_x + offset_y) % 2 == 0;

	function abs(n: number) {
		if (n < 0) {
			return n * -1;
		}
		return n;
	}

	const intervalTime = abs(offset_y) * 200 + abs(offset_x) * 1500 + 2000;

	setInterval(() => {
		hovered = !hovered;
	}, intervalTime);
</script>

<div
	class="bg-element {type} {hovered ? 'hover' : ''}"
	style="--color: {color}; --offset_x: {offset_x}; --offset_y: {offset_y};
   rotate: {rotation}deg; --size_x: {size_x}rem; --size_y: {size_y}rem;"
/>

<style lang="scss">
	.bg-element {
		--size: 6rem;

		pointer-events: all;
		position: absolute;

		width: var(--size_x);
		height: var(--size_y);
		left: calc(-50% + var(--size) / 2 + var(--offset_x) * var(--size) + 4 * var(--size));
		top: calc(var(--size) + 10rem - var(--offset_y) * var(--size));

		background: linear-gradient(
			to left,
			rgba(84, 81, 239, 0) 0%,
			var(--color) 50%,
			var(--color) 100%
		);
		background-position: 100% 100%;
		background-size: 200% 200%;
		transition: background-position 250ms ease;

		transition: all ease-in-out 1s;
		opacity: 20%;

		&.hover {
			background-position: 0% 0%;
			opacity: 100%;
		}

		&::after {
			content: '';
			width: 100%;
			height: 100%;
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

			transition: all ease-in-out 1s;

			filter: blur(128px);

			background-blend-mode: luminosity;
		}

		&.circle::after {
			border-radius: calc(var(--size) / 2);
		}
	}

	.circle {
		border-radius: calc(var(--size) / 2);
	}
</style>
