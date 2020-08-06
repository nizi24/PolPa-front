<template>
  <div>
    <span class="search-hint">
      タグの名前で検索できます。
    </span>
    <v-text-field
    hint="名前で検索できます"
    v-model="word"
    >
      <v-icon slot="prepend">fas fa-search</v-icon>
    </v-text-field>
    <MiniTagDetail
    v-for="tag in result"
    :key="tag.id"
    :tag="tag"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import MiniTagDetail from '../../molecules/MiniTagDetail.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    MiniTagDetail
  },
  data () {
    return {
      word: '',
      result: []
    }
  },
  methods: {
    search () {
      axios
        .get('/v1/tags/search', {
          params: {
            name: this.word
          }
        }).then((res) => {
          const tags = JSON.parse(res.data.tags)
          this.result = tags
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
