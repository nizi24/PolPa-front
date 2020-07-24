<template>
  <v-container>
    <v-card class="mx-auto mt-3 pa-5" width="600px">
      <v-card-title>
        <v-avatar size="40">
          <img v-if="user.avatar_url" :src="user.avatar_url" />
          <img v-else src="~/assets/default_icon.jpeg" />
        </v-avatar>
        <nuxt-link
        :to="toUserLink"
        style="color: inherit; text-decoration: none;"
        >
          <span style="margin-left: 15px;">{{ user.name }}</span>
          <small style="color: #BDBDBD; margin-left: 10px">
            @{{ user.screen_name }}
          </small>
        </nuxt-link>
        <v-spacer />
        <IconButtonWithAuth
        type="far fa-edit"
        v-if="authDisplay"
        :comparison="timeReport.user_id"
        @click.stop="modalDisplay = true"
        small
        />
        <TimeReportModal
        :btnDisplay="false"
        :modalDisplay="modalDisplay"
        :editInitialValue="timeReport"
        :initStudyDateHours="initStudyDateHours"
        :initStudyDateMinutes="initStudyDateMinutes"
        @closeModal="closeModal"
        @updateTimeReport="updateTimeReport"
        v-if="authDisplay"
        />
        <IconButtonWithAuth
        type="far fa-trash-alt"
        v-if="authDisplay"
        :comparison="timeReport.user_id"
        style="margin-right: 10px;"
        @click="displayAlert = true"
        small
        />
        <ExpReductionAlert
        :displayModal="displayAlert"
        @cancel="cancel"
        @understanding="understanding"
        v-if="authDisplay"
        />
      </v-card-title>
      <v-card-text style="margin-top: 10px">
        <nuxt-link :to="toLink" style="color: inherit; text-decoration: none;">
          <v-row style="margin-left: 20px; margin-bottom: 10px;">
            <v-icon small style="margin-right: 10px">
              far fa-calendar-alt
            </v-icon>
            <span v-if="timeReport.study_date">{{ studyDate }}</span>
          </v-row>
          <v-row style="margin-left: 20px; margin-bottom: 10px;">
            <Tag v-for="tag in timeReport.tags" :tag="tag.name" :key="tag.id" />
          </v-row>
          <v-row>
            <v-col>
              <v-icon small style="margin-left: 20px; margin-right: 10px">
                far fa-clock
              </v-icon>
              <h1 :class="changeColor">{{ studyHour }}</h1>
              <span>時間</span>
              <h1 :class="changeColor">{{ studyMinute }}</h1>
              <span>分</span>
            </v-col>
            <v-col>
              <v-icon small style="margin-right: 10px">fas fa-pencil-alt</v-icon>
              <h1 :class="changeColor" v-if="timeReport.experience_record">
                {{ timeReport.experience_record.experience_point }}
              </h1>
              <h3 style="display: inline-block">EXP</h3>
            </v-col>
          </v-row>
          <p>
            {{ timeReport.memo }}
          </p>
        </nuxt-link>
        <v-row style="margin-top: 10px; margin-left: 5px;">
          <IconButton
          type="far fa-comment-dots"
          @on="commentField = !commentField"
          />
          <v-spacer />
          <LikeButton
          v-if="timeReport.id"
          :objectId="timeReport.id"
          objectType="TimeReport"
          :likesCount="timeReport.likes_count"
          @destroyLike="subCount"
          @addLiked="addCount"
          />
        </v-row>
        <CommentField
        :timeReportId="time_report.id"
        @closeField="commentField = false"
        v-if="commentField"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Tag from '../../molecules/Tag.vue'
import IconButton from '../../atoms/icons/IconButton.vue'
import IconButtonWithAuth from '../../atoms/icons/IconButtonWithAuth.vue'
import LikeButton from '../../molecules/LikeButton.vue'
import CommentField from '../comments/CommentField.vue'
import ExpReductionAlert from '../ExpReductionAlert.vue'
import TimeReportModal from './TimeReportModal.vue'
import axios from '@/plugins/axios'

export default {
  components: {
    ExpReductionAlert,
    TimeReportModal,
    IconButtonWithAuth,
    Tag,
    IconButton,
    LikeButton,
    CommentField
  },
  props: {
    time_report: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modalDisplay: false,
      timeReport: {
        ...this.time_report
      },
      displayAlert: false,
      commentField: false
    }
  },
  computed: {
    studyHour () {
      const time = new Date(this.timeReport.study_time)
      return time.getHours()
    },
    studyMinute () {
      const time = new Date(this.timeReport.study_time)
      return time.getMinutes()
    },
    currentUser () {
      return this.$store.state.currentUser
    },
    authDisplay () {
      if (this.currentUser && this.currentUser.id === this.timeReport.user_id) {
        return true
      } else {
        return false
      }
    },
    changeColor () {
      const time = Number(this.studyHour) * 60 + Number(this.studyMinute)
      if (time >= 180) {
        return 'amber--text text--darken-4'
      } else if (time >= 120) {
        return 'amber--text text--darken-3'
      } else if (time >= 60) {
        return 'amber--text text--darken-2'
      } else if (time >= 30) {
        return 'amber--text text--lighten-1'
      } else {
        return 'amber--text text--lighten-2'
      }
    },
    toLink () {
      return `/time_reports/${this.timeReport.id}`
    },
    toUserLink () {
      return `/users/${this.user.id}`
    },
    initStudyDateHours () {
      const timeReport = new Date(this.timeReport.study_date)
      return timeReport.getHours().toString()
    },
    initStudyDateMinutes () {
      const timeReport = new Date(this.timeReport.study_date)
      return timeReport.getMinutes().toString()
    },
    studyDate () {
      const studyDate = this.timeReport.study_date
      const date = studyDate.substr(0, 16).split('T')[0]
        .replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日')
      const time = studyDate.substr(0, 16).split('T')[1]
      return date + ' ' + time
    }
  },
  watch: {
    time_report (newValue) {
      this.timeReport = newValue
      this.timeReport.comments = newValue.comments
    },
    'time_report.likes_count': function (newValue) { //eslint-disable-line
      this.timeReport.likes_count = newValue
    },
    'time_report.comments': function (newValue) { //eslint-disable-line
      this.timeReport.comments = newValue
    }
  },
  methods: {
    closeModal () {
      this.modalDisplay = false
    },
    updateTimeReport (data) {
      const timeReport = JSON.parse(data.time_report)
      this.timeReport = timeReport
      this.$emit('updateTimeReport', data, timeReport)
    },
    deleteTimeReport () {
      const timeReportId = this.timeReport.id
      axios
        .delete(`/v1/time_reports/${timeReportId}`, {
          params: {
            user_id: this.currentUser.id
          }
        })
        .then((res) => {
          this.$emit('updateTimeReport', res.data)
          this.$emit('deleteTimeReport', timeReportId, res.data.weekly_target)
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: '記録を削除しました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        })
    },
    cancel () {
      this.displayAlert = false
    },
    understanding () {
      this.displayAlert = false
      this.deleteTimeReport()
    },
    subCount () {
      this.$emit('subLikesCount', this.timeReport.id)
      this.timeReport.likes_count -= 1
    },
    addCount () {
      this.$emit('addLikesCount', this.timeReport.id)
      this.timeReport.likes_count += 1
    }
  }
}
</script>

<style scoped>
h1 {
  display: inline-block;
  font-size: 3.0em;
  margin-right: 5px;
}
</style>
