import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

require('dotenv-safe').config()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('common'))
}

app.use(cors())

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!')
})

app.listen(process.env.HTTP_PORT, err => {
  if (err) {
    return console.error(err)
  }
  return console.log(`Server started listening on port ${process.env.HTTP_PORT}`)
})
