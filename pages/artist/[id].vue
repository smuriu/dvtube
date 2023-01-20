<script setup lang="ts">
const { id } = useRoute().params

const { data } = await useFetch(`/api/deezer/artist/${id}`)

const artist = computed(() => data.value?.artist)
const topTracks = computed(() => data.value?.topTracks)
const albums = computed(() => data.value?.albums)
</script>

<template>
  <div class="lg:basis-2/3 w-full flex flex-col items-center gap-4">
    <div v-if="artist">{{ artist }}</div>
    <div v-if="topTracks">{{ topTracks }}</div>
    <div v-if="albums">{{ albums }}</div>
  </div>
</template>
