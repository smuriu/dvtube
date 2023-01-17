import { withQuery } from 'ufo'

// initiates deezer's server-side oauth login flow
export default defineEventHandler((event) => {
  const authUri = 'https://connect.deezer.com/oauth/auth.php'
  const { app_id, redirect_uri, perms } = useRuntimeConfig().public.deezer

  return sendRedirect(event, withQuery(authUri, { app_id, redirect_uri, perms }), 302)
})
