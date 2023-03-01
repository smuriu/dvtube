<script setup lang="ts">
import { withQuery } from 'ufo'
import { formatFans, formatTrackDuration } from '~~/utils/deezer'

const { id } = useRoute().params
const page = ref(1)
const perPage = ref(25)
const albums = ref<AlbumList | null>(null)

const { data, error } = await useFetch(`/api/deezer/artist/${id}`)
if (error.value) {
  throw error.value
}

if (data.value) {
  albums.value = data.value.albums
}

const artist = computed(() => data.value?.artist)
const topTracks = computed(() => data.value?.topTracks ?? [])

const setPage = async (pageNum: number) => {
  if (data.value) {
    const index = (pageNum - 1) * perPage.value
    albums.value = await $fetch<AlbumList>(withQuery(`/api/deezer/artist/${id}/albums`, {
      index: index.toString()
    }))
    page.value = pageNum
  }
}
</script>

<template>
  <div class="lg:basis-2/3 w-full flex flex-col items-center gap-4 py-4">

    <Head>
      <Title>{{ artist?.name }}</Title>
    </Head>

    <h2 class="text-3xl self-start">{{ artist?.name }}</h2>
    <span class="self-start badge badge-outline badge-lg" v-if="artist">{{ formatFans(artist.nb_fan) }}</span>

    <div class="card lg:card-side bg-base-100 shadow-xl">
      <figure><img :src="artist?.picture_big" alt="Artist pic" /></figure>
      <div class="card-body">
        <h3 class="card-title">Top Tracks by {{ artist?.name }}</h3>
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

    <AppPager v-if="albums" title="Discography" :total="albums.total" :per-page="perPage" :page="page"
      :count="albums.data.length" @set-page="setPage">
      <AlbumCard v-for="album in albums.data" :key="album.id" :album="album" />
    </AppPager>
  </div>
</template>
