import axios from 'axios'
import env from 'ENV'

export function init () {
  axios.defaults.baseURL = env.backendDomain
  axios.defaults.withCredentials = true
  axios.defaults.timeout = 10000

  // add request interceptor
  axios.interceptors.request.use((config = {}) => {
    if (config.method.toLocaleLowerCase() === 'get') {
      const t = new Date() - 0

      if (config.url.indexOf('?') > -1) {
        config.url += '&t=' + t
      } else {
        config.url += '?t=' + t
      }
    }
    return config
  })

  // add response interceptor
  axios.interceptors.response.use((resp) => {
    // handle custom error
    return resp
  }, (err) => {
    if (err.config && err.config.disableErrHandle) {
      return Promise.reject(err)
    }

    const resp = err.response
    if (!resp) {
      if (!err.config.disableErrHandle) {
        // handle error if has not reponse
      }

      return Promise.reject(err)
    }

    const status = resp.status

    if (status === 500) {
      // handle 500
    } else if (status === 401) {
      // handle 401
    } else if (status === 403) {
      // handle 403
    }

    return Promise.reject(err)
  })
}

export default axios
