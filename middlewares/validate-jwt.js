const { request, respose } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req = request, res = respose, next) => {
  const { token } = req.headers
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY)
    req.authenticatedUserId = id
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Token no válido',
    })
  }
}

module.exports = validateJWT
