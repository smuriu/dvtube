export default defineEventHandler((event) => {
  deleteCookie(event, 'dvtube')
  return sendRedirect(event, '/', 302)
})
