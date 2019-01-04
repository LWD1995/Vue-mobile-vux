<template>
  <div>
    <router-view></router-view>
    <tabbar>
      <tabbar-item link="/Vux">
        <span slot="label">Vux</span>
      </tabbar-item>
      <tabbar-item link="/Vue" selected>
        <span slot="label">Vue</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  data() {
    return {}
  },
  created() {
    // $g.showLoading()
    // this.$http.post('test/a').then(res => { console.log(res) })
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>