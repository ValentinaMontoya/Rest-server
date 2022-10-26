const { request, response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const { validationResult, body } = require('express-validator')

const getUsers = async (req = request, res = response) => {
  // url/api/users/?name?valentina&date=2022-04-12 -> query

  try {
    let { from = 0, lot = 5 } = req.query
    from = from <= 0 || isNaN(from) ? 0 : from - 1

    const query = { status: true }
    const [users, total] = await Promise.all([
      User.find({ status: true }).skip(from).limit(lot),
      User.countDocuments({ status: true }),
    ])

    res.status(200).json({
      total,
      users,
      from: from + 1,
      lot: Number(lot),
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const getUsersById = (req = request, res = resizeBy) => {
  // url/api/users/25 -> Segmento: El 25 entra en el id
  const id = req.params.id
  res.json({
    msg: 'Usuario por id - controller',
    id,
  })
}

const createUser = async (req = request, res = response) => {
  // url/api/users/ -> Body: Es el objeto en JSON
  try {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })

    user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
    await user.save()

    res.status(201).json({
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const updateUser = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const { password, google, ...data } = req.body

    if (password) {
      data.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
    }

    const user = await User.findByIdAndUpdate(id, data, { new: true })

    res.json({
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const deleteUser = async (req = request, res = response) => {
  try {
    const { id } = req.params

    // Borrar físico de la BD

    /* const deleteUser = await User.findByIdAndDelete(id) */

    // Borrado suave

    const deleteUser = await User.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    )

    res.json({
      deleteUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
}
