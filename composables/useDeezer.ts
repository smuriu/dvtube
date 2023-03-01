
export const useDeezer = () => {
  const token = useCookie('dvtube')

  const isLoggedIn = computed(() => !!token.value)

  return { isLoggedIn }
}
