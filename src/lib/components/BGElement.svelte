<script lang="ts">
	export let color = '#51afef';
	export let type: 'circle' | 'square' = 'square';
	export let rotation = 0;

	export let offset_x = 0;
	export let offset_y = 0;

	export let size_x = 1.0;
	export let size_y = 1.0;

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
   rotate: {rotation}deg; --size_x: {size_x}; --size_y: {size_y};"
/>

<style lang="scss">
	.bg-element {
		pointer-events: all;
		position: absolute;

		width: calc(var(--size_x) * var(--size));
		height: calc(var(--size_y) * var(--size));
		left: calc(var(--size) + var(--offset_x) * var(--size));
		top: calc(var(--size) - var(--offset_y) * var(--size) + var(--size));

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
