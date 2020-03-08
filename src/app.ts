import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import authentication from './utils/authentication'
import routes from './routes'
import requestIp from 'request-ip'
import log from './utils/log'

/**
 * The main Application
 *
 * @class App
 */
class App {
  public express: express.Application

  /**
   * Creates an instance of App.
   *
   * @memberof App
   * @constructor
   */
  constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  /**
   * Configure the application middlewares
   *
   * @private
   * @memberof App
   */
  private middlewares (): void {
    if (this.isDevelopmentEnvironment()) {
      this.express.use(morgan('dev'))
    } else {
      this.express.use(morgan('common'))
    }

    this.express.set('trust proxy', true)
    this.express.use(requestIp.mw())
    this.express.use(helmet())
    this.express.use(cors())
    this.express.use(bodyParser.json())
    this.express.use(authentication.initialize())
  }

  /**
   * Configure the databases.
   *
   * @private
   * @memberof App
   */
  private database (): void {
    const connectionString = String(process.env.MONGODB_CONNECTION_STRING)
    const databaseName = String(process.env.MONGODB_DATABASE_NAME)

    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: databaseName
    }, (err) => {
      if (err) {
        log.error(err)
        process.exit(1)
      }
    }).then(() => {
      log.info('Connection established to MongoDB')
    })
  }

  /**
   * Configure the routes.
   *
   * @private
   * @memberof App
   */
  private routes (): void {
    this.express.use('/', routes)
  }

  /**
   * Verify if the current environment is development.
   *
   * @private
   * @returns {boolean}
   * @memberof App
   */
  private isDevelopmentEnvironment (): boolean {
    return process.env.NODE_ENV === 'development'
  }
}

export default new App().express
