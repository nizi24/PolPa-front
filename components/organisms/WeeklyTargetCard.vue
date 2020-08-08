<template>
  <v-card>
    <v-card-title class="weekly-target-card-title">
      <h3 v-if="!nonTitle" id="prev-weekly-result">
        先週の結果
      </h3>
      <span class="weekly">{{ weekly }}</span>
    </v-card-title>

    <v-card-text class="weekly-target-card-text">
      <h1 v-if="weeklyTarget.achieve" class="achieve">
        目標達成！！
      </h1>
      <v-row class="weekly-target-result" justify="center">
        <v-col cols="6">
          <h3 style="text-align: center">目標</h3>
        </v-col>
        <v-col cols="6">
          <h3 style="text-align: center">報告時間</h3>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="6" class="target-time-col">
          <v-icon small class="dumbbell-icon">
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
        <v-col cols="6" class="progress-time-col">
          <v-icon small class="clock-icon">
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
      class="weekly-target-exp"
      v-if="weeklyTarget.weekly_target_experience_record"
      >
        <v-col lg="8" cols="10">
          <v-icon small style="margin-right: 10px">fas fa-pencil-alt</v-icon>
          <span>ボーナスEXP</span>
          <h1 :class="changeColor(progressHour, progressMinute)" class="time">
            {{
            weeklyTarget.weekly_target_experience_record.experience_point
            }}
          </h1>
          <h3 style="display: inline-block; margin-left: 5px;">EXP</h3>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="!nonActions">
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        text
        @click="$emit('reuseWeeklyTarget')"
      >
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    weeklyTarget: {
      type: Object,
      required: true
    },
    nonActions: {
      type: Boolean,
      default: false
    },
    nonTitle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    weekly () {
      const start = this.weeklyTarget.start_date
        .replace(/^\d{4}-0?(\d{1,2})-(\d{2})/, '$1月$2日').split('T')[0]
      const end = this.weeklyTarget.end_date
        .replace(/^\d{4}-0?(\d{1,2})-(\d{2})/, '$1月$2日').split('T')[0]
      return start + ' ~ ' + end
    },
    progressHour () {
      const time = new Date(this.weeklyTarget.progress)
      return time.getHours() + (time.getDate() - 1) * 24
    },
    progressMinute () {
      const time = new Date(this.weeklyTarget.progress)
      return time.getMinutes()
    },
    targetHour () {
      const time = new Date(this.weeklyTarget.target_time)
      return time.getHours() + (time.getDate() - 1) * 24
    },
    targetMinute () {
      const time = new Date(this.weeklyTarget.target_time)
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
    }
  }
}
</script>

<style scoped>
.weekly-target-card-title {
  color: #FFD54F;
}

.weekly-target-card-text {
  margin-top: 40px;
}

.weekly {
  font-size: 0.8em;
  margin-left: 30px;
}

h1.achieve {
  text-align: center;
  color: #FF8F00;
  font-size: 2.4em;
}

.weekly-target-result {
  margin-top: 30px;
}

h1.time {
  display: inline-block;
  font-size: 2.8em;
  margin-left: 5px;
  margin-right: 5px;
}

.dumbbell-icon {
  margin-left: 30px;
  margin-right: 10px;
}

.clock-icon {
  margin-left: 30px;
  margin-right: 10px;
}

.weekly-target-exp {
  margin-top: 30px;
}

@media (max-width: 480px) {

  #prev-weekly-result {
    padding-right: 20px;
  }

  .weekly-target-card-title {
    padding-bottom: 0 !important;
  }

  .weekly-target-card-text {
    margin-top: 0px;
  }

  .weekly {
    margin-left: 0px;
  }

  h1.achieve {
    padding-top: 6px;
    text-align: center;
    color: #FF8F00;
    font-size: 1.8em;
  }

  .weekly-target-result {
    margin-top: 20px;
  }

  .dumbbell-icon {
    margin-left: 0px;
    margin-right: 3px;
  }

  .clock-icon {
    margin-left: 10px;
    margin-right: 3px;
  }

  h1.time {
    display: inline-block;
    font-size: 2.2em;
    margin-left: 0px;
    margin-right: 0px;
  }

  .target-time-col {
    padding-left: 0 !important;
    padding-right: 6px !important;
  }

  .progress-time-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .weekly-target-exp {
    margin-top: 0px;
  }
}
</style>
