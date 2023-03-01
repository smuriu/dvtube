import { searchArtist } from '~~/server/utils/deezer'

export default defineEventHandler(async (event) => {
  const { name, index } = getQuery(event)
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required parameter: name' })
  }

  const searchIndex = index ? parseInt(index as string) : 0
  const result = await searchArtist(name as string, searchIndex)

  return result
})
