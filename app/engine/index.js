import http, { init as initHttp } from './http'

function init () {
  initHttp()
}

export {
  init,
  http
}
