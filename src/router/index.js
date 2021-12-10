import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/sound/:id',
    name: 'SoundDetails',
    component: () =>
      import('../components/Sounds/SoundDetails.vue')
  },
  {
    path: '/add-sound',
    name: 'AddSound',
    component: () =>
      import('../components/Sounds/AddSound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.name !== 'home') {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
