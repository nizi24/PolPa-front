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
          icon: 'fas fa-history',
          to: '/users/setting/profile'
        },
        {
          text: 'タグフィード',
          icon: 'fas fa-tags',
          to: '/users/setting/profile'
        }
      ]
    }
  }
}
</script>
