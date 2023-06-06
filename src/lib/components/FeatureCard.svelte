<script lang="ts">
	import { base } from '$app/paths';

	export let img = '';
	export let header = '';
	export let content = '';
</script>

<div class="feature-card">
	<img src="{base}/imgs/features/{img}" alt="" />
	<h1>{header}</h1>
	<p>{content}</p>
</div>

<style lang="scss">
	.feature-card {
		width: fit-content;
		width: 240px;
		height: 350px;

		background-color: #282828;

		display: flex;
		flex-direction: column;

		padding: 1.5rem;
		gap: 1rem;

		border-radius: 1rem;

		h1 {
			font-size: 1rem;
			font-weight: normal;
			line-height: 19px;
		}

		p {
			font-size: 14px;
			line-height: 17px;
		}

		img {
			border-radius: 8px;
		}
	}
</style>
