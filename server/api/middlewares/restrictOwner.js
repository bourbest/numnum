import {ObjectId} from 'mongodb'

export const restrictToOwner = function (req, res, next) {
  if (!req.user)
    return next({httpStatus: 403, message: 'You must be authenticated'})

  req.filters = req.filters || {}
  req.ownerId = ObjectId(req.user.Id)

  if (req.entity) {
    req.entity.ownerId = req.filters.ownerId
  }
  next()
}
