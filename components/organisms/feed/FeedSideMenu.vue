<template>
  <SideMenu
  :item="item"
  :items="items"
  >
  </SideMenu>
</template>

<script>
import SideMenu from '../SideMenu.vue'
export default {
  components: {
    SideMenu
  },
  data () {
    return {
      item: 1,
      items: [
        {
          text: 'タイムライン',
          icon: 'far fa-address-card',
          to: '/users/setting/profile'
        }
      ]
    }
  }
}
</script>
