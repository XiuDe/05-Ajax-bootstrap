import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Home from '../views/Home'
import Wish from '../views/Wish'
import My from '../views/My'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children:[
      {
        path:'/',
        component:Home
      },
      {
        path: '/wish',
        component: Wish
      },
      {
        path: '/my',
        component: My
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
