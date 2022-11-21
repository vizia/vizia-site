<script lang="ts">
</script>

<div class="header">
  <div class="logo-wrapper">
    <img src="/vizia_logo.svg" class="logo" alt="Vite Logo" />
    <p>Vizia</p>
  </div>

  <div class="links-wrapper">
    <a href="https://github.com/vizia/vizia" target="_blank" rel="noreferrer">
      <img src="/Github.svg" class="logo" alt="Github Logo" />
    </a>
    <a href="https://discord.gg/e3k9TZqrps" target="_blank" rel="noreferrer">
      <img src="/Discord.svg" class="logo" alt="Discord Logo" />
    </a>
  </div>

  <div class="nav-wrapper">
    <p>Tutorial</p>
    <p>Docs</p>
    <p>Examples</p>
    <p>Blog</p>
    <p>FAQ</p>
    <p>About</p>
  </div>
</div>

<style lang="scss">
  .header {
    height: 3rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 4rem;
    gap: 0px;

    background-color: #282828;
  }

  .logo-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    > img {
      width: 2.5rem;
      height: 2.5rem;
    }

    > p {
      width: auto;
      height: 3rem;
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

      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  .nav-wrapper {
    width: 25rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0;
    gap: 1.5rem;

    left: calc(50% - 12.5rem);

    position: absolute;
    align-self: center;
  }
</style>
