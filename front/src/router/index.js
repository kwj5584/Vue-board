import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import ListAdd from '../views/ListAdd.vue'
import DetailList from '../views/DetailList.vue'
import UpdatePage from '../views/UpdatePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listAdd',
    name: "ListAdd",
    component: ListAdd
  },
  {
    path:'/list',
    name:'List',
    compoenet:List
  },
  {
    path:'/detailList',
    name:'DetailList',
    component:DetailList,
    props:true
  },
  {
    path:'/updatePage',
    name:'UpdatePage',
    component:UpdatePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
