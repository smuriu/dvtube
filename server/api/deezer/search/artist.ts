import { searchArtist } from '~~/server/utils/deezer'

export default defineEventHandler(async (event) => {
  const { term, index } = getQuery(event)
  if (!term) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required parameter: term' })
  }

  let result
  if (index) {
    result = await searchArtist(term as string, Number.parseInt(index as string))
  } else {
    result = await searchArtist(term as string)
  }

  return result
})
