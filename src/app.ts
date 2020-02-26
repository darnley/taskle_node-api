import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

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
    // mongoose.connect(...)
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
