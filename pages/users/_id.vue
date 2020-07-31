<template>
<div>
  <ErrorCard
  :display="userNotFound"
  title="404 not find"
  message="ユーザーが存在しません。"
  />
  <PrevWeeklyTargetModal
  v-if="prevWeeklyTargetModal"
  :prevWeeklyTargetModal="prevWeeklyTargetModal"
  :prevWeeklyTarget="prevWeeklyTarget"
  @addTarget="addTarget"
  />
  <v-container v-if="!userNotFound" class="container">
    <v-row>
      <v-col lg="4" cols="12" id="user-side-col">
        <UserSideBar :user="user" />
        <UserTagField
        id="user-tag-field"
        :mainTags="mainTags"
        />
      </v-col>
      <v-col sm="6" id="user-side-bar-col">
        <UserSideBar :user="user" />
      </v-col>
      <v-col sm="6" id="user-tag-field-col">
        <UserTagField
        style="margin-top: 20px;"
        :mainTags="mainTags"
        />
      </v-col>
      <v-col lg="8" cols="12">
        <UserExperienceCard
        :user="user"
        :requiredExp="requiredExp"
        :timeReports="timeReports"
        />
        <v-row justify="center">
          <v-col lg="8" sm="8" cols="12">
            <v-card
            id="tag-search-card"
            v-if="timeReports.length"
            >
              <TagSearch
              @searchTimeReportInTags="searchTimeReportInTags"
              @restoration="restoration"
              />
            </v-card>
          </v-col>
        </v-row>
        <TimeReportsWithPagination
        :time_reports="timeReports"
        :user="user"
        :ids="ids"
        :restore="restore"
        :tagSearch="tagSearch"
        :newTimeReport="newTimeReport"
        @tagSearchComplete="tagSearch = false"
        @updateExperience="updateExperience"
        @restorationComplete="restore = false"
        @additionTimeReportCondition="additionTimeReportCondition"
        />
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import axios from '@/plugins/axios'
import ErrorCard from '~/components/molecules/ErrorCard.vue'
import UserSideBar from '~/components/organisms/UserSideBar.vue'
import UserExperienceCard from '~/components/organisms/UserExperienceCard.vue'
import UserTagField from '~/components/organisms/tags/UserTagField.vue'
import TimeReportsWithPagination from '~/components/organisms/timeReports/TimeReportsWithPagination.vue'
import TagSearch from '~/components/molecules/TagSearch.vue'
import PrevWeeklyTargetModal from '~/components/organisms/PrevWeeklyTargetModal.vue'

export default {
  components: {
    ErrorCard,
    UserSideBar,
    UserExperienceCard,
    UserTagField,
    TimeReportsWithPagination,
    TagSearch,
    PrevWeeklyTargetModal
  },
  data () {
    return {
      user: {},
      timeReports: [],
      displayTimeReports: [],
      requiredExp: {},
      mainTags: [],
      prevWeeklyTarget: {},
      prevWeeklyTargetModal: false,
      userNotFound: false,
      ids: [],
      tagSearch: false,
      restore: false,
      newTimeReport: {}
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    changeColor () {
      const level = this.user.level
      if (level >= 100) {
        return 'amber--text text--darken-4'
      } else if (level >= 80) {
        return 'amber--text text--darken-3'
      } else if (level >= 50) {
        return 'amber--text text--darken-2'
      } else if (level >= 20) {
        return 'amber--text text--lighten-1'
      } else {
        return 'amber--text text--lighten-2'
      }
    },
    paramsUserId () {
      return this.$route.params.id
    }
  },
  methods: {
    updateExperience (data) {
      Object.assign(this.user, data.experience)
      this.requiredExp = data.required_exp
      if (data.weekly_target) {
        this.user.target_of_the_week = []
        this.user.target_of_the_week.unshift(data.weekly_target)
      }
      this.$store.commit('experience/setExperience', data.experience)
      this.$store.commit('setLevel', data.experience.level)
    },
    searchTimeReportInTags (ids) {
      this.ids = ids
      this.tagSearch = true
    },
    addTarget (weeklyTarget) {
      this.user.target_of_the_week = []
      this.user.target_of_the_week.unshift(weeklyTarget)
    },
    restoration () {
      this.restore = true
    },
    additionTimeReportCondition (newTimeReport) {
      const currentUserId = this.currentUser.id.toString()
      if (currentUserId === this.$route.params.id) {
        this.newTimeReport = newTimeReport
      }
    }
  },
  mounted () {
    axios
      .get(`/v1/users/${this.$route.params.id}`)
      .then((response) => {
        const data = JSON.parse(response.data.user)
        const timeReports = data.time_reports
        const { time_reports, ...user } = data // eslint-disable-line
        this.user = user
        this.timeReports = timeReports
        this.requiredExp = response.data.required_exp
        this.mainTags = response.data.main_tags
        const prevWeeklyTarget = JSON.parse(response.data.prev_weekly_target)
        this.prevWeeklyTarget = prevWeeklyTarget
        if (this.prevWeeklyTarget) { this.prevWeeklyTargetModal = true }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.userNotFound = true
        }
        console.error(error)
      })
    // 新しい記録を一覧に追加
    this.$store.subscribe((mutation, state) => {
      if (this.currentUser) {
        const currentUserId = this.currentUser.id.toString()
        if (currentUserId === this.$route.params.id) {
          if (mutation.type === 'experience/setExperience') {
            Object.assign(this.user, mutation.payload)
          } else if (mutation.type === 'experience/setRequiredExp') {
            this.requiredExp = mutation.payload
          } else if (mutation.type === 'setWeeklyTarget') {
            this.user.target_of_the_week = []
            this.user.target_of_the_week.unshift(mutation.payload)
          }
        }
      }
    })
  }
}
</script>

<style scoped>
h2 {
  margin-top: 12px;
}

div.user-level {
  margin: 0;
  padding: 0;
}

div.user-level h2 {
  margin: 0;
}

#user-tag-field {
  margin-top: 20px;
}

#tag-search-card {
  margin-top: 20px;
  padding: 20px;
}

#user-side-bar-col {
  display: none;
}

#user-tag-field-col {
  display: none;
}

@media (max-width: 1024px) {

  #user-side-col {
    display: none;
  }

  #user-side-bar-col {
    display: inline-block;
  }

  #user-tag-field-col {
    display: inline-block;
  }

  #user-tag-field {
    margin-top: 0px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 !important;
  }

  #user-tag-field {
    margin-top: 20px;
  }

  #tag-search-card {
    margin-top: 10px;
    padding: 10px 20px;
  }

  #user-side-col {
    display: inline-block;
  }

  #user-side-bar-col {
    display: none;
  }

  #user-tag-field-col {
    display: none;
  }
}
</style>
