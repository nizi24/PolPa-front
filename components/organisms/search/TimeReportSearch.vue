<template>
  <div>
    <span class="search-hint">
      タグで学習記録を検索できます。
    </span>
    <v-text-field
    hint="タグで検索できます"
    v-model="word"
    >
      <v-icon slot="prepend">fas fa-search</v-icon>
    </v-text-field>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from '@/plugins/axios'
export default {
  data () {
    return {
      word: ''
    }
  },
  methods: {
    search () {
      axios
        .get('/v1/time_reports/tag_search', {
          params: {
            tag_name: this.word
          }
        }).then((res) => {
          const timeReports = JSON.parse(res.data.time_reports)
          this.$emit('addTimeReports', timeReports)
        })
    }
  },
  watch: {
    word () {
      this.delayFunc()
    }
  },
  created () {
    this.delayFunc = _.debounce(this.search, 500)
  }
}
</script>
