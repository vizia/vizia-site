<script lang="ts">
  import CodeHighlighter from "./CodeHighlighter.svelte";

  export let code =
    "pub struct MyView;\n\nimpl MyView {\n\tpub fn new(cx: &mut Context) -> Handle<MyView> {\n\t\tMyView {}.build(cx, |cx| {\n\t\t\tButton::new(cx, |_| println!(“Hello from MyView!”),\n\t\t\t\t|cx| Label::new(cx, “Press Me!”));\n\t\t});\n\t}\n}\n\nimpl View for MyView {}";
</script>

<div class="demo">
  <div class="demo-code">
    <div class="header">
      <p>basic-view.rs</p>
    </div>
    <CodeHighlighter {code} />
  </div>

  <div class="demo-preview-console-container">
    <div class="demo-preview">
      <div class="header white">
        <p>Preview</p>
      </div>
      <div class="preview" />
    </div>

    <div class="demo-console">
      <div class="header">
        <p>Console</p>
      </div>
      <div class="console" />
    </div>
  </div>
</div>

<style lang="scss">
  .demo {
    pointer-events: all;
    width: 65rem;
    height: 30rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  .demo-preview-console-container {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .header {
    width: 100%;
    height: 2rem;
    background-color: #2b2b2b;

    display: grid;
    place-content: center;

    & > p {
      font-weight: normal;
      color: #888;
    }

    &.white {
      background-color: #d4d4d4;
    }
  }

  .demo-code {
    width: 80%;

    // & > textarea {
    //   width: 100%;
    //   height: calc(100% - 2rem);
    //   height: stretch;
    //   background-color: #1d1d1d;
    //   border: 2px solid transparent;
    //   border-bottom-left-radius: 0.5rem;
    //   text-align: start;
    //   text-justify: auto;
    //   padding: calc(1rem - 2px) calc(1rem - 2px);
    //   box-sizing: border-box;

    //   &:focus {
    //     outline: none;
    //     border: 2px solid #51afef;
    //   }
    // }
  }

  .demo-preview {
    width: 100%;
    height: 50%;

    & > .preview {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }

  .demo-console {
    width: 100%;
    height: 50%;

    & > .console {
      width: 100%;
      height: 100%;
      background-color: #000;
    }
  }
</style>
