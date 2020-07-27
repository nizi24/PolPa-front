<template>
  <v-dialog
      v-model="dialog"
      max-width="500"
      transition="scroll-x-transition"
      persistent
    >
      <ReuseWeeklyTarget
      :prevWeeklyTarget="prevWeeklyTarget"
      :dialog="reuse"
      @close="reuse = false"
      @addTarget="addTarget"
      />
      <v-card>
        <v-card-title style="color: #FFD54F;">
          <h3>
            先週の結果
          </h3>
          <span style="font-size: 0.8em; margin-left: 30px;">{{ weekly }}</span>
        </v-card-title>

        <v-card-text style="margin-top: 40px;">
          <h1 v-if="prevWeeklyTarget.achieve" id="achieve">
            目標達成！！
          </h1>
          <v-row style="margin-top: 30px;" justify="center">
            <v-col cols="6">
              <h3 style="text-align: center">目標</h3>
            </v-col>
            <v-col cols="6">
              <h3 style="text-align: center">報告時間</h3>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="6">
              <v-icon small style="margin-left: 30px; margin-right: 10px">
                fas fa-dumbbell
              </v-icon>
              <h1 :class="changeColor(targetHour, targetMinute)" class="time">
                {{ targetHour }}
              </h1>
              <span>時間</span>
              <h1 :class="changeColor(targetHour, targetMinute)" class="time">
                {{ targetMinute }}
              </h1>
              <span>分</span>
            </v-col>
            <v-col cols="6">
              <v-icon small style="margin-left: 30px; margin-right: 10px">
                far fa-clock
              </v-icon>
              <h1
              :class="changeColor(progressHour, progressMinute)"
              class="time"
              >
                {{ progressHour }}
              </h1>
              <span>時間</span>
              <h1
              :class="changeColor(progressHour, progressMinute)"
              class="time"
              >
                {{ progressMinute }}
              </h1>
              <span>分</span>
            </v-col>
          </v-row>
          <v-row
          justify="center"
          style="margin-top: 30px;"
          v-if="prevWeeklyTarget.weekly_target_experience_record"
          >
            <v-col cols="8">
              <v-icon small style="margin-right: 10px">fas fa-pencil-alt</v-icon>
              <span>ボーナスEXP</span>
              <h1 :class="changeColor(progressHour, progressMinute)" class="time">
                {{
                prevWeeklyTarget.weekly_target_experience_record.experience_point
                }}
              </h1>
              <h3 style="display: inline-block; margin-left: 5px;">EXP</h3>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="reuseWeeklyTarget"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import ReuseWeeklyTarget from './ReuseWeeklyTarget.vue'
export default {
  components: {
    ReuseWeeklyTarget
  },
  props: {
    prevWeeklyTargetModal: {
      type: Boolean
    },
    prevWeeklyTarget: {
      required: true
    }
  },
  data () {
    return {
      dialog: this.prevWeeklyTarget,
      reuse: false
    }
  },
  watch: {
    prevWeeklyTargetModal (newValue) {
      this.dialog = newValue
    }
  },
  computed: {
    weekly () {
      const start = this.prevWeeklyTarget.start_date
        .replace(/^\d{4}-0?(\d{1,2})-(\d{2})/, '$1月$2日').split('T')[0]
      const end = this.prevWeeklyTarget.end_date
        .replace(/^\d{4}-0?(\d{1,2})-(\d{2})/, '$1月$2日').split('T')[0]
      return start + ' ~ ' + end
    },
    progressHour () {
      const time = new Date(this.prevWeeklyTarget.progress)
      return time.getHours() + (time.getDate() - 1) * 24
    },
    progressMinute () {
      const time = new Date(this.prevWeeklyTarget.progress)
      return time.getMinutes()
    },
    targetHour () {
      const time = new Date(this.prevWeeklyTarget.target_time)
      return time.getHours() + (time.getDate() - 1) * 24
    },
    targetMinute () {
      const time = new Date(this.prevWeeklyTarget.target_time)
      return time.getMinutes()
    }
  },
  methods: {
    changeColor (hour, minute) {
      const time = Number(hour) * 60 + Number(minute)
      if (time >= 600) {
        return 'amber--text text--darken-4'
      } else if (time >= 420) {
        return 'amber--text text--darken-3'
      } else if (time >= 300) {
        return 'amber--text text--darken-2'
      } else if (time >= 150) {
        return 'amber--text text--lighten-1'
      } else {
        return 'amber--text text--lighten-2'
      }
    },
    reuseWeeklyTarget () {
      this.dialog = false
      this.reuse = true
    },
    addTarget (weeklyTarget) {
      this.$emit('addTarget', weeklyTarget)
    }
  }
}
</script>

<style scoped>
h1#achieve {
  text-align: center;
  color: #FF8F00;
  font-size: 2.4em;
}

h1.time {
  display: inline-block;
  font-size: 2.8em;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
