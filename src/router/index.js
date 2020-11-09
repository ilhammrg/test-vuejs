import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/foods',
    name: 'Foods',
    component: () => import(/* webpackChunkName: "foods" */ '../views/Foods.vue')
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component: () => import(/* webpackChunkName: "food-detail" */ '../views/FoodDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
