import {validate, transform} from '../../../src/sapin'

export function parseFilters (filtersSchema) {
  return (req, res, next) => {
    let filters = {}
    if (req.query) {
      const error = validate(req.query, filtersSchema, null, true)

      if (error) {
        return next({httpStatus: 400, message: 'Invalid filters parameters', error})
      }

      filters = transform(req.query, filtersSchema)
    }

    req.filters = filters

    next()
  }
}
