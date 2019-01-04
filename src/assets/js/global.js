import Vue from 'vue'
export default {
  /**
   * 处理ajax请求返回结果 
   * let res = await this.$http.post()...
   * $g.handleRes(res)
   * @param {AjaxResult} result 
   * 可以直接获取到data 错误会提示出来
   */
  handleRes(result) {
    let res = result.data
    if (res.code == 200) {
      if (res.data === '') {
        return true
      } else {
        return res.data
      }
    } else {
      Vue.$vux.alert.show({
        title: '提示',
        content: res.error
      })
      return false
    }
  },
  /**
   * 配置微信js-sdk 获取微信SDK授权 与后端配合使用
   * await $g.initWechatConfig(['configWXDeviceWiFi'], { beta: true, debug: false }) 
   * @param {*} apiList 要调用的方法列表
   * @param {Obj} extra 覆盖默认option的参数
   */
  async initWechatConfig(apiList, extra) {
    let _apiList = apiList || []
    let _extra = extra || {}
    let res = await Vue.http.post('/wechat/base/signature', { url: window.location.href, appid: Lockr.get('appId') })
    res = this.handleRes(res)
    let options = {
      debug: true,
      jsApiList: _apiList,
    }
    options = Object.assign(options, res, extra)
    Vue.wechat.config(options)
  },
  /**
   * 加载模态框
   * @param {string} 模态框内容 
   */
  showLoading(content) {
    Vue.$vux.loading.show({
      text: content || '加载中'
    })
  },
  /**
   * 隐藏加载模态框
   */
  hideLoading() {
    Vue.$vux.loading.hide()
  }
}