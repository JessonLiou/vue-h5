import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/modules/app/Home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
