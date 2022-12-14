const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/confing.db')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users'
    this.authPath = '/api/auth'

    // Conectar a base de datos
    this.conectarBD()

    // Middlewares
    this.middlewares()

    // Rutas de mi app
    this.routes()
  }

  conectarBD() {
    dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Lectura y parseio del body
    this.app.use(express.json())

    // Directorio ´público
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user.routes'))
    this.app.use(this.authPath, require('../routes/auth.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App escuchando en http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
