// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import Lockr from 'lockr'
import g from 'assets/js/global'
import store from 'src/store'
import {
  LoadingPlugin,
  AlertPlugin,
  AjaxPlugin,
  WechatPlugin,
  ConfirmPlugin,
  ToastPlugin
} from 'vux'
require('assets/css/global.css')
require('assets/js/response.js')
require('src/store') 
FastClick.attach(document.body)

// Vue.config.productionTip = false

// 配置全局变量
// API地址
if (process.env.NODE_ENV == 'development') {
  window.HOST = 'https://bailinwap.gdhonray.com'
  window.UPLOADHOST = 'http://configbailinapi.gdhonray.com'
} else {
  window.HOST = process.env.HOST
  windowe.UPLOADHOST = process.env.UPLOADHOST
}
// 本地缓存
window.Lockr = Lockr
// 全局方法
window.$g = g

Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

Vue.prototype.$http.defaults.baseURL = window.HOST
// 添加请求拦截器
Vue.prototype.$http.interceptors.request.use(function (config) {
  // 增加token
  config.headers.common['token'] = Lockr.get('token') + '%' + window.btoa(new Date().getTime())
  return config
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
