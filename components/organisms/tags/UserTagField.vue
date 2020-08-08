<template>
  <v-card>
    <MainTags
    :mainTags="mainTags"
    />
    <FollowingTags
    />
  </v-card>
</template>

<script>
import MainTags from './MainTags.vue'
import FollowingTags from './FollowingTags.vue'
export default {
  components: {
    MainTags,
    FollowingTags
  },
  props: {
    mainTags: {
      type: Array,
      required: true
    }
  }
}
</script>
