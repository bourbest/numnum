import { createService } from '../../data/index'

export const getApiConfig = (state) => state.app.apiConfig

export const getService = (state, serviceName) => {
  const apiConfig = getApiConfig(state)
  return createService(serviceName, apiConfig)
}
