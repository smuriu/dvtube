import { getUser } from '~~/server/utils/deezer'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'dvtube')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
  }

  const user = await getUser(token)
  return user
})
