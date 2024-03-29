<script lang="ts">
	import GithubLogo from '$lib/assets/Github.svg';
	import DiscordLogo from '$lib/assets/Discord.svg';
	import HamburgerMenu from '$lib/assets/HamburgerMenu.svg';
	import ViziaLogo from '$lib/assets/vizia_logo.svg';

	import HeaderDropdown from './HeaderDropdown.svelte';
	import { base } from '$app/paths';
	import { afterUpdate, onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let hamMenuOpen = false;

	let header: Element | null = null;
	let scrollWatcher: Element | null = null;

	function hamMenuClick() {
		hamMenuOpen = !hamMenuOpen;
	}

	onMount(() => {
		updateStickingBehaviour();
	});

	afterUpdate(() => {
		updateStickingBehaviour();
	});

	afterNavigate(() => {
		updateStickingBehaviour();
	});

	function updateStickingBehaviour() {
		header = document.querySelector('.header');
		scrollWatcher = document.querySelector('.main-section');

		if (scrollWatcher && header && scrollWatcher) {
			scrollWatcher.setAttribute('data-scroll-watcher', '');
			header?.before(scrollWatcher);

			const navObserver = new IntersectionObserver(
				(entries) => {
					if (!entries[0].isIntersecting) {
						header?.classList.add('sticking');
					} else {
						header?.classList.remove('sticking');
					}
				},
				{ rootMargin: '-500px 0px 0px 0px' }
			);

			navObserver.observe(scrollWatcher);
		}
	}
</script>

<div class="header sticking" aria-label="Primary">
	<div class="wrapper">
		<a class="logo-wrapper" href="{base}/">
			<img src={ViziaLogo} class="logo" alt="Vizia Logo" />
		</a>

		<div class="links-wrapper">
			<a href="https://github.com/vizia/vizia" target="_blank" rel="noreferrer">
				<img src={GithubLogo} class="logo" alt="Github Logo" />
			</a>
			<a href="https://discord.gg/e3k9TZqrps" target="_blank" rel="noreferrer">
				<img src={DiscordLogo} class="logo" alt="Discord Logo" />
			</a>
		</div>

		<nav class="nav-wrapper">
			<a href="{base}/tutorial">Tutorials</a>
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
		</nav>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<img class="ham-menu-icon logo" src={HamburgerMenu} alt="=" on:click={() => hamMenuClick()} />
	</div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="ham-menu {hamMenuOpen ? 'open' : ''}" on:click={() => (hamMenuOpen = false)}>
	<a href="{base}/tutorial">Tutorial</a>
	<a href="{base}/guide">Guide</a>
	<a href="{base}/examples">Examples</a>
	<a href="{base}/blogs">Blogs</a>
	<a href="{base}/faq">FAQ</a>
	<a href="{base}/about">About</a>
	<div class="ham-menu-wrapper">
		<a href="https://github.com/vizia/vizia" target="_blank" rel="noreferrer">
			<img src={GithubLogo} class="logo" alt="Github Logo" />
		</a>
		<a href="https://discord.gg/e3k9TZqrps" target="_blank" rel="noreferrer">
			<img src={DiscordLogo} class="logo" alt="Discord Logo" />
		</a>
	</div>
</div>

<style lang="scss">
	.header {
		width: 100%;
		position: fixed;

		display: flex;
		justify-content: center;
		flex-direction: row;
		background-color: transparent;
		backdrop-filter: blur(8px);
		border-bottom: 1px solid;
		border-color: transparent;

		box-sizing: border-box;

		z-index: 100;
	}

	.header.sticking {
		transition: all 0.25s ease-in-out;
		background-color: var(--c-1);
		border-color: var(--border-color);
	}

	.wrapper {
		width: 100%;
		margin: 0 auto;
		height: var(--header-size);
		max-width: var(--page-width);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
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
	}

	.links-wrapper {
		flex-direction: row;
		align-items: center;

		> a {
			width: 1.5rem;
			height: 1.5rem;

			padding: 0.5rem;
			box-sizing: content-box;

			img {
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}

	.nav-wrapper {
		width: 22rem;
		height: 100%;

		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0;

		left: calc(50% - 11rem);

		position: absolute;
		align-self: center;
	}

	.ham-menu-icon {
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: fit-content;

		padding: 0.5rem;
		cursor: pointer;
	}

	.ham-menu {
		position: fixed;
		top: var(--header-size);
		width: 100%;
		height: calc(100vh - var(--header-size));
		background-color: #121212cc;
		z-index: 999;
		flex-direction: column;
		align-items: flex-end;
		gap: 1rem;
		padding: 2rem;

		transition: all ease-in-out var(--short-transition);

		backdrop-filter: blur(4px);
		display: none;

		&.open {
			display: flex;
		}
	}

	@media (min-width: 0) {
		.links-wrapper {
			display: none;
		}

		.nav-wrapper {
			display: none;
		}

		.ham-menu-icon {
			display: flex;
		}
	}

	@media (min-width: 55rem) {
		.links-wrapper {
			display: flex;
		}

		.nav-wrapper {
			display: flex;
		}

		.ham-menu-icon {
			display: none;
		}

		.ham-menu {
			display: none !important;
		}
	}
</style>
