<script>
	import './styles.scss';
	import Header from '$lib/Header.svelte';
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
		flex: 1;
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 0 auto;
		margin-top: 4rem;
		box-sizing: border-box;
	}
</style>
