import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/board/List.vue'
import ListAdd from '../views/board/ListAdd.vue'
import DetailList from '../views/board/DetailList.vue'
import UpdatePage from '../views/board/UpdatePage.vue'
import Login from '../views/Login/Login.vue';
import Signup from '../views/Login/Signup.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board/listAdd',
    name: "ListAdd",
    component: ListAdd
  },
  {
    path:'/board/list',
    name:'List',
    compoenet:List
  },
  {
    path:'/board/detailList',
    name:'DetailList',
    component:DetailList,
    props:true
  },
  {
    path:'/board/updatePage',
    name:'UpdatePage',
    component:UpdatePage
  },
  {
    path:'/user/login',
    name:'Login',
    component:Login
  },
  {
    path:'/user/signup',
    name:'Signup',
    component:Signup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
