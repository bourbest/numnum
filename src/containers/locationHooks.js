import {useLocation, useHistory} from 'react-router-dom'
import {forOwn, isEmpty} from 'lodash'
import {transform} from '../sapin'

const updateUrlWithObjectProps = function(location, history, obj, entitySchema, replace = true) {
  const search = new URLSearchParams(location.search)
  forOwn(entitySchema.schema, function(value, key) {
    if (obj && obj[key] !== null && obj[key] !== undefined) {
      search.set(key, encodeURIComponent(obj[key]))
    } else {
      search.delete(key)
    }
  })
  const newUrl = `${location.pathname}?${search.toString()}`
  if (replace) {
    history.replace(newUrl)
  } else {
    history.push(newUrl)
  }
}

const getEntityFromUrl = function(location, schema) {
  let ret = {}
  const search = new URLSearchParams(location.search)
  search.forEach( function(value, key) {
    if (schema.schema[key] !== undefined) {
      ret[key] = value
    }
  })
  ret = transform(ret, schema)
  return isEmpty(ret) ? null : ret
}

export function useEntityInUrl(entitySchema) {
  const location = useLocation()
  const history = useHistory()
  const entityFromUrl = getEntityFromUrl(location, entitySchema)

  return [entityFromUrl, function (obj, replace = true) {
    updateUrlWithObjectProps(location, history, obj, entitySchema, replace)
  }]
}

export function useUrlParam (name, defaultValue, replace = true) {
  const location = useLocation()
  const history = useHistory()
  const search = new URLSearchParams(location.search)
  const actualValue = search.get(name) || defaultValue

  const updateUrlParam = function (newValue) {
    search.set(name, encodeURIComponent(newValue))
    const newUrl = `${location.pathname}?${search.toString()}`
    if (replace) {
      history.replace(newUrl)
    } else {
      history.push(newUrl)
    }
  }
  return [actualValue, updateUrlParam]
}

export function useIntUrlParam (name, defaultValue) {
  const ret = useUrlParam(name, defaultValue)
  ret[0] = parseInt(ret[0], 10)
  return ret
}

export function useDisplayMode () {
  const [displayMode, setDisplayMode] = useUrlParam('display', 'list')
  const ret = {value: displayMode}
  ret.listClass = displayMode === 'large'
    ? 'recipe-tiles'
    : 'recipe-list'

  ret.toggleIcon = displayMode === 'large'
    ? 'th-list'
    : 'th-large'

  ret.toggle = function () {
    const newMode = displayMode === 'large' ? 'list' : 'large'
    setDisplayMode(newMode)
  }

  return ret
}