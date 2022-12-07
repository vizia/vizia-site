<script lang="ts">
  import rust from "highlight.js/lib/languages/rust";
  import hljs from "highlight.js/lib/core";
  import "highlight.js/styles/github-dark.css";
  hljs.registerLanguage("rust", rust);

  export let code = "";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  type HighlightedCode = undefined | string;
  let highlighted: HighlightedCode = "";

  function update() {
    highlighted = hljs.highlight(code, {
      language: "rust",
      ignoreIllegals: true,
    }).value;
    dispatch("highlight", { highlighted });
  }

  onMount(() => {
    update();
  });
</script>

<div>
  <textarea
    spellcheck="false"
    bind:value={code}
    on:click={update}
    on:input={update}
  />
  <pre
    contenteditable="true"
    id="highlighting"
    aria-hidden="true"
    bind:innerHTML={highlighted}
  />
</div>

<style lang="scss">
  div {
    width: 100%;
    height: calc(100% - 2rem);
    display: flex;
  }

  textarea {
    resize: none;
    width: 100%;
    height: 28rem;
    border: 0;
    font-size: 1.2rem;
    padding-left: 1rem;
    padding-top: 1rem;
    tab-size: 2;
    box-sizing: border-box;
    background-color: #1d1d1d;
    opacity: 1;
    line-height: 1.4rem;
    scrollbar-width: initial;
    color: #88888888;
    caret-color: #51afef;
    overflow: hidden;

    text-overflow: clip;
    white-space: pre;

    &::selection {
      background-color: #424242;
    }

    &:focus {
      outline: none;
    }
  }

  #highlighting {
    position: absolute;
    pointer-events: none;
    width: calc(65rem * 0.7);
    height: 28rem;
    border: 0;
    font-size: 1.2rem;
    padding: 1rem;
    tab-size: 2;
    box-sizing: border-box;
    line-height: 1.4rem;
    overflow: hidden;

    &:focus {
      outline: none;
    }

    & code {
      white-space: pre;
    }
  }
</style>
