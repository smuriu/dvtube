<script setup lang="ts">
import { withQuery } from 'ufo'

const searching = ref(false)
const currentPage = ref(1)
const perPage = ref(25)
const index = computed(() => ((currentPage.value - 1) * perPage.value).toString())

const searchResult = ref<ArtistList | null>(null)
const artists = computed(() => searchResult.value?.data ?? [])
const totalResults = computed(() => searchResult.value?.total ?? 0)

const route = useRoute()
const search = computed(() => route.query.search?.toString())
const page = computed(() => route.query.page?.toString())

watchEffect(async () => {
  if (search.value) {
    searching.value = true

    if (page.value && isFinite(parseInt(page.value.toString()))) {
      currentPage.value = parseInt(page.value.toString())
    }

    const uri = withQuery('/api/deezer/search/artist', {
      name: search.value,
      index: index.value
    })

    try {
      searchResult.value = await $fetch<ArtistList>(uri)
    } catch (e) {
      searchResult.value = null
      console.log(e)
      alert('Something went horribly wrong')
    } finally {
      searching.value = false
    }
  } else {
    searchResult.value = null
  }
})

const router = useRouter()

const onSearch = (name: string) => {
  router.push({
    name: 'index',
    query: {
      search: name,
      page: '1'
    }
  })
}

const onSetPage = (pageNum: number) => {
  if (search.value) {
    router.push({
      name: 'index',
      query: {
        search: search.value,
        page: pageNum.toString()
      }
    })
  }
}
</script>

<template>
  <div class="w-full flex flex-col place-content-center items-center gap-4">
    <ArtistSearchForm :busy="searching" :init="search" @search="onSearch" />

    <AppPager v-if="searchResult" :title="`Results for '${search}'`" :total="totalResults" :count="artists.length"
      :per-page="perPage" :page="currentPage" @set-page="onSetPage">
      <ArtistCard v-if="totalResults" v-for="artist in artists" :key="artist.id" :artist="artist" />
      <div v-else>
        No results for {{ search }} :/
      </div>
    </AppPager>
  </div>
</template>
