<script lang="ts">
	import { SvgIcon, svgs } from '$lib/svg';

	export let icon: SvgIcon = SvgIcon.None;

	let [path, vb] = svgs.get(icon) ?? [];
	let [vbw, vbh] = vb ?? [1, 1];

	$: {
		[path, vb] = svgs.get(icon) ?? [];
		[vbw, vbh] = vb ?? [1, 1];
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="svg">
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
</div>

<style>
	.svg {
		min-width: var(--svg-size);
		max-width: var(--svg-size);
		min-height: var(--svg-size);
		max-height: var(--svg-size);
		display: grid;
		place-items: center;
	}

	svg {
		align-content: center;
		pointer-events: none;
	}

	path {
		fill: var(--svg-fill);
	}

	.svg:hover path {
		fill: var(--svg-hover-fill);
	}
</style>
