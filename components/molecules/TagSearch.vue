<template>
  <v-text-field
  hint="タグで検索できます"
  v-model="name"
  @input="search"
  >
    <v-icon slot="prepend">fas fa-search</v-icon>
  </v-text-field>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    search () {
      axios
        .get(`/v1/users/${this.$route.params.id}/tags/search`, {
          params: {
            name: this.name
          }
        }).then((res) => {
          const ids = res.data.ids.map(id => id.id)
          this.$emit('searchTimeReportInTags', ids)
        })
    }
  }
}
</script>
