<template>
  <x-button><slot></slot></x-button>
</template>
<script>
  import { XButton } from 'vux'
  export default{
    components: {
      XButton
    },
    name: 'ui-btn',
    props: {
      title: {
        type: String,
        default: ''
      },
    },
    methods:{
    }
  }
</script>

<style>


</style>