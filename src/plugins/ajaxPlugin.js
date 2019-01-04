import Vue from 'vue'
import {
  AjaxPlugin
} from 'vux'
import Axios from 'axios'
Vue.use(AjaxPlugin)

export default function (host) {
  Axios.defaults.baseURL = host

  // 添加请求拦截器
  Axios.interceptors.request.use(function (config) {
    // 增加token
    config.headers.common['token'] = Lockr.get('token') + '%' + window.btoa(new Date().getTime())

    // 在发送请求之前做些什么
    return config;
  })
}
