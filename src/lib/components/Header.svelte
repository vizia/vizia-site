<script lang="ts">
	import HeaderDropdown from './HeaderDropdown.svelte';
</script>

<nav class="header" aria-label="Primary">
	<a class="logo-wrapper" href="/">
		<img src="/vizia_logo.svg" class="logo" alt="Vite Logo" />
		<p>Vizia</p>
	</a>

	<div class="links-wrapper">
		<a href="https://github.com/vizia/vizia" target="_blank" rel="noreferrer">
			<img src="/Github.svg" class="logo" alt="Github Logo" />
		</a>
		<a href="https://discord.gg/e3k9TZqrps" target="_blank" rel="noreferrer">
			<img src="/Discord.svg" class="logo" alt="Discord Logo" />
		</a>
	</div>

	<div class="nav-wrapper">
		<a href="/tutorial">Tutorial</a>
		<HeaderDropdown
			dropdownName="Docs"
			options={[
				['Guide', '/guide'],
				['Examples', '/examples'],
				['API', '/api']
			]}
		/>
		<a href="/blog">Blog</a>
		<a href="/faq">FAQ</a>
		<a href="/about">About</a>
	</div>
</nav>

<style lang="scss">
	a {
		font-weight: 500;
		color: white;
		text-decoration: inherit;
		transition: all ease-in-out 100ms;
		padding: 0.5rem 1rem;

		&:hover {
			color: #51afef;
		}
	}

	.header {
		width: 100%;
		height: var(--header-size);

		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0px 8rem;
		gap: 0px;

		box-shadow: 0 0 1rem #00000044;

		background-color: #2a2a2a;
		box-sizing: border-box;

		z-index: 100;
	}

	.logo-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;

		padding: 0.5rem;

		> img {
			width: 1.5rem;
			height: 1.5rem;
		}

		> p {
			margin-top: 0.25rem;
			width: auto;
			color: white;
			vertical-align: bottom;
			font-weight: 600;
			display: flex;
			align-items: center;
		}
	}

	.links-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;

		> a {
			width: 1.5rem;
			height: 1.5rem;

			padding: 0rem;

			img {
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}

	.nav-wrapper {
		width: 22rem;
		height: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0;

		left: calc(50% - 11rem);

		position: absolute;
		align-self: center;
	}
</style>
