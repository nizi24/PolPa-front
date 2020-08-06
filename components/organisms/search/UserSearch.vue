<template>
  <div>
    <span class="search-hint">
      名前で検索できます。@から始めるとユーザーIDで検索できます。
    </span>
    <v-text-field
    hint="名前で検索できます"
    v-model="word"
    >
      <v-icon slot="prepend">fas fa-search</v-icon>
    </v-text-field>
    <MiniUserProfile
    v-for="user in result"
    :key="user.id"
    :user="user"
    :experience="user.experience"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import MiniUserProfile from '../../molecules/MiniUserProfile.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    MiniUserProfile
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
        .get('/v1/users/search', {
          params: {
            word: this.word
          }
        }).then((res) => {
          const users = JSON.parse(res.data.users)
          this.result = users
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

<style>
.search-hint {
  margin-left: 10px;
  font-size: 0.8em;
  color: rgba(0, 0, 0, 0.6);
}
</style>
