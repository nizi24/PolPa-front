<template>
  <div>
    <v-row justify="center">
      <v-col lg="6" sm="8" cols="12">
        <v-card style="padding: 20px;">
          <v-icon style="color: #FFB300; margin-right: 5px" small>
            fas fa-dumbbell
          </v-icon>
          <span id="weekly-targets-title">
            目標の履歴
          </span>
          <div
          v-if="!weeklyTargets.length"
          id="non-weekly-targets"
          >
            履歴がありません。
          </div>
        </v-card>
        <template v-if="loading">
          <v-skeleton-loader
          v-for="n in 10"
          :key="n"
          type="card"
          />
        </template>
        <WeeklyTargetCard
        v-for="weeklyTarget in displayWeeklyTargets"
        :key="weeklyTarget.id"
        :weeklyTarget="weeklyTarget"
        :nonActions="true"
        :nonTitle="true"
        class="weekly-target"
        />
        <v-pagination
        v-if="length"
        v-model="page"
        :length="length"
        total-visible="10"
        id="notices-pagination"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WeeklyTargetCard from '../components/organisms/WeeklyTargetCard.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    WeeklyTargetCard
  },
  data () {
    return {
      weeklyTargets: [],
      loading: false,
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    displayWeeklyTargets () {
      return this.weeklyTargets
        .slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
    },
    length () {
      return Math.ceil(this.weeklyTargets.length / this.pageSize)
    }
  },
  mounted () {
    this.loading = true
    const getter = () => {
      axios.get(`/v1/users/${this.currentUser.id}/weekly_targets`)
        .then((res) => {
          this.weeklyTargets = res.data
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
  },
  head () {
    return {
      title: '週間目標一覧 - PolPa'
    }
  }
}
</script>

<style scoped>
#weekly-targets-title {
  display: inline-block;
  vertical-align: -6%;
  font-size: 1.2em;
}

.weekly-target {
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

#non-weekly-targets {
  padding: 10px;
  font-size: 0.9em;
  color: #888888;
}
</style>
