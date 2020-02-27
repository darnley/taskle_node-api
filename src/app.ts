import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'

class App {
  public express: express.Application

  constructor() {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares(): void {
    if (this.isDevelopmentEnvironment()) {
      this.express.use(morgan('dev'))
    } else {
      this.express.use(morgan('common'))
    }

    this.express.use(helmet())
    this.express.use(cors())
  }

  private database(): void {
    const connectionString: string = String(process.env.MONGODB_CONNECTION_STRING)
    const databaseName: string = String(process.env.MONGODB_DATABASE_NAME)

    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: databaseName
    }, (err) => {
      console.error(err)
      process.exit(1)
    })
  }

  private routes(): void {
    this.express.get('/', (req, res) => {
      res.send('The sedulous hyena ate the antelope!')
    })
  }

  private isDevelopmentEnvironment(): boolean {
    return process.env.NODE_ENV === 'development'
  }
}

export default new App().express
