import passport from 'passport'
// eslint-disable-next-line no-unused-vars
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { Handler } from 'express'

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
  const strategy = new Strategy(params, (payload, done) => {
    const user = {
      _id: payload._id,
      name: 'Darnley'
    }

    if (user) {
      return done(null, { id: user })
    } else {
      return done(new Error('Usuário não encontrado'), null)
    }
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
