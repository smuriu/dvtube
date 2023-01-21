<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  total: number
  perPage: number
  page: number
  count: number
}>(), {
  page: 1
})

const emit = defineEmits<{
  (e: 'setPage', page: number): void
}>()

const lastIndex = computed(() => {
  if (props.perPage > props.total) {
    return props.total
  }
  const index = props.page * props.perPage
  if (index > props.total) {
    return props.total
  }
  return index
})
const firstIndex = computed(() => (lastIndex.value - props.count) + 1)

const pages = computed(() => {
  const numPages = Math.ceil(props.total / props.perPage)
  return [...Array(numPages).keys()].map(i => i + 1)
})

const selectPage = (pageNum: number) => {
  emit('setPage', pageNum)
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="divider">{{ title }}</div>
    <div class="w-full flex flex-col md:flex-row flex-wrap content-center justify-center gap-5">
      <!-- page items -->
      <slot />
    </div>
    <div class="flex flex-wrap p-4">
      <div class="flex-1 self-end">
        {{ `${firstIndex} to ${lastIndex} of ${total}` }}
      </div>
      <div v-if="pages.length > 1" class="btn-group">
        <button v-for="pageNum in pages" :key="pageNum" :class="{ 'btn-active': pageNum === page }" class="btn"
          @click="selectPage(pageNum)">
          {{ pageNum }}
        </button>
      </div>
    </div>
  </div>
</template>
