import passport from 'passport'
// eslint-disable-next-line no-unused-vars
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { Handler } from 'express'
import User from '../models/User'
import log from './log'

/**
 * The JWT configuration
 * @type {StrategyOptions}
 */
const params: StrategyOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

/**
 * Configure the authorization using JWT tokens
 */
const configurePassport = (): void => {
  const strategy = new Strategy(params, async (payload, done) => {
    if (!payload._doc._id) {
      return done(new Error('O Bearer não é válido.'), null)
    }

    await User
      .findById(payload._doc._id)
      .select('emailAddress role')
      .then((user) => {
        if (user) {
          if (user.isActive === false) {
            return done(new Error('O usuário do Bearer não está ativo.'), null)
          }

          log.debug(`Bearer validated for user '${user._id}' (${user.role}). Access granted.`)

          return done(null, user)
        } else {
          return done(new Error('O usuário do Bearer não foi encontrado.'), null)
        }
      })
      .catch((reason) => {
        return done(new Error(reason.message), null)
      })
  })

  passport.use(strategy)
}

configurePassport()

export default {
  initialize: (): Handler => {
    return passport.initialize()
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authenticate: (): any => {
    return passport.authenticate('jwt', { session: false })
  }
}
