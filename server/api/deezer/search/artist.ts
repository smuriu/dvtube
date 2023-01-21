import { searchArtist } from '~~/server/utils/deezer'

export default defineEventHandler(async (event) => {
  const { name, index } = getQuery(event)
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required parameter: name' })
  }

  let result
  if (index) {
    result = await searchArtist(name as string, Number.parseInt(index as string))
  } else {
    result = await searchArtist(name as string)
  }

  return result
})
