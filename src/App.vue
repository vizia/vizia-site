<script setup lang="ts">
import { Code2, Zap, Monitor, Palette, Sparkles, LayoutGrid, Cpu, Accessibility, AudioWaveform, ArrowRight, BookOpen, FileText } from 'lucide-vue-next'
import Button from './ui/Button.vue'
import ButtonGroup from './ui/ButtonGroup.vue'
import ThemeToggle from './ui/ThemeToggle.vue'
import IconGithub from './ui/IconGithub.vue'
import IconDiscord from './ui/IconDiscord.vue'
import IconWindows from './ui/IconWindows.vue'
import IconApple from './ui/IconApple.vue'
import IconLinux from './ui/IconLinux.vue'
import AnimatedLogo from './ui/AnimatedLogo.vue'
import Logo from './ui/Logo.vue'

// Stats from the GitHub API (vizia/vizia), fetched 2026-08-18.
const stats = [
  { value: '2,280', label: 'GitHub stars', star: true },
  { value: '45', label: 'contributors', star: false },
  { value: '111', label: 'forks', star: false },
  { value: 'v0.4.0', label: 'latest release', star: false },
]

const features = [
  {
    icon: Code2,
    title: 'Declarative',
    text: 'Describe your UI in pure Rust: no DSL, no macros, no HTML. Just code.',
  },
  {
    icon: Zap,
    title: 'Reactive',
    text: 'Views bind to application state. Change the state and the UI updates itself.',
  },
  {
    icon: Monitor,
    title: 'Cross-platform',
    text: 'One codebase for Windows, macOS, and Linux, with a consistent look and feel.',
    os: true,
  },
  {
    icon: Palette,
    title: 'CSS-like styling',
    text: 'Style your app with stylesheets, hot-reloaded live while you work.',
  },
  {
    icon: Sparkles,
    title: 'Animations',
    text: 'Bring interfaces to life with built-in animation support.',
  },
  {
    icon: LayoutGrid,
    title: '25+ built-in views',
    text: 'Buttons, lists, tables, trees, textboxes and more, plus 4,250+ SVG icons from Tabler Icons.',
  },
  {
    icon: Cpu,
    title: 'GPU rendering',
    text: 'Powered by Skia, drawing only what is necessary for smooth, fast output.',
  },
  {
    icon: Accessibility,
    title: 'Accessible',
    text: 'Screen-reader support via accesskit, and localization via fluent.',
  },
  {
    icon: AudioWaveform,
    title: 'Audio plugins',
    text: 'A baseview backend for plugin UIs, used with nih-plug and truce.',
  },
]

const showcase = [
  {
    name: 'Audia',
    desc: 'A Spotify client written in Rust using the Vizia GUI library.',
    img: 'https://raw.githubusercontent.com/vizia/audia/main/Screenshot2.png',
    url: 'https://github.com/vizia/audia',
    badges: ['Community app'],
  },
  {
    name: 'Sample Browser',
    desc: 'An audio sample browser application, exploring browsing, preview and tagging.',
    img: 'https://raw.githubusercontent.com/vizia/vizia-sample-browser/main/screenshot.png',
    url: 'https://github.com/vizia/vizia-sample-browser',
    badges: ['Community app'],
  },
]
</script>

