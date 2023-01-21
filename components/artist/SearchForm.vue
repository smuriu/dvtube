<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline/esm/index.js'

const props = withDefaults(defineProps<{
  busy?: boolean
}>(), {
  busy: false
})

const emit = defineEmits<{
  (e: 'search', term: string): void
}>()

const searchTerm = ref('')

const handleSubmit = () => {
  if (!props.busy) {
    emit('search', searchTerm.value)
  }
}
</script>

<template>
  <div class="card card-compact w-full lg:w-2/3">
    <div class="card-body items-center text-center">
      <h3 class="card-title">Find your favourite artist</h3>
      <form @submit.prevent="handleSubmit" class="w-full py-4">
        <div class="form-control w-full">
          <div class="input-group lg:input-group-lg">
            <input :disabled="busy" type="text" placeholder="artist's name"
              class="input lg:input-lg input-bordered grow" required v-model="searchTerm" />
            <button :class="{ 'loading': busy }" :disabled="busy" class="btn lg:btn-lg btn-primary" type="submit">
              <MagnifyingGlassIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
      </form>
      <div class="card-actions w-full">
        <p v-if="searchTerm" class="font-light text-start">
          Search for <span class="badge badge-outline">{{ searchTerm }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
