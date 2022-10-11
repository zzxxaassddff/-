import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue' // eslint-disable-line no-unused-vars
import User from '../views/User.vue' // eslint-disable-line no-unused-vars
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue' // eslint-disable-line no-unused-vars
import PageOne from '../views/PageOne' // eslint-disable-line no-unused-vars
import PageTwo from '../views/PageTwo' // eslint-disable-line no-unused-vars
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:Main,
    name:'Main',
    redirect:'/home',
    children:[
      {path:'home', name:'home', component:Home},
      {path:'user',name:'user',component:User},
      {path:'mall',name:'mall',component:Mall},
      {path:'page1',name:'page1',component:PageOne},
      {path:'page2',name:'page2',component:PageTwo},
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router