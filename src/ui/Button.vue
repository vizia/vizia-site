<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg' | 'icon'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    /** Renders an <a> instead of a <button> when set. */
    href?: string
    /** Adds target="_blank" rel="noopener" (only when href is set). */
    external?: boolean
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', external: false, disabled: false },
)

const classes = computed(() => [
  'btn',
  `btn-${props.variant}`,
  `btn-${props.size}`,
  { 'btn-disabled': props.disabled },
])
</script>

<template>
  <a
    v-if="href"
    :class="classes"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
  >
    <slot />
  </a>
  <button v-else type="button" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>
