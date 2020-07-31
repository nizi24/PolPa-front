<template>
<v-container>
  <v-row justify="center">
    <v-col lg="3" sm="8" cols="12">
      <UserSettingSideMenu />
    </v-col>
    <v-col lg="7" sm="8" cols="12">
      <v-card id="notice-card">
        <v-card-title id="setting-title">
          <h4>通知</h4>
        </v-card-title>
        <v-card-text>
          <SettingCheckBox
          v-model="commentNotice"
          @input="updateNoticeSetting"
          label="コメント"
          icon="far fa-comment-dots"
          explanation="自分の記録にコメントが付いた時に通知されます。"
          :disabled="disabled"
          />
          <SettingCheckBox
          v-model="followNotice"
          @input="updateNoticeSetting"
          label="フォロー"
          icon="fas fa-user-friends"
          explanation="自分がフォローされた時に通知されます。"
          :disabled="disabled"
          />
          <div class="input-block">
            <v-row>
              <v-col cols="4" class="input-label-block">
                <v-icon small>fas fa-heart</v-icon>
                <strong class="input-label">いいね</strong>
              </v-col>
            </v-row>
            <v-row>
              <span style="padding-left: 10px;">
                自分の記録やコメントにいいねされた時に通知されます。
              </span>
            </v-row>
            <v-row justify="center" style="padding-left: 10px;">
              <v-checkbox
              v-model="timeReportLikeNotice"
              label="記録"
              :disabled="disabled"
              />
              <v-checkbox
              style="margin-left: 20px;"
              v-model="commentLikeNotice"
              label="コメント"
              :disabled="disabled"
              />
              <v-spacer />
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import axios from '@/plugins/axios'
import UserSettingSideMenu from '~/components/organisms/setting/UserSettingSideMenu.vue'
import SettingCheckBox from '~/components/organisms/setting/SettingCheckBox.vue'
export default {
  components: {
    UserSettingSideMenu,
    SettingCheckBox
  },
  data () {
    return {
      commentNotice: true,
      followNotice: true,
      commentLikeNotice: true,
      timeReportLikeNotice: true,
      disabled: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  watch: {
    commentLikeNotice () {
      this.updateNoticeSetting()
    },
    timeReportLikeNotice () {
      this.updateNoticeSetting()
    }
  },
  methods: {
    updateNoticeSetting () {
      if (!this.disabled) {
        const setting = {
          comment_notice: this.commentNotice,
          follow_notice: this.followNotice,
          comment_like_notice: this.commentLikeNotice,
          time_report_like_notice: this.timeReportLikeNotice
        }
        axios
          .patch(`/v1/users/${this.currentUser.id}/setting`, { setting })
          .then((res) => {
            this.commentNotice = res.data.comment_notice
            this.followNotice = res.data.follow_notice
            this.commentLikeNotice = res.data.comment_like_notice
            this.timeReportLikeNotice = res.data.time_report_like_notice
          }).catch((err) => {
            console.error(err)
          })
      }
    }
  },
  mounted () {
    this.disabled = true
    const wait = (sec) => {
      return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000)
      })
    }
    const that = this
    async function mount () {
      try {
        if (!that.currentUser.id) {
          await wait(1)
        }
        axios
          .get(`/v1/users/${that.currentUser.id}/setting/edit`)
          .then((res) => {
            that.commentNotice = res.data.comment_notice
            that.followNotice = res.data.follow_notice
            that.commentLikeNotice = res.data.comment_like_notice
            that.timeReportLikeNotice = res.data.time_report_like_notice
            that.disabled = false
          })
      } catch (err) {
        that.disabled = false
        console.error(err)
      }
    }
    mount()
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
#notice-card {
  padding: 20px;
}

#setting-title {
  border-bottom: 1px solid #e8e8e8;
}

.input-block {
  margin-left: 20px;
  margin-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e8e8e8;
}

.input-label-block {
  padding-bottom: 0px !important;
  padding-right: 0px !important;
}

.input-label {
  color: #555555;
  margin-left: 4px;
  vertical-align: -5%;
}

@media (max-width: 480px) {
  #notice-card {
    padding: 10px;
  }

  .input-block {
    margin-left: 10px !important;
    margin-top: 10px !important;
    padding-bottom: 10px !important;
  }
}
</style>
