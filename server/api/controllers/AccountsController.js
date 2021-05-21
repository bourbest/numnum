import {omit} from 'lodash'
import {UserAccountRepository} from '../repository'
import {entityFromBody} from '../middlewares/entityFromBody'
import {newAccountSchema} from '../schema/account-schema'
import bcrypt from 'bcryptjs'
import shortid from 'shortid'

const USERNAME_MUST_BE_UNIQUE = {httpStatus: 400, message: 'Code utilisateur déjà utilisé'}

const hashPassword = (req, res, next) => {
  const password = req.entity.password
  req.entity = omit(req.entity, ['password', 'confirm'])
  if (password && password.length > 0) {
    bcrypt.hash(password, 8)
      .then(hashedPassword => {
        req.entity.passwordHash = hashedPassword
        next()
      })
  } else {
    next()
  }
}
function ensureUsernameIsUnique (req, res, next) {
  const repo = new UserAccountRepository(req.database)
  return repo.findByUsername(req.body.username)
    .then(function (user) {
      if (user === null) {
        next()
      } else {
        next(USERNAME_MUST_BE_UNIQUE)
      }
    })
}

function createAccount (req, res, next) {
  const repo = new UserAccountRepository(req.database)
  const user = req.entity
  user.id = shortid.generate()

  const now = new Date()
  user.createdOn = now
  user.modifiedOn = now

  return repo.insert(user)
    .then(function () {
      req.result = omit(user, ['passwordHash'])
      next()
    })
    .catch(next)
}


export default {
  createAccount: [
      entityFromBody(newAccountSchema),
      hashPassword,
      ensureUsernameIsUnique,
      createAccount
    ]
}
