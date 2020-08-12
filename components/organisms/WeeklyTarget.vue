<template>
<v-container id="container">
  <v-row justify="center">
    <v-col lg="1" id="spacer-col"></v-col>
    <v-col
    lg="2"
    sm="3"
    cols="4"
    id="dumbbell"
    >
      <v-icon id="dumbbell-icon" small>
        fas fa-dumbbell
      </v-icon>
      <span
      id="weekly-target-span"
      >今週の目標</span>
    </v-col>
    <v-col
    lg="8"
    cols="6"
    class="weekly-target-btn-col"
    v-if="!weeklyTarget"
    >
      <IconButtonWithAuth
      type="fas fa-stopwatch"
      :comparison="paramsUserId"
      :icon="false"
      color="primary"
      text
      small
      class="weekly-target-btn"
      @click="displayTargetForm = !displayTargetForm"
      >
      <span>設定する</span>
    </IconButtonWithAuth>
    <WeeklyTargetForm
    :dialog="displayTargetForm"
    @closeTargetForm="displayTargetForm = false"
    @addTarget="addTarget"
    />
    </v-col>
    <v-col lg="7" cols="6" id="weekly-col" v-else>
      <span
      id="weekly"
      >{{ weekly }}</span>
    </v-col>
    <v-spacer class="spacer" />
  </v-row>
  <v-row
  justify="center"
  >
    <v-col
    lg="10"
    sm="9"
    cols="11"
    style="padding-top: 0 !important; margin-left: 38px;"
    v-if="!weeklyTarget"
    >
      まだ設定していません。
    </v-col>
    <template v-else>
      <v-col sm="1" id="spacer-one-col"></v-col>
      <v-col lg="8" cols="8" id="progress-linear">
        <v-progress-linear height="10px" :value="weeklyTargetProgress">
        </v-progress-linear>
      </v-col>
      <v-col
      lg="2"
      cols="3"
      id="weekly-target-fraction"
      >
        {{ progressTime }}/{{ targetTime }}
      </v-col>
    </template>
  </v-row>
</v-container>
</template>

<script>
import IconButtonWithAuth from '../atoms/icons/IconButtonWithAuth.vue'
import WeeklyTargetForm from './WeeklyTargetForm.vue'

export default {
  components: {
    IconButtonWithAuth,
    WeeklyTargetForm
  },
  props: {
    target: {
      required: true
    }
  },
  data () {
    return {
      weeklyTarget: this.target,
      displayTargetForm: false
    }
  },
  watch: {
    target (newValue) {
      this.weeklyTarget = newValue
    }
  },
  computed: {
    paramsUserId () {
      return Number(this.$route.params.id)
    },
    currentUser () {
      return this.$store.state.currentUser
    },
    weekly () {
      const start = this.weeklyTarget.start_date
        .replace(/^\d{4}-0?(\d{1,2})-(\d{2})/, '$1月$2日').split('T')[0]
      const end = this.weeklyTarget.end_date
        .replace(/^\d{4}-0?(\d{1,2})-(\d{2})/, '$1月$2日').split('T')[0]
      return start + ' ~ ' + end
    },
    weeklyTargetProgress () {
      const progressDate = new Date(this.weeklyTarget.progress)
      const progress = ((progressDate.getDate() - 1) * 24 + progressDate.getHours()) * 60 + progressDate.getMinutes()
      const targetDate = new Date(this.weeklyTarget.target_time)
      const target = ((targetDate.getDate() - 1) * 24 + targetDate.getHours()) *
      60 + targetDate.getMinutes()
      const proportion = progress / target * 100
      return proportion
    },
    progressTime () {
      const progress = new Date(this.weeklyTarget.progress)
      const hour = (progress.getDate() - 1) * 24 + progress.getHours()
      const minute = progress.getMinutes().toString().replace(/^(\d)$/, '0$1')
      return hour + ':' + minute
    },
    targetTime () {
      const targetTime = new Date(this.weeklyTarget.target_time)
      const hour = (targetTime.getDate() - 1) * 24 + targetTime.getHours()
      const minute = targetTime.getMinutes().toString().replace(/^(\d)$/, '0$1')
      return hour + ':' + minute
    }
  },
  methods: {
    addTarget (data) {
      this.weeklyTarget = data
    }
  }
}
</script>

<style scoped>
#weekly-target-fraction {
  padding-top: 6px;
  color: #B0BEC5;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

#dumbbell {
  padding-bottom: 0 !important;
  padding-right: 0 !important;
}

#dumbbell-icon {
  color: #FFB300;
  margin-right: 5px;
}

span#weekly-target-span {
  font-size: 1.0em;
  color: #FFB300;
  font-weight: bold;
  vertical-align: -10%;
}

#weekly {
  font-size: 1.0em;
  color: #FFB300;
  font-weight: bold;
  vertical-align: -10%;
}

#weekly-col {
  margin-right: 80px;
}

#progress-linear {
  padding-left: 0 !important;
}

.weekly-target-btn-col {
  padding-left: 0 !important;
}

.weekly-target-btn {
  padding-left: 0 !important;
}

.spacer {
  display: none;
}

@media (max-width: 1024px) {
  #spacer-col {
    display: none;
  }
}

@media (max-width: 480px) {

  #dumbbell {
    padding-top: 0 !important;
    padding-left: 20px;
    margin-left: 0;
  }

  #spacer-one-col {
    display: none;
  }

  .weekly-target-btn-col {
    padding: 0 !important;
  }

  #container {
    padding: 0 !important;
  }

  #dumbbell-icon {
    margin-top: 2px;
  }

  #weekly {
    font-size: 0.8em;
  }

  #weekly-col {
    padding: 0 !important;
    margin-right: 0;
  }

  span#weekly-target-span {
    font-size: 0.8em;

  }

  .spacer {
    display: inline-block;
  }

  #progress-linear {
    padding: 12px 6px !important;
    vertical-align: -20%;
  }

  #weekly-target-fraction {
    font-size: 0.8em;
    padding-top: 7px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
    padding-bottom: 20px !important;
  }
}
</style>
