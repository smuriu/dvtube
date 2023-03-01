import { withQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  const { error_reason, code } = getQuery(event)

  if (code) {
    const config = useRuntimeConfig()
    const { app_id } = config.public.deezer
    const { app_secret } = config.deezer

    const { access_token, expires } = await $fetch<{
      access_token: string,
      expires: number
    }>(withQuery('https://connect.deezer.com/oauth/access_token.php', {
      app_id,
      secret: app_secret,
      code,
      output: 'json'
    }))

    // store access_token for subsequent requests
    setCookie(event, 'dvtube', access_token, {
      maxAge: expires,
      secure: true,
      sameSite: true
    })

    return sendRedirect(event, '/', 302)
  }

  if (error_reason) {
    throw createError({ statusCode: 403, statusMessage: error_reason as string })
  }
})
