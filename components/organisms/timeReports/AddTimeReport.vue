<template>
  <TimeReportForm
  @record="addTimeReport"
  @closeModal="closeModal"
  >
  </TimeReportForm>
</template>

<script>
import TimeReportForm from './TimeReportForm.vue'
import axios from '@/plugins/axios'
import firebase from '@/plugins/firebase'

export default {
  components: {
    TimeReportForm
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    addTimeReport (data) {
      const user = firebase.auth().currentUser
      if (user) {
        const that = this
        user.getIdToken(true).then(function (idToken) {
          const config = {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          }
          axios
            .post('/v1/time_reports', {
              time_report: data.timeReport,
              user_id: that.currentUser.id,
              tags: data.tags
            }, config)
            .then((res) => {
              that.$emit('closeModal')
              const timeReport = JSON.parse(res.data.time_report)
              const experience = res.data.experience
              const requiredExp = res.data.required_exp
              const weeklyTarget = res.data.weekly_target
              that.$store.commit('timeReport/setTimeReport', timeReport)
              that.$store.commit('experience/setExperience', experience)
              that.$store.commit('experience/setRequiredExp', requiredExp)
              if (weeklyTarget) {
                that.$store.commit('setWeeklyTarget', weeklyTarget)
              }
              that.$store.commit('drawing/setFlash', {
                status: true,
                type: 'success',
                message: '時間を記録しました'
              })
              setTimeout(() => {
                that.$store.commit('drawing/setFlash', {})
              }, 2000)
            })
        })
      }
    },
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>
