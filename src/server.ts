import path from 'path'

require('dotenv-safe').config({
  path: path.join(__dirname, '../', '.env')
})

// eslint-disable-next-line import/first
import app from './app'

app.listen(process.env.HTTP_PORT)
