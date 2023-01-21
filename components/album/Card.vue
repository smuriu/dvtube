<script setup lang="ts">
defineProps<{
  album: Album
}>()
</script>

<template>
  <a :href="album.link" target="_blank">
    <div class="card card-compact w-64 bg-neutral text-neutral-content shadow-xl">
      <figure><img :src="album.cover_medium" alt="Album cover" /></figure>
      <div class="card-body">
        <div class="card-title">{{ album.title }}</div>
        <!-- TODO: format date -->
        <p>{{ album.release_date }}</p>
      </div>
    </div>
  </a>
</template>
