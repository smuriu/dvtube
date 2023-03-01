import { joinURL, withQuery } from 'ufo'

const apiBaseURL = 'https://api.deezer.com'

const handleError = (result: object) => {
  if (Object.hasOwn(result, 'error')) {
    const { type, message, code } = (result as DeezerError).error
    throw createError({
      statusMessage: `${type}: ${message}; ${code}`,
      statusCode: 400
    })
  }
}

export const searchArtist = async (name: string, index = 0) => {
  const uri = withQuery(joinURL(apiBaseURL, 'search', 'artist'), {
    q: name,
    index: index.toString()
  })
  const result = await $fetch<ArtistList | DeezerError>(uri)
  handleError(result)

  return result as ArtistList
}

export const getArtist = async (id: number) => {
  const result = await $fetch<Artist | DeezerError>(joinURL(apiBaseURL, 'artist', id.toString()))
  handleError(result)

  return result as Artist
}

export const getArtistTopTracks = async (id: number, limit = 5) => {
  const uri = withQuery(joinURL(apiBaseURL, 'artist', id.toString(), 'top'), {
    limit: limit.toString()
  })
  const result = await $fetch<TrackList | DeezerError>(uri)
  handleError(result)

  return (result as TrackList).data
}

export const getArtistAlbums = async (id: number, index = 0) => {
  const uri = withQuery(joinURL(apiBaseURL, 'artist', id.toString(), 'albums'), {
    index: index.toString()
  })
  const result = await $fetch<AlbumList | DeezerError>(uri)
  handleError(result)

  return result as AlbumList
}

export const getUser = async (access_token: string) => {
  const user = await $fetch<User | DeezerError>(withQuery(joinURL(apiBaseURL, 'user/me'), {
    access_token
  }))
  handleError(user)

  return user as User
}
