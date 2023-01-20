import { joinURL, withQuery, parseQuery } from 'ufo'

const handleError = (result: object) => {
  if (Object.hasOwn(result, 'error')) {
    const { type, message, code } = (result as DeezerError).error
    throw createError({
      statusMessage: `${type}: ${message}; ${code}`,
      statusCode: 400
    })
  }
}

const apiBaseURL = 'https://api.deezer.com'

export const searchArtist = async (name: string, index?: number) => {
  let uri = withQuery(joinURL(apiBaseURL, 'search', 'artist'), {
    q: name
  })
  if (index) {
    uri = withQuery(uri, {
      index: index.toString()
    })
  }
  const result = await $fetch<ArtistList | DeezerError>(uri)
  handleError(result)

  const { data, total, next } = (result as ArtistList)
  let nextIndex = null
  if (next) {
    const { index } = parseQuery(next)
    nextIndex = parseInt(index as string)
  }

  return { data, total, nextIndex }
}

export const getArtist = async (id: number) => {
  const result = await $fetch<Artist | DeezerError>(joinURL(apiBaseURL, 'artist', id.toString()))
  handleError(result)

  return result as Artist
}

export const getArtistTopTracks = async (id: number, limit?: number) => {
  let uri = joinURL(apiBaseURL, 'artist', id.toString(), 'top')
  if (limit) {
    uri = withQuery(uri, {
      limit: limit.toString()
    })
  }
  const result = await $fetch<TrackList | DeezerError>(uri)
  handleError(result)

  return (result as TrackList).data
}

export const getArtistAlbums = async (id: number) => {
  const uri = joinURL(apiBaseURL, 'artist', id.toString(), 'albums')
  const result = await $fetch<AlbumList | DeezerError>(uri)
  handleError(result)

  return (result as AlbumList).data
  // TODO: return AlbumList instead? Result may be paged (more than 25? albums)
}

export const getUser = async (access_token: string) => {
  // TODO: add error handling
  const user = await $fetch<{
    id: number,
    name: string,
    link: string,
    picture_small: string
  }>(withQuery(joinURL(apiBaseURL, 'user/me'), { access_token }))

  return user
}
