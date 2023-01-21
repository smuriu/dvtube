type DeezerError = {
  error: {
    type: string
    message: string
    code: number
  }
}

interface User {
  id: number,
  name: string,
  link: string,
  picture_small: string
}

interface ListResponse {
  total: number
}

interface Artist {
  id: number
  name: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  nb_album: number
  nb_fan: number
}

interface Album {
  id: number
  title: string
  link: string
  cover: string
  cover_small: string
  cover_medium: string
  cover_big: string
  cover_xl: string
  genre_id: number
  fans: number
  release_date: date
  record_type: string
  explicit_lyrics: boolean
}

interface Track {
  id: number
  title: string
  link: string
  duration: number
}

type ArtistList = ListResponse & {
  data: Artist[]
}

type TrackList = ListResponse & {
  data: Track[]
}

type AlbumList = ListResponse & {
  data: Album[]
}
