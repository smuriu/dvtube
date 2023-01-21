import { getArtistAlbums } from '~~/server/utils/deezer'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { index } = getQuery(event)

  const albums = await getArtistAlbums(id, index ? parseInt(index as string) : 0)

  return albums
})
