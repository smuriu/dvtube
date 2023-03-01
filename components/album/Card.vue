<script setup lang="ts">
import { formatFans } from '~~/utils/deezer'

defineProps<{
  album: Album
}>()

const formatReleaseDate = (date: Date | string) => {
  const year = new Date(date).getFullYear()
  return `${year} release`
}
</script>

<template>
  <a :href="album.link" target="_blank">
    <div class="card card-compact w-64 bg-neutral text-neutral-content shadow-xl">
      <figure><img :src="album.cover_medium" alt="Album cover" /></figure>
      <div class="card-body">
        <div class="card-title">{{ album.title }}</div>
        <div class="flex">
          <span class="flex-1">{{ formatReleaseDate(album.release_date) }}</span>
          <span class="badge badge-sm badge-accent self-end">{{ formatFans(album.fans) }}</span>
        </div>
      </div>
    </div>
  </a>
</template>
