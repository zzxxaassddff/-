import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import './api/mock.js'
import Cookie from 'js-cookie'

Vue.config.productionTip = false

Vue.use(ElementUI)

//添加全局前置导航守卫
router.beforeEach((to,from,next)=>{
  const token = Cookie.get('token')
  //token不存在，说明用户未登录，应跳转到登录页面
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu',router)
  }

}).$mount('#app')
