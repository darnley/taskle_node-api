import app from './app'
require('dotenv-safe').config()

app.listen(process.env.HTTP_PORT)
