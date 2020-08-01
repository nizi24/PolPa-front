<template>
  <v-container>
    <v-card class="mx-auto time-report-card">
      <v-card-title>
        <v-avatar size="40" class="time-report-avatar">
          <img v-if="user.avatar_url" :src="user.avatar_url" />
          <img v-else src="~/assets/default_icon.jpeg" />
        </v-avatar>
        <v-avatar size="30" class="time-report-avatar-mobile">
          <img v-if="user.avatar_url" :src="user.avatar_url" />
          <img v-else src="~/assets/default_icon.jpeg" />
        </v-avatar>
        <nuxt-link
        :to="toUserLink"
        style="color: inherit; text-decoration: none;"
        >
          <div class="time-report-user-name-row">
            <span class="time-report-user-name">{{ user.name }}</span>
            <small class="time-report-screen-name">
              @{{ user.screen_name }}
            </small>
          </div>
          <div class="time-report-user-name-row-mobile">
            <div class="time-report-user-name">{{ user.name }}</div>
            <small class="time-report-screen-name">
              @{{ user.screen_name }}
            </small>
          </div>
        </nuxt-link>
        <v-spacer />
        <IconButtonWithAuth
        type="far fa-edit"
        v-if="authDisplay"
        :comparison="timeReport.user_id"
        @click.stop="modalDisplay = true"
        small
        class="time-report-edit-btn"
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
        class="time-report-destroy-btn"
        />
        <ExpReductionAlert
        :displayModal="displayAlert"
        @cancel="cancel"
        @understanding="understanding"
        v-if="authDisplay"
        />
      </v-card-title>
      <v-card-text style="margin-top: 10px">
        <v-row class="study-date-row">
          <v-icon small class="calendar-icon">
            far fa-calendar-alt
          </v-icon>
          <span v-if="timeReport.study_date">{{ studyDate }}</span>
          <v-spacer />
          <IconButtonWithAuth
          type="far fa-edit"
          v-if="authDisplay"
          :comparison="timeReport.user_id"
          @click.stop="modalDisplay = true"
          small
          class="time-report-edit-btn-mobile"
          />
          <IconButtonWithAuth
          type="far fa-trash-alt"
          v-if="authDisplay"
          :comparison="timeReport.user_id"
          style="margin-right: 10px;"
          @click="displayAlert = true"
          small
          class="time-report-destroy-btn-mobile"
          />
        </v-row>
        <nuxt-link :to="toLink" style="color: inherit; text-decoration: none;">
          <v-row class="time-report-tag-row">
            <Tag v-for="tag in timeReport.tags" :tag="tag" :key="tag.id" />
          </v-row>
          <v-row>
            <v-col class="study-time-col">
              <v-icon small class="clock-icon">
                far fa-clock
              </v-icon>
              <h1 :class="changeColor" class="study-hour">{{ studyHour }}</h1>
              <span>時間</span>
              <h1 :class="changeColor" class="study-minute">
                {{ studyMinute }}
              </h1>
              <span>分</span>
            </v-col>
            <v-col class="experience-point-col">
              <v-icon small class="pencil-icon">fas fa-pencil-alt</v-icon>
              <h1
              :class="changeColor"
              v-if="timeReport.experience_record"
              class="experience-point"
              >
                {{ timeReport.experience_record.experience_point }}
              </h1>
              <h3 style="display: inline-block">EXP</h3>
            </v-col>
          </v-row>
          <p>
            {{ timeReport.memo }}
          </p>
        </nuxt-link>
        <v-row class="time-report-footer">
          <IconButton
          type="far fa-comment-dots"
          @on="commentField = !commentField"
          class="comment-icon"
          />
          <IconButton
          type="far fa-comment-dots"
          @on="commentField = !commentField"
          class="comment-icon-mobile"
          small
          />
          <span v-if="timeReport.comments_count" class="comment-count">
            {{ timeReport.comments_count }}
          </span>
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
        @addComment="addComment"
        @subComment="subComment"
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
          this.$store.commit('setTotalExperience', res.data.experience.total_experience)
          this.$store.commit('setExperienceToNext', res.data.experience.experience_to_next)
          this.$store.commit('setLevel', res.data.experience.level)
          this.$store.commit('setRequiredExp', res.data.required_exp)
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
    },
    addComment () {
      this.$emit('addComment', this.timeReport.id)
      this.timeReport.comments_count += 1
    },
    subComment () {
      this.$emit('subComment', this.timeReport.id)
      this.timeReport.comments_count -= 1
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

.time-report-avatar {
  display: inline-block;
}

.time-report-avatar-mobile {
  display: none;
}

.time-report-user-name-row {
  display: inline-block;
}

.time-report-user-name-row-mobile {
  display: none;
}

.time-report-user-name {
  margin-left: 15px;
}

.time-report-screen-name {
  color: #BDBDBD;
  margin-left: 10px;
}

.time-report-edit-btn {
  display: inline-block;
}

.time-report-destroy-btn {
  display: inline-block;
}

.time-report-edit-btn-mobile {
  display: none;
}

.time-report-destroy-btn-mobile {
  display: none;
}

.calendar-icon {
  margin-right: 10px;
}

.comment-count {
  font-size: 1.2em;
  margin-top: 10px;
}

.time-report-card {
  padding: 20px;
  margin: 12px;
  width: 600px;
}

.study-date-row {
  margin-left: 20px;
  margin-bottom: 10px;
}

.clock-icon {
  margin-left: 20px;
  margin-right: 10px;
}

.pencil-icon {
  margin-right: 10px;
}

.time-report-tag-row {
  margin-left: 20px;
  margin-bottom: 10px;
}

.time-report-footer {
  margin-top: 10px;
  margin-left: 5px;
}

.comment-icon {
  display: inline-block;
}

.comment-icon-mobile {
  display: none;
}

@media (max-width: 480px) {
  .time-report-card {
    padding: 8px;
    margin: 4px;
  }

  .time-report-avatar {
    display: none;
  }

  .time-report-avatar-mobile {
    display: inline-block;
  }

  .time-report-user-name-row {
    display: none;
  }

  .time-report-user-name-row-mobile {
    display: inline-block;
  }

  .time-report-edit-btn {
    display: none;
  }

  .time-report-destroy-btn {
    display: none;
  }

  .calendar-icon {
    margin-bottom: 5px;
  }

  .time-report-edit-btn-mobile {
    display: inline-block;
  }

  .time-report-destroy-btn-mobile {
    display: inline-block;
  }

  .study-time-col {
    padding-right: 0px !important;
  }

  .study-time-col, .experience-point-col {
    padding-bottom: 0px !important;
  }

  .time-report-user-name {
    margin-left: 10px;
    font-size: 1.0em;
  }

  .time-report-screen-name {
    font-size: 0.8em;
    margin-left: 5px;
  }

  .study-date-row {
    margin-left: 0px;
    margin-bottom: 4px;
  }

  .clock-icon {
    margin-left: 0px;
    margin-right: 5px;
  }

  .pencil-icon {
    margin-right: 5px;
  }

  .time-report-tag-row {
    margin-left: 0px;
    margin-bottom: 0px;
  }

  .study-hour, .study-minute, .experience-point {
    font-size: 2.2em;
    margin-right: 0;
  }

  .time-report-footer {
    margin-top: 0;
    margin-left: 0;
  }

  .comment-icon {
    display: none;
  }

  .comment-icon-mobile {
    display: inline-block;
  }

  .comment-count {
    font-size: 1.0em;
    margin-top: 5px;
  }
}
</style>

<style>
.fa-edit {
  margin-bottom: 5px;
}

.fa-trash-alt {
  margin-bottom: 5px;
}
</style>