<template>
  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="#top">
        <img src="./assets/logo.png" alt="Vizia logo" />
        Vizia
      </a>
      <nav class="nav-group">
        <ButtonGroup>
          <Button variant="ghost" size="sm" href="https://book.vizia.dev" external>
            <BookOpen :size="15" />
            Book
          </Button>
          <Button variant="ghost" size="sm" href="https://docs.vizia.dev" external>
            <FileText :size="15" />
            Docs
          </Button>
          <Button variant="ghost" size="sm" href="https://discord.gg/aNkTPsRm2w" external>
            <IconDiscord :size="15" />
            Discord
          </Button>
        </ButtonGroup>
      </nav>
      <div class="nav-right">
        <ThemeToggle />
        <Button variant="outline" size="sm" href="https://github.com/vizia/vizia" external>
          <IconGithub :size="14" />
          GitHub
        </Button>
      </div>
    </div>
  </header>

  <main id="top">
    <!-- HERO -->
    <section class="hero">
      <div class="container">
        <AnimatedLogo class="hero-mark" :size="92" />
        <h1>
          Declarative desktop UI,<br />
          <span class="accent">in pure Rust.</span>
        </h1>
        <p class="hero-sub">
          Vizia is a declarative, reactive GUI framework for the Rust programming language.
          Describe your interface in code, bind it to state, and let Vizia handle the rest,
          on Windows, macOS, and Linux.
        </p>
        <div class="hero-ctas">
          <Button variant="outline" size="lg" href="https://github.com/vizia/vizia" external>
            <IconGithub :size="20" />
            GitHub
          </Button>
          <Button variant="outline" size="lg" href="https://discord.gg/aNkTPsRm2w" external>
            <IconDiscord :size="20" />
            Join the Discord
          </Button>
          <Button variant="primary" size="lg" href="https://book.vizia.dev" external>Get started</Button>
        </div>
        <div class="stats">
          <div class="stat" v-for="s in stats" :key="s.label">
            <div class="value">
              <svg
                v-if="s.star"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#f59e0b"
                aria-hidden="true"
              >
                <path
                  d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.863 1.4-8.168L.132 9.21l8.2-1.192z"
                />
              </svg>
              {{ s.value }}
            </div>
            <div class="label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SCREENSHOT -->
    <section class="hero-shot">
      <div class="container">
        <div class="shot-frame">
          <div class="shot-bar">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            <span class="url">cargo run --release -p widget_gallery</span>
          </div>
          <img src="./assets/widget-gallery.png" alt="Vizia widget gallery screenshot" />
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section features">
      <div class="container">
        <div class="section-head">
          <h2>Everything you need to ship a desktop app</h2>
        </div>
        <div class="features-grid">
          <div class="feature" v-for="f in features" :key="f.title">
            <component v-if="!f.os" :is="f.icon" class="feature-icon" :size="19" />
            <span v-else class="os-row">
              <IconWindows :size="18" />
              <IconApple class="os-apple" :size="18" />
              <IconLinux :size="18" />
            </span>
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CODE -->
    <section class="section code-section">
      <div class="container code-wrap">
        <figure class="code-block">
          <div class="code-head">counter.rs · the classic counter example</div>
          <pre><code><span class="k">use</span> vizia::prelude::*;

