import { expressjwt } from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import logger from './lib/logger.js'

const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})

export const jwtCheck = expressjwt({
  algorithms: ['RS256'],
  secret,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  audience: process.env.AUTH0_CLIENT_ID,
  credentialsRequired: false,
  getToken: function fromCookies (req) {
    if (req.cookies && req.cookies.login_token) {
      return req.cookies.login_token
    }
    return null
  }
})

// Check admin JWT token we are creating using jsonwebtoken issuer is not configured in auth0
const adminJwtCheck = expressjwt({
  algorithms: ['HS256'],
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: function fromCookies (req) {
    if (req.cookies && req.cookies.admin_login_token) {
      return req.cookies.admin_login_token
    }
    return null
  }
})

export function wrappedCheck (req, res, next) {
  const handleErrorNext = (err) => {
    if (
      err?.name === 'UnauthorizedError' &&
      err?.inner.name === 'TokenExpiredError' &&
      (req.method === 'POST' || req.method === 'PUT')
    ) {
      logger.error(
        `Expired token sent for authenticated route - ${req.method} ${req.url}`
      )
      logger.error(err)
    }
    next(err)
  }

  return jwtCheck(req, res, handleErrorNext)
}

export function wrappedAdminCheck (req, res, next) {
  const handleErrorNext = (err) => {
    if (err?.name === 'UnauthorizedError') {
      logger.error(
        `Unauthorized access to admin route - ${req.method} ${req.url}`
      )
      logger.error(err)
    }
    next(err)
  }

  return adminJwtCheck(req, res, handleErrorNext)
}
