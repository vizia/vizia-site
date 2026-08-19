<script setup lang="ts">
import { ref } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'
import Button from './Button.vue'

// The attribute is always set explicitly (see index.html), so it is the
// single source of truth for the current theme.
const isDark = ref(document.documentElement.getAttribute('data-theme') === 'dark')

function toggle() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('vizia-theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggle"
  >
    <Sun v-if="!isDark" :size="16" />
    <Moon v-else :size="16" />
  </Button>
</template>
