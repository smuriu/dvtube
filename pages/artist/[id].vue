<script setup lang="ts">
const { id } = useRoute().params

const { data, error } = await useFetch(`/api/deezer/artist/${id}`)
if (error.value) {
  throw error.value
}

const { formatFans, formatTrackDuration } = useDeezer()

const artist = computed(() => data.value!.artist)
const topTracks = computed(() => data.value!.topTracks)
const albums = computed(() => data.value!.albums)
</script>

<template>
  <div class="lg:basis-2/3 w-full flex flex-col items-center gap-4 py-4">
    <h2 class="text-3xl self-start">{{ artist.name }}</h2>
    <span class="self-start badge badge-outline badge-lg">{{ formatFans(artist.nb_fan) }}</span>

    <div class="card lg:card-side bg-base-100 shadow-xl">
      <figure><img :src="artist.picture_big" alt="Artist pic" /></figure>
      <div class="card-body">
        <h3 class="card-title">Top Tracks by {{ artist.name }}</h3>
        <ul class="menu bg-transparent w-full">
          <li v-for="track in topTracks" :key="track.id">
            <a :href="track.link" target="_blank" class="flex gap-4">
              <span class="flex-1">{{ track.title }}</span>
              <span>{{ formatTrackDuration(track.duration) }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="divider">Albums</div>

    <div class="w-full flex flex-col place-content-center place-items-center gap-5 md:flex-row md:flex-wrap">
      <a v-for="album in albums" :key="album.id" :href="album.link" target="_blank">
        <div class="card card-compact w-64 bg-neutral text-neutral-content shadow-xl">
          <figure><img :src="album.cover_medium" alt="Album cover" /></figure>
          <div class="card-body">
            <div class="card-title">{{ album.title }}</div>
            <p>{{ album.release_date }}</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
