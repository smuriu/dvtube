<script setup lang="ts">
import { withQuery } from 'ufo'

interface SearchResult {
  data: Artist[],
  total: number,
  nextIndex: number | null
}

const searching = ref(false)
const searchTerm = ref('')

const artists = ref<Artist[]>([])
const totalResults = ref(0)
const nextIndex = ref<number | null>(null)

const doSearch = async (term: string) => {
  searching.value = true
  searchTerm.value = term
  artists.value = []
  totalResults.value = 0
  nextIndex.value = null

  try {
    const uri = withQuery('/api/deezer/search/artist', { term })
    const { data, total, nextIndex: next } = await $fetch<SearchResult>(uri)
    artists.value = data
    totalResults.value = total
    nextIndex.value = next
  } catch (e) {
    alert('Something went wrong')
    console.log(e)
  } finally {
    searching.value = false
  }
}

const loadMore = async () => {
  if (nextIndex.value) {
    searching.value = true

    try {
      const uri = withQuery('/api/deezer/artists/search', {
        term: searchTerm.value,
        index: nextIndex.value.toString()
      })
      const { data, total, nextIndex: next } = await $fetch<SearchResult>(uri)
      artists.value = [
        ...artists.value,
        ...data
      ]
      totalResults.value = total
      nextIndex.value = next
    } catch (e) {
      alert('Something went wrong')
      console.log(e)
    } finally {
      searching.value = false
    }
  }
}
</script>

<template>
  <div class="lg:basis-2/3 w-full flex flex-col items-center gap-4">
    <ArtistSearchForm :busy="searching" @search="doSearch" />

    <div v-if="totalResults > 0" class="lg:basis-2/3 w-full flex flex-col gap-4">
      <h3 class="text-2xl ml-4">
        Showing {{ artists.length }} of {{ totalResults }} results for
        <span class="badge badge-lg badge-outline">{{ searchTerm }}</span>
      </h3>
      <div class="w-full flex flex-col place-content-center place-items-center gap-5 md:flex-row md:flex-wrap">
        <ArtistCard v-for="artist in artists" :key="artist.id" :artist="artist" />
      </div>

      <p class="text-center">
        <button v-if="nextIndex" class="btn btn-outline" :class="{ loading: searching }" @click="loadMore">More</button>
      </p>
    </div>
  </div>
</template>
