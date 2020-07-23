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
      item: 3,
      items: [
        {
          text: 'プロフィール',
          icon: 'far fa-address-card',
          to: '/users/setting/profile',
          id: 'profile'
        },
        {
          text: 'アカウント',
          icon: 'fas fa-user-circle',
          to: '/users/setting/account'
        },
        {
          text: '通知',
          icon: 'far fa-bell',
          to: '/users/setting/notice'
        }
      ]
    }
  }
}
</script>
