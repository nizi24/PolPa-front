<template>
  <div>
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
      users: []
    }
  },
  mounted () {
    axios.get('/v1/users/experience_rank', { params: { weekly: true } })
      .then((res) => {
        const users = JSON.parse(res.data.users)
        this.users = users
      })
  }
}
</script>
