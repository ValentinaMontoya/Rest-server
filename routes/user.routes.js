const { Router } = require('express')
const { check } = require('express-validator')
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersById,
} = require('../controllers/user.controller')
const { validateFields } = require('../middlewares/validate-fields')
const { validate } = require('../models/user')
const {
  isValidRole,
  emailExists,
  userByIdExists,
} = require('../helpers/db-validators')

const router = Router()

router.get('/', getUsers)

router.get('/:id', getUsersById)

router.post(
  '/',
  [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido'),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExists),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('password', 'La contraseña debe tener 6 calateres o más').isLength({
      min: 6,
    }),
    /* check('password', 'La contraseña no es fuerte').isStrongPassword(), */
    check('role', 'El rol es requerido').not().isEmpty(),
    check('role').custom(isValidRole),
    validateFields,
  ],
  createUser
)

router.put(
  '/:id',
  [
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields,
  ],
  updateUser
)

router.delete(
  '/:id',
  [
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields,
  ],
  deleteUser
)

module.exports = router
