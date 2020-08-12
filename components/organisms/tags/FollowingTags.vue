<template>
  <TagsList
  title="フォローしているタグ"
  :tags="followingTags"
  nonTagMessage="まだフォローしていません。"
  >
  </TagsList>
</template>

<script>
import TagsList from './TagsList.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    TagsList
  },
  data () {
    return {
      followingTags: []
    }
  },
  mounted () {
    axios.get(`/v1/users/${this.$route.params.id}/tags/following`)
      .then((res) => {
        this.followingTags = res.data
      })
  }
}
</script>
