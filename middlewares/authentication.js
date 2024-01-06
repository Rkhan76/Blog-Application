const { validateToken } = require('../services/authentication')

function checkForAuthenticationCookie(cookieName) {
  console.log(cookieName)
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName]

    if (!tokenCookieValue) {
      return next()
    }

    try {
      const userPayload = validateToken(tokenCookieValue)
      req.user = userPayload
    } catch (error) {
      console.error('Error decoding token:', error)
      // Handle the error appropriately, for example, clear the invalid token from cookies
      res.clearCookie(cookieName)
    }

    return next()
  }
}

module.exports = {checkForAuthenticationCookie}