<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - dvtube` : 'dvtube';
  }
})

const handleError = (error: any) => {
  console.log(error)
}

const recoverFromError = async (error: any) => {
  await navigateTo('/');
  error.value = null;
}
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <div class="w-full min-h-screen flex flex-col">
      <AppNavbar />
      <div class="container mx-auto flex-1">
        <NuxtErrorBoundary @error="handleError">
          <NuxtPage />
          <template #error="{ error }">
            <div class="w-full h-full place-content-center">
              <div class="max-w-200">
                <p>Oops, it looks like things did not go as planned :/</p>
                <p>{{ error }}</p>
                <button class="btn btn-primary btn-outline" @click="recoverFromError(error)">Try again</button>
              </div>
            </div>
          </template>
        </NuxtErrorBoundary>
      </div>
      <footer class="footer items-center p-4 mt-4 bg-neutral text-neutral-content">
        <div class="items-center grid-flow-col">
          <p>dvtube 2023. Made with &lt;3 by
            <a class="link" href="https://github.com/smuriu">smuriu</a>.
          </p>
        </div>
        <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          Powered by
          <a href="https://www.deezer.com" target="_blank">
            <img src="/deezer/Deezer_Logo_RVB_White.svg" class="w-28" />
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>
