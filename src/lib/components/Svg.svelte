<script lang="ts">
	import { SvgIcon, SVGS } from '$lib/svg';

	export let icon: SvgIcon = SvgIcon.None;

	let [path, vb] = SVGS.get(icon) ?? [];
	let [vbw, vbh] = vb ?? [1, 1];

	$: {
		[path, vb] = SVGS.get(icon) ?? [];
		[vbw, vbh] = vb ?? [1, 1];
	}
</script>

<svg
	width={vbw}
	height={vbh}
	viewBox="0 0 {vbw} {vbh}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	{#each path ?? [] as d}
		<path fill-rule="evenodd" clip-rule="evenodd" {d} />
	{/each}
</svg>

<style>
	svg {
		max-width: var(--svg-size);
		min-width: var(--svg-size);
		max-height: var(--svg-size);
		min-height: var(--svg-size);
		align-content: center;
		pointer-events: none;
	}

	path {
		fill: var(--svg-fill);
	}

	svg:hover path {
		fill: var(--svg-hover-fill);
	}
</style>
