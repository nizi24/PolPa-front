<template>
  <SideMenu
  :items="items"
  @timeline="$emit('timeline')"
  @tagFeed="$emit('tagFeed')"
  @newest="$emit('newest')"
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
      items: [
        {
          text: 'タイムライン',
          icon: 'fas fa-history',
          name: 'timeline',
          guest: false
        },
        {
          text: 'タグフィード',
          icon: 'fas fa-tags',
          name: 'tagFeed',
          id: 'tag-feed-selecter',
          guest: false
        },
        {
          text: '新着順',
          icon: 'fas fa-hourglass-half',
          name: 'newest',
          guest: true
        }
      ]
    }
  }
}
</script>
