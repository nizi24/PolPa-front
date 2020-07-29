<template>
  <div>
    <template v-if="users.length === 0 && loading">
      <v-skeleton-loader
      v-for="n in 10"
      :key="n"
      class="mx-auto"
      type="list-item-avatar"
      />
    </template>
    <RankingUserCard
    v-for="(user, i) in users"
    :key="user.id"
    :user="user"
    :index="i"
    />
    <v-row
    justify="center"
    v-if="!users.length"
    >
      <span>該当するユーザーがいません</span>
    </v-row>
  </div>
</template>

<script>
import RankingUserCard from '../../molecules/RankingUserCard.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    RankingUserCard
  },
  data () {
    return {
      users: [],
      loading: false
    }
  },
  mounted () {
    this.loading = true
    axios.get('/v1/users/experience_rank', { params: { monthly: true } })
      .then((res) => {
        const users = JSON.parse(res.data.users)
        this.users = users
        this.loading = false
      })
  }
}
</script>
