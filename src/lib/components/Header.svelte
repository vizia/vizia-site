<script lang="ts">
	import GithubLogo from '$lib/assets/Github.svg';
	import DiscordLogo from '$lib/assets/Discord.svg';

	import HeaderDropdown from './HeaderDropdown.svelte';
	import { base } from '$app/paths';
</script>

<nav class="header" aria-label="Primary">
	<div class="wrapper">
		<a class="logo-wrapper" href="{base}/">
			<img src="{base}/vizia_logo.svg" class="logo" alt="Vizia Logo" />
		</a>

		<div class="links-wrapper">
			<a href="https://github.com/vizia/vizia" target="_blank" rel="noreferrer">
				<img src={GithubLogo} class="logo" alt="Github Logo" />
			</a>
			<a href="https://discord.gg/e3k9TZqrps" target="_blank" rel="noreferrer">
				<img src={DiscordLogo} class="logo" alt="Discord Logo" />
			</a>
		</div>

		<div class="nav-wrapper">
			<a href="{base}/tutorials">Tutorials</a>
			<HeaderDropdown
				dropdownName="Docs"
				options={[
					['Guide', `${base}/guide`],
					['Examples', `${base}/examples`]
					// ['API', '/api']
				]}
			/>
			<a href="{base}/blogs">Blogs</a>
			<a href="{base}/faq">FAQ</a>
			<a href="{base}/about">About</a>
		</div>
	</div>
</nav>

<style lang="scss">
	.header {
		width: 100%;
		height: var(--header-size);

		position: fixed;
		display: flex;
		justify-content: center;
		flex-direction: row;
		padding: 0 2rem;

		box-sizing: border-box;

		border-bottom: 1px solid var(--border-color);

		z-index: 100;

		.wrapper {
			width: 100%;
			height: var(--header-size);
			max-width: var(--page-width);
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}

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
