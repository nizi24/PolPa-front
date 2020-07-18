<template>
<v-container>
  <v-row justify="center">
    <v-spacer />
    <v-col
    cols="2"
    style="padding-bottom: 0 !important; padding-right: 0 !important"
    >
      <v-icon style="color: #FFB300; margin-right: 5px" small>
        fas fa-dumbbell
      </v-icon>
      <span
      style="font-size: 1.0em;
      color: #FFB300; font-weight: bold; vertical-align: -10%"
      >今週の目標</span>
    </v-col>
    <v-col
    cols="8"
    style="padding-left: 0 !important"
    v-if="!weeklyTarget"
    >
      <IconButtonWithAuth
      type="fas fa-stopwatch"
      :comparison="paramsUserId"
      :icon="false"
      color="primary"
      text
      small
      style="padding-left: 0 !important"
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
    <v-col cols="8" v-else>
      <span
      style="font-size: 1.0em;
      color: #FFB300; font-weight: bold; vertical-align: -10%"
      >{{ weekly }}</span>
    </v-col>
  </v-row>
  <v-row
  justify="center"
  >
    <v-spacer />
    <v-col
    cols="10"
    style="padding-top: 0 !important"
    v-if="!weeklyTarget"
    >
      まだ設定していません。
    </v-col>
    <template v-else>
      <v-col cols="7">
        <v-progress-linear height="10px" :value="weeklyTargetProgress">
        </v-progress-linear>
      </v-col>
      <v-col cols="3" style="padding-top: 6px; color: #B0BEC5;">
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
    weekly () {
      const start = this.weeklyTarget.start_date
        .replace(/^\d{4}-0?(\d{1,2})-(\d{2})/, '$1月$2日').split('T')[0]
      const end = this.weeklyTarget.end_date
        .replace(/^\d{4}-0?(\d{1,2})-(\d{2})/, '$1月$2日').split('T')[0]
      return start + ' ~ ' + end
    },
    weeklyTargetProgress () {
      const progressDate = new Date(this.weeklyTarget.progress)
      const progress = progressDate.getHours() * 60 +
        progressDate.getMinutes()
      const targetDate = new Date(this.weeklyTarget.target_time)
      const target = targetDate.getHours() * 60 +
        targetDate.getMinutes()
      const proportion = progress / target * 100
      if (proportion === 100) {
        return 0
      } else {
        return proportion
      }
    },
    progressTime () {
      const progress = new Date(this.weeklyTarget.progress)
      const minute = progress.getMinutes().toString().replace(/^(\d)$/, '0$1')
      return progress.getHours() + ':' + minute
    },
    targetTime () {
      const targetTime = new Date(this.weeklyTarget.target_time)
      const minute = targetTime.getMinutes().toString().replace(/^(\d)$/, '0$1')
      return targetTime.getHours() + ':' + minute
    }
  },
  methods: {
    addTarget (data) {
      this.weeklyTarget = data
    }
  },
  mounted () {
    setInterval(() => {
    }, 300000)
  }
}
</script>
