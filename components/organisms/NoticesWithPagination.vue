<template>
  <div v-if="notices.length">
    <Notice
    v-for="notice in displayNotices"
    :key="notice.id"
    :notice="notice"
    />
    <v-pagination
    v-if="length"
    v-model="page"
    :length="length"
    total-visible="10"
    id="notices-pagination"
    />
  </div>
</template>

<script>
import Notice from '../molecules/notices/Notice.vue'
export default {
  components: {
    Notice
  },
  props: {
    notices: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    displayNotices () {
      return this.notices
        .slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
    },
    length () {
      return Math.ceil(this.notices.length / this.pageSize)
    }
  }
}
</script>

<style scoped>
#notices-pagination {
  margin-top: 20px;
}
</style>
