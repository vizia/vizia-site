<script>
	import './styles.scss';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		position: relative;
		margin: 0 auto;
		padding-top: 4rem;
		display: flex;
		flex-direction: row;
		width: 100%;
		overflow: hidden;
		background-color: #1d1d1d;
		min-height: 100vh;
	}
</style>
