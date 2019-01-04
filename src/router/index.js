import Vue from 'vue'
import Router from 'vue-router'
import HelloWorldVux from 'pages/moduleA/HelloFromVux'
import HelloWorldVue from 'pages/moduleB/HelloWorld'
import HomeLayout from 'pages/layout/tab'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeLayout,
      redirect: 'vue',
      children: [
        {
          path: 'vue',
          name: 'vueHello',
          component: HelloWorldVue
        },
        {
          path: 'vux',
          name: 'vuxHello',
          component: HelloWorldVux
        }
      ]
    }
  ]
})

export default router