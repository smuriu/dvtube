import { withQuery } from 'ufo'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'dvtube')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
  }

  const user = $fetch<{
    id: number,
    name: string,
    link: string,
    picture_small: string
  }>(withQuery('https://api.deezer.com/user/me', {
    access_token: token
  }))

  return user
})
