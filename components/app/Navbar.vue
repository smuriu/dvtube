<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline/esm/index.js'

const { isLoggedIn } = useDeezer()
const colorMode = useColorMode()

const isDarkMode = computed(() => colorMode.preference === 'night')

const toggleDarkMode = () => {
  if (isDarkMode.value) {
    colorMode.preference = 'fantasy'
  }
  else {
    colorMode.preference = 'night'
  }
}
</script>

<template>
  <div class="w-full navbar bg-base-300">
    <div class="navbar-start">
      <NuxtLink class="btn btn-ghost" to="/">
        <span class="normal-case text-xl pl-2">dvtube</span>
      </NuxtLink>
    </div>
    <div class="navbar-end gap-4">
      <button class="btn btn-circle btn-ghost" @click="toggleDarkMode">
        <MoonIcon v-if="isDarkMode" Icon class="w-6 h-6" />
        <SunIcon v-else class="w-6 h-6" />
      </button>

      <LazyUserDetail v-if="isLoggedIn" />
      <a v-else href="/login" class="btn btn-outline btn-primary">Login</a>
    </div>
  </div>
</template>
