<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card id="notices-card">
          <v-card-title>
            <v-icon>far fa-bell</v-icon>
            <span id="notices-card-title">通知一覧</span>
          </v-card-title>
          <v-card-text>
            <template v-if="loading">
              <v-skeleton-loader
              v-for="n in 10"
              :key="n"
              type="list-item-avatar-two-line"
              />
            </template>
            <NoticesWithPagination
            :notices="notices"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NoticesWithPagination from '../components/organisms/NoticesWithPagination.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    NoticesWithPagination
  },
  data () {
    return {
      notices: [],
      loading: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  mounted () {
    this.loading = true
    const getter = () => {
      axios.get(`/v1/users/${this.currentUser.id}/notices`)
        .then((res) => {
          this.notices = res.data.notices
        })
      this.loading = false
    }
    if (this.currentUser.id) {
      getter()
    } else {
      setTimeout(getter, 2000)
    }
  },
  fetch ({ store, redirect }) {
    store.watch(
      state => state.currentUser,
      (newUser, oldUser) => {
        if (!newUser) {
          return redirect('/login')
        }
      }
    )
  }
}
</script>

<style scoped>
#notices-card {
  padding: 20px;
}

#notices-card-title {
  padding-left: 10px;
}
</style>
