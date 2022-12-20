<script lang="ts">
	import BgElement from '$lib/BGElement.svelte';
	import LandingPageButton from '$lib/LandingPageButton.svelte';
	import LandingPageDemo from '$lib/LandingPageDemo.svelte';
</script>

<!-- Landing Page -->
<div class="bgs">
	<BgElement color="#ef5151" offset_x={1} offset_y={0} type="circle" />
	<BgElement color="#ef5151" offset_x={0} offset_y={1} type="circle" rotation={90} />
	<BgElement color="#efcc51" offset_x={0} offset_y={0} rotation={-90} />
	<BgElement color="#efcc51" offset_x={1} offset_y={-1} rotation={180} />
	<BgElement color="#ef5151" offset_x={0} offset_y={-1} rotation={90} />
	<BgElement color="#ef5151" offset_x={0} offset_y={-3} rotation={-90} />

	<BgElement color="#51afef" side="right" offset_x={0} offset_y={2} type="circle" rotation={180} />
	<BgElement color="#efcc51" side="right" offset_x={-1} offset_y={0} type="circle" rotation={-90} />
	<BgElement color="#51afef" side="right" offset_x={0} offset_y={0} />
	<BgElement color="#efcc51" side="right" offset_x={0} offset_y={0} size={16} rotation={90} />
	<div class="blur" />
</div>
<div class="overlay">
	<div class="landing-main">
		<h1>
			Declarative <b>GUI Framework</b>
			for <b>any</b> kind of applications.
		</h1>
		<h2>Combine versatility, modularity and speed in one</h2>

		<div class="actions-container">
			<LandingPageButton text="Get Started" link="/" style="gradient" />
			<LandingPageButton text="Tutorial" link="/tutorial" />
		</div>
	</div>
	<LandingPageDemo />
</div>

<style lang="scss">
	.blur {
		pointer-events: none;
		width: 100%;
		height: 100%;

		mask: linear-gradient(transparent, black 50%);

		backdrop-filter: blur(8px);
	}
	.bgs {
		position: relative;
		width: 100%;
		height: 120rem;

		overflow-x: hidden;
		overflow-y: auto;

		&:before {
			content: '';
			height: 100%;
			width: 100%;
			left: 0px;
			top: 0px;
			position: absolute;
			background-image: radial-gradient(
					30% 1000% at calc(50% - 40rem) 40rem,
					hsl(0deg 83% 63%) 0%,
					hsla(352deg, 75%, 61%, 0.88) 11%,
					hsla(344deg, 67%, 59%, 0.77) 22%,
					hsla(335deg, 58%, 57%, 0.66) 33%,
					hsla(323deg, 50%, 54%, 0.55) 44%,
					hsla(308deg, 42%, 51%, 0.44) 56%,
					hsla(289deg, 44%, 52%, 0.33) 67%,
					hsla(272deg, 55%, 56%, 0.22) 78%,
					hsla(257deg, 68%, 59%, 0.11) 89%,
					hsla(241deg, 83%, 63%, 0) 100%
				),
				radial-gradient(
					30% 1000% at calc(50% + 40rem) 40rem,
					hsl(204deg 83% 63%) 0%,
					hsla(208deg, 83%, 63%, 0.88) 11%,
					hsla(213deg, 83%, 64%, 0.77) 22%,
					hsla(217deg, 83%, 64%, 0.66) 33%,
					hsla(221deg, 83%, 64%, 0.55) 44%,
					hsla(224deg, 83%, 64%, 0.44) 56%,
					hsla(228deg, 83%, 64%, 0.33) 67%,
					hsla(231deg, 83%, 64%, 0.22) 78%,
					hsla(235deg, 83%, 63%, 0.11) 89%,
					hsla(238deg, 83%, 63%, 0) 100%
				);
			transition: background-color 250ms ease;
			opacity: 0.5;
		}
	}

	.overlay {
		pointer-events: none;
		position: absolute;
		width: 100%;
		height: auto;
		top: 4rem;

		display: flex;
		flex-direction: column;
		align-items: center;

		.landing-main {
			width: 50rem;
			height: 40rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			gap: 3rem;

			h1,
			h2 {
				line-height: 1.33;
				text-align: center;
			}

			h1 {
				font-weight: 700;
			}

			h2 {
				font-weight: 400;
			}

			b {
				background: linear-gradient(to right, #51afef, #5451ef);
				color: transparent;
				background-clip: text;
				-webkit-background-clip: text;
			}

			.actions-container {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				gap: 1rem;
			}
		}
	}
</style>
