<script setup lang="ts">
const { data: user } = await useFetch<User>('/api/deezer/user')

const avatarSrc = computed(() => {
  if (!user.value) {
    return ''
  }

  return user.value.picture_small || `https://avatars.dicebear.com/api/adventurer-neutral/${user.value.id}.svg`
})
</script>

<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-circle btn-outline avatar">
      <div class="w-10 rounded-full">
        <img :src="avatarSrc" alt="avatar" />
      </div>
    </label>
    <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
      <li>
        <a :href="user?.link" target="_blank">{{ user?.name }}</a>
      </li>
      <li>
        <a href="/logout">Logout</a>
      </li>
    </ul>
  </div>
</template>
