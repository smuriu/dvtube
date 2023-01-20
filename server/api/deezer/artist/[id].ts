import { getArtist, getArtistAlbums, getArtistTopTracks } from '~~/server/utils/deezer'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const artist = await getArtist(id)
  const topTracks = await getArtistTopTracks(id, 5)
  const albums = await getArtistAlbums(id)

  return { artist, topTracks, albums }
})
