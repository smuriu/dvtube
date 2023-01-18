<script setup lang="ts">
// import { Bars3Icon } from '@heroicons/vue/24/outline/esm/index.js'
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - dvtube` : 'dvtube';
  }
})

const { isLoggedIn } = useDeezer()
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <div class="w-full navbar bg-base-300">
      <div class="navbar-start">
        <NuxtLink class="btn btn-ghost" to="/">
          <span class="normal-case text-xl pl-2">dvtube</span>
        </NuxtLink>
      </div>
      <div class="navbar-end gap-4">
        <LazyUserDetail v-if="isLoggedIn" />
        <a v-else href="/login" class="btn btn-outline btn-error">Login</a>
      </div>
    </div>
    <div class="container mx-auto page">
      <slot />
    </div>
    <footer class="footer items-center p-4 mt-4 bg-neutral text-neutral-content">
      <div class="items-center grid-flow-col">
        <p>dvtube 2023. Made with &lt;3 by
          <a class="link" href="https://github.com/smuriu">smuriu</a>.
        </p>
      </div>
      <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        Powered by
        <a href="https://www.deezer.com" target="_blank">
          <img src="/deezer/Deezer_Logo_RVB_White.svg" class="w-28" />
        </a>
      </div>
    </footer>
  </div>
</template>

<style>
.page {
  min-height: calc(100vh - theme('spacing.36'));
}
</style>
