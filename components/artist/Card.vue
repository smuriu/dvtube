<script setup lang="ts">
// import humanNumber from 'human-number'
import humanFormat from 'human-format'

const props = defineProps<{
  artist: Artist
}>()

const fans = computed(() => {
  const num = humanFormat(props.artist.nb_fan, {
    maxDecimals: 2
  })

  return `${num} fans`
})

const handleClick = () => {
  alert(`Clicked ${props.artist.id}`)
}
</script>

<template>
  <div class="card card-compact w-64 bg-neutral text-neutral-content shadow-xl cursor-pointer" @click="handleClick">
    <figure><img :src="artist.picture_medium" :alt="`${artist.name} picture`" /></figure>
    <div class="card-body">
      <h3 class="card-title">{{ artist.name }}</h3>
      <div>
        <p>{{ fans }}</p>
      </div>
    </div>
  </div>
</template>
