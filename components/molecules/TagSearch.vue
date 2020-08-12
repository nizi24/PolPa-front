<template>
  <v-text-field
  hint="タグで検索できます"
  v-model="name"
  >
    <v-icon slot="prepend">fas fa-search</v-icon>
  </v-text-field>
</template>

<script>
import _ from 'lodash'
import axios from '@/plugins/axios'
export default {
  data () {
    return {
      name: ''
    }
  },
  watch: {
    name () {
      this.delayFunc()
    }
  },
  methods: {
    search () {
      if (this.name === '') {
        this.$emit('restoration')
        return
      }
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
  },
  created () {
    this.delayFunc = _.debounce(this.search, 500)
  }
}
</script>
