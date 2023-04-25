<script lang="ts">
	import type { BlogPost, Tutorial } from '$lib/types';
	import { base } from '$app/paths';
    import ViziaLogo from '$lib/assets/vizia_logo.svg';

    export let decorations: "none" = "none"
    export let id = ""
	export let link = ""
	export let title = "Card title"
	export let desc = "Description here"
	export let img = ""
	export let date: string | null = null;
    export let invertInfo = false
    export let imgLayout: "side" | "bottom" = "side"
    export let style = ""
</script>

<a class="card img{imgLayout}" href="{base}/{link}" style={style}>
	<div class="info" class:invert={invertInfo}>
        <h1 id="{id}">{title}</h1>
        <p>{desc}</p>
    </div>
	<!-- <div class="wrapper">
		<p class="chip {tutorial.type}">{tutorial.type}</p>
		<p>by {tutorial.author}</p>
	</div> -->
    <div class="sub">
        {#if img === ""}
			<!-- svelte-ignore a11y-missing-attribute -->
			<svg class="default-img" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.158 2.21573C14.2526 1.9924 14.4716 1.84734 14.7142 1.84734H17.3953C17.8288 1.84734 18.1212 2.2904 17.9507 2.68897L13.907 12.1433C13.8118 12.3656 13.5933 12.5098 13.3515 12.5098H12.2596C12.0156 12.5098 11.7957 12.3631 11.7019 12.138L10.9328 10.2911C10.8704 10.1412 10.8709 9.97258 10.9343 9.82313L14.158 2.21573Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.30452 1.87885C5.55001 1.877 5.77219 2.02392 5.86664 2.25051L10.7797 14.0375C10.8735 14.2625 11.0935 14.4091 11.3373 14.4091H12.147C12.5724 14.4091 12.8646 14.8371 12.7096 15.2333L11.7157 17.7734C11.6251 18.005 11.4018 18.1574 11.1532 18.1574H8.92831C8.68511 18.1574 8.46562 18.0115 8.37141 17.7873L2.04782 2.73727C1.88128 2.34097 2.17033 1.90244 2.60019 1.8992L5.30452 1.87885Z" fill="white"/>
            </svg>

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
        width: 11rem;
        transition: all 0.25s ease-in-out;

        * {
            fill: #fff;
            color: #fff;
        }
    }
</style>
