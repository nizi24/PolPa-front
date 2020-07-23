<template>
<v-container>
  <v-col cols="3">
    <FeedSideMenu
    />
  </v-col>
</v-container>
</template>

<script>
import FeedSideMenu from '../components/organisms/feed/FeedSideMenu.vue'
export default {
  components: {
    FeedSideMenu
  },
  data () {
    return {
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  }
}
</script>
