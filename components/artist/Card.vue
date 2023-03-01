<script setup lang="ts">
import { formatFans } from '~~/utils/deezer'

defineProps<{
  artist: Artist
}>()
</script>

<template>
  <NuxtLink :to="{
    name: 'artist-id',
    params: {
      id: artist.id
    }
  }">
    <div class="card card-compact w-64 bg-neutral text-neutral-content shadow-xl">
      <figure><img :src="artist.picture_medium" :alt="`${artist.name} picture`" /></figure>
      <div class="card-body">
        <h3 class="card-title">{{ artist.name }}</h3>
        <div>
          <p>{{ formatFans(artist.nb_fan) }}</p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
