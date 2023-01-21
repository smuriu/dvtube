<script setup lang="ts">
import { withQuery } from 'ufo'

const searching = ref(false)
const searchTerm = ref('')

const artists = ref<Artist[]>([])
const totalResults = ref(0)

const page = ref(1)
const perPage = ref(25)

const doSearch = async (name: string, nextIndex = 0) => {
  searching.value = true
  searchTerm.value = name

  try {
    const uri = withQuery('/api/deezer/search/artist', {
      name,
      index: nextIndex.toString()
    })
    const { data, total } = await $fetch<ArtistList>(uri)
    artists.value = data
    totalResults.value = total
  } catch (e) {
    artists.value = []
    totalResults.value = 0
    console.log(e)
    alert('Something went wrong')
  } finally {
    searching.value = false
  }
}

const setPage = async (pageNum: number) => {
  if (searchTerm.value) {
    const index = (pageNum - 1) * perPage.value
    await doSearch(searchTerm.value, index)
    page.value = pageNum
    // TODO: scroll to top
  }
}
</script>

<template>
  <div class="w-full flex flex-col place-content-center items-center gap-4">
    <ArtistSearchForm :busy="searching" @search="doSearch" />

    <AppPager v-if="totalResults > 0" :title="`Results for '${searchTerm}'`" :total="totalResults"
      :count="artists.length" :per-page="perPage" :page="page" @set-page="setPage">
      <ArtistCard v-for="artist in artists" :key="artist.id" :artist="artist" />
    </AppPager>
  </div>
</template>
