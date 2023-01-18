import { withQuery, parseQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  const { term, index } = getQuery(event)
  if (!term) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required parameter: term' })
  }

  let uri = withQuery('https://api.deezer.com/search/artist', {
    q: term as string
  })
  if (index) {
    uri = withQuery(uri, {
      index: index as string
    })
  }

  const { data, total, next } = await $fetch<{
    data: Artist[]
    total: number
    next?: string
  }>(uri)

  let nextIndex = null
  if (next) {
    const { index } = parseQuery(next)
    nextIndex = parseInt(index as string)
  }

  return {
    data, total, nextIndex
  }
})
