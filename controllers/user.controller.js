const { request, response } = require('express')

const getUsers = (req = request, res = response) => {
  // url/api/users/?name?valentina&date=2022-04-12 -> query
  const { name, date } = req.query
  res.status(200).json({
    msg: 'Get - controller',
    name,
    date,
  })
}

const createUser = (req = request, res = response) => {
  // url/api/users/ -> Body: Es el objeto en JSON
  const data = req.body
  res.status(201).json({
    msg: 'post API - controller',
    data,
  })
}

const getUsersById = (req = request, res = resizeBy) => {
  // url/api/users/25 -> Segmento: El 25 entra en el id
  const id = req.params.id
  res.json({
    msg: 'Usuario por id - controller',
    id,
  })
}

const updateUser = (req = request, res = response) => {
  const id = req.params.id
  const body = req.body
  res.json({
    msg: 'put API - controller',
    id,
  })
}

const deleteUser = (req = request, res = response) => {
  const id = req.params.id
  res.json({
    msg: 'delete API - Controller',
  })
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
}
