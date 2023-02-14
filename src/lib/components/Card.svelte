<script lang="ts">
	import type { BlogPost, Tutorial } from '$lib/types';
	import { base } from '$app/paths';

	export let post: BlogPost | undefined = undefined;
	export let tutorial: Tutorial | undefined = undefined;
</script>

{#if post}
	<a class="post" style={`--bg: url("${base}${post.image}");`} href="{base}/blogs/{post.path}">
		<div class="wrapper main">
			<h1>{post.title}</h1>
			<p>by {post.author}</p>
		</div>
		<p>{post.description}</p>
		<div class="wrapper">
			<p class="chip {post.type}">{post.type}</p>
			<p>{post.date}</p>
		</div>
	</a>
{:else if tutorial}
	<a class="tutorial" href="{base}/tutorials/{tutorial.dir}">
		<h1>{tutorial.title}</h1>
		<!-- <div class="wrapper">
			<p class="chip {tutorial.type}">{tutorial.type}</p>
			<p>by {tutorial.author}</p>
		</div> -->
		<p>{tutorial.description}</p>
	</a>
{/if}

<style lang="scss">
	.tutorial,
	.post {
		position: relative;
		width: 100%;
		height: 8rem;
		border-radius: 0.5rem;
		padding: 1rem;
		background-color: var(--background-secondary);

		transition: all ease-in-out 100ms;

		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		* {
			z-index: 2;
		}

		h1 {
			pointer-events: none;
			font-weight: 600;
			color: #ffffff;
			margin: 0;
			margin-top: 0.5rem;
		}

		> p {
			flex: 1;
		}

		p {
			pointer-events: none;
			color: #ffffff;
		}

		.wrapper {
			display: flex;
			flex-direction: row;
			align-items: baseline;
			gap: 0.5rem;
			width: 100%;
			height: auto;
		}

		.chip {
			font-size: 0.8rem;
			font-weight: 800;
			text-transform: uppercase;
			padding: 0rem 0.5rem;
			border-radius: 2rem;
			width: auto;
			height: auto;

			&.update {
				color: #5a3232;
				background-color: #ff7979;
			}
		}

		&:hover {
			background-color: var(--background-tertiary);
			box-shadow: 0 0.5rem 0.5rem #00000022;
		}
	}

	.tutorial {
		height: 8rem;
		background-color: var(--background-secondary);
	}

	.post {
		height: 12rem;
		background: var(--bg);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 75vw;

		transition: background-position ease-in-out 0.5s;

		&::after {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			pointer-events: none;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: 0.5rem;
			background: linear-gradient(to bottom, #00000044, #00000088 100%);
			background-position: 100% 100%;
			background-size: 200% 200%;
			backdrop-filter: blur(1px);
			transition: backdrop-filter 250ms ease;
			transition: background-position 250ms ease;
		}

		&:hover::after {
			background-position: 0% 0%;
			backdrop-filter: blur(0px);
		}
	}
</style>
