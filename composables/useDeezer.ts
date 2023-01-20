// import humanNumber from 'human-number'
import humanFormat from 'human-format'

export const useDeezer = () => {
  const token = useCookie('dvtube')

  const isLoggedIn = computed(() => !!token.value)

  const formatFans = (fans: number) => {
    const num = humanFormat(fans, {
      maxDecimals: 2
    })

    return `${num} fans`
  }

  const formatTrackDuration = (duration: number) => {
    const parts = []
    let remaining = duration

    if (remaining >= 3600) {
      parts.push(Math.floor(duration / 3600))
      remaining = duration % 3600
    }
    if (remaining > 60) {
      let minutes = Math.floor(remaining / 60)
      parts.push(minutes < 10 ? `0${minutes}` : minutes)
      remaining = remaining % 60
    }
    parts.push(remaining < 10 ? `0${remaining}` : remaining)

    return parts.join(':')
  }

  return {
    isLoggedIn,
    formatFans,
    formatTrackDuration
  }
}
