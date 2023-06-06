<script lang="ts">
	import { base } from '$app/paths';
	import ViziaLogoWhite from '$lib/assets/vizia_logo_white.svg';

	export let decorations: 'none' = 'none';
	export let id = '';
	export let link = '';
	export let title = 'Card title';
	export let desc = 'Description here';
	export let img = '';
	export let date: string | null = null;
	export let invertInfo = false;
	export let imgLayout: 'side' | 'bottom' = 'side';
	export let style = '';
</script>

<a class="card img{imgLayout}" href={link} {style}>
	<div class="info" class:invert={invertInfo}>
		<h1 {id}>{title}</h1>
		<p>{desc}</p>
	</div>
	<!-- <div class="wrapper">
		<p class="chip {tutorial.type}">{tutorial.type}</p>
		<p>by {tutorial.author}</p>
	</div> -->
	<div class="sub">
		{#if img === ''}
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src={ViziaLogoWhite} class="default-img" />
		{/if}

		<slot />
	</div>
</a>

<style lang="scss">
	.card {
		--backgroundColor: var(--c-0);
		--textColor: #fff;

		position: relative;
		border-radius: 0.5rem;
		padding: 2rem;
		background: var(--backgroundColor);
		box-sizing: border-box;
		border: 0.125rem solid;
		border-color: transparent;
		transition: all 0.25s ease-in-out;

		.info {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			h1 {
				scroll-margin-top: 8rem;
			}
			* {
				color: var(--textColor);
			}
		}

		.sub {
			display: block;
			border-radius: 0.5rem;
			padding: 0.125rem;
			box-sizing: content-box;
			overflow: hidden;
		}

		&:hover {
			border-color: white;
		}

		&.imgside {
			.info {
				width: calc(100% - 12rem);
			}

			.sub {
				position: absolute;
				width: 100%;
				height: 100%;
				left: -0.125rem;
				top: -0.125rem;
			}

			.default-img {
				opacity: 0.1;
				margin-left: 100%;
				transform: translate(-100%, 0);
			}
		}

		&.imgside:hover {
			.default-img {
				opacity: 0.5;
			}
		}

		&.imgbottom {
			.info {
				width: 100%;
			}

			.sub {
				margin-top: 1rem;
				display: grid;
				place-items: center;
			}
		}
	}

	.default-img {
		width: 12rem;
		transition: all 0.25s ease-in-out;
		padding-top: 0;

		* {
			fill: #fff;
			color: #fff;
		}
	}
</style>