<span class="k">fn</span> <span class="t">main</span>() {
    Application::new(|cx| {
        <span class="k">let</span> count = Signal::new(0);

        HStack::new(cx, |cx| {
            Button::new(cx, |cx| Label::new(cx, <span class="s">"Increment"</span>))
                .on_press(|cx| cx.emit(AppEvent::Increment));
            Label::new(cx, count)
                .width(Pixels(50.0));
        })
        .alignment(Alignment::Center)
        .horizontal_gap(Pixels(50.0));
    })
    .title(<span class="s">"Counter"</span>)
    .inner_size((400, 100))
    .run();</code></pre>
        </figure>
        <div class="code-side">
          <h3>State in, UI out</h3>
          <img class="counter-shot" src="./assets/counter.png" alt="Vizia counter example screenshot" />
          <span class="run"><span class="arrow">›</span> cargo run --release --example counter</span>
        </div>
      </div>
    </section>

    <!-- SHOWCASE -->
    <section class="section showcase">
      <div class="container">
        <div class="section-head">
          <h2>Built with Vizia</h2>
          <p>From audio tools to full apps: here's what the community is making.</p>
        </div>
        <div class="showcase-grid">
          <a
            v-for="c in showcase"
            :key="c.name"
            class="show-card"
            :href="c.url"
            target="_blank"
            rel="noopener"
          >
            <img class="shot" :src="c.img" :alt="c.name + ' screenshot'" loading="lazy" />
            <div class="body">
              <h3>{{ c.name }}</h3>
              <p>{{ c.desc }}</p>
              <span class="badges"><span class="badge" v-for="b in c.badges" :key="b">{{ b }}</span></span>
              <span class="link">View on GitHub <ArrowRight :size="14" class="link-arrow" /></span>
            </div>
          </a>

          <div class="show-card">
            <svg class="shot" viewBox="0 0 320 180" role="img" aria-label="Audio plugin UI mockup">
              <rect width="320" height="180" fill="#10131c" />
              <rect x="0" y="0" width="320" height="34" fill="#161a26" />
              <circle cx="16" cy="17" r="4" fill="#3a4257" />
              <circle cx="30" cy="17" r="4" fill="#3a4257" />
              <circle cx="44" cy="17" r="4" fill="#3a4257" />
              <text x="160" y="22" text-anchor="middle" font-family="ui-monospace, monospace" font-size="11" fill="#67708a">GAIN · VST3</text>
              <g transform="translate(55 90)">
                <circle r="26" fill="#1a1f2e" stroke="#303a52" stroke-width="1.5" />
                <circle r="16" fill="none" stroke="#4da3e8" stroke-width="2" opacity="0.7" />
                <line x1="0" y1="0" x2="0" y2="-22" stroke="#74bdf5" stroke-width="2.5" stroke-linecap="round" />
                <circle r="3.5" fill="#74bdf5" />
              </g>
              <g transform="translate(135 90)">
                <circle r="26" fill="#1a1f2e" stroke="#303a52" stroke-width="1.5" />
                <circle r="16" fill="none" stroke="#4da3e8" stroke-width="2" opacity="0.35" />
                <line x1="0" y1="0" x2="15" y2="-16" stroke="#74bdf5" stroke-width="2.5" stroke-linecap="round" />
                <circle r="3.5" fill="#74bdf5" />
              </g>
              <g transform="translate(215 90)">
                <circle r="26" fill="#1a1f2e" stroke="#303a52" stroke-width="1.5" />
                <circle r="16" fill="none" stroke="#4da3e8" stroke-width="2" opacity="0.7" />
                <line x1="0" y1="0" x2="8" y2="20" stroke="#74bdf5" stroke-width="2.5" stroke-linecap="round" />
                <circle r="3.5" fill="#74bdf5" />
              </g>
              <rect x="40" y="140" width="240" height="4" rx="2" fill="#232a3b" />
              <rect x="110" y="136" width="8" height="12" rx="2" fill="#4da3e8" />
            </svg>
            <div class="body">
              <h3>Audio plugin GUIs</h3>
              <p>
                Vizia's baseview backend powers plugin interfaces for nih-plug and truce,
                knobs, pads and meters running right inside your DAW.
              </p>
              <span class="badges"><span class="badge">Plugin</span><span class="badge">baseview</span></span>
              <a class="link" href="https://github.com/vizia/vizia-plug" target="_blank" rel="noopener">
                vizia-plug <ArrowRight :size="14" class="link-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta">
      <div class="container">
        <div class="cta-panel">
          <h2>Ready to build something?</h2>
          <p>Add Vizia to your project and follow the book to ship your first window today.</p>
          <div class="cta-install"><span class="prompt">$</span> <span class="cmd">cargo add vizia</span></div>
          <div class="cta-actions">
            <Button variant="primary" href="https://book.vizia.dev" external>Read the book</Button>
            <Button variant="outline" href="https://github.com/vizia/vizia" external>
              <IconGithub :size="18" />
              View source on GitHub
            </Button>
            <Button variant="outline" href="https://discord.gg/aNkTPsRm2w" external>
              <IconDiscord :size="18" />
              Join the Discord
            </Button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <Logo :size="22" />
        Vizia · declarative GUI for Rust
      </div>
      <ul class="footer-links">
        <li><a href="https://github.com/vizia/vizia">GitHub</a></li>
        <li><a href="https://book.vizia.dev">Book</a></li>
        <li><a href="https://docs.vizia.dev">Docs</a></li>
        <li><a href="https://crates.io/crates/vizia">crates.io</a></li>
        <li><a href="https://discord.gg/aNkTPsRm2w">Discord</a></li>
      </ul>
      <div class="footer-note">MIT License · Logo by Lunae Somnia · Community screenshots from the vizia org on GitHub</div>
    </div>
  </footer>
</template>
