<script setup lang="ts">
// import { Bars3Icon } from '@heroicons/vue/24/outline/esm/index.js'

const { isLoggedIn } = useDeezer()
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <div class="w-full navbar bg-base-300">
      <div class="navbar-start">
        <NuxtLink class="btn btn-ghost" to="/">
          <span class="normal-case text-xl hidden md:block pl-2">dvtube</span>
        </NuxtLink>
      </div>
      <div class="navbar-end gap-4">
        <LazyUserDetail v-if="isLoggedIn" />
        <NuxtLink v-else to="/login" class="btn btn-outline btn-error">Login</NuxtLink>
      </div>
    </div>
    <div class="container mx-auto">
      <slot />
    </div>
  </div>
</template>
