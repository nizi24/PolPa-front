<template>
  <SideMenu
  :items="items"
  @timeline="$emit('timeline')"
  @tagFeed="$emit('tagFeed')"
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
          name: 'timeline'
        },
        {
          text: 'タグフィード',
          icon: 'fas fa-tags',
          name: 'tagFeed',
          id: 'tag-feed-selecter'
        }
      ]
    }
  }
}
</script>
