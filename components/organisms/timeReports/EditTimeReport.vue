<template>
  <TimeReportForm
  :editInitialValue="editInitialValue"
  :initStudyDateHours="initStudyDateHours"
  :initStudyDateMinutes="initStudyDateMinutes"
  @record="editTimeReport"
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
  props: {
    editInitialValue: {
      type: Object,
      required: true
    },
    initStudyDateHours: {
      type: String
    },
    initStudyDateMinutes: {
      type: String
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    editTimeReport (data) {
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
            .patch(`/v1/time_reports/${data.timeReport.id}`, {
              time_report: data.timeReport,
              user_id: that.currentUser.id,
              tags: data.tags
            }, config)
            .then((res) => {
              that.$emit('closeModal')
              that.$emit('updateTimeReport', res.data)
              that.$store.commit('experience/setExperience', res.data.experience)
              that.$store.commit('drawing/setFlash', {
                status: true,
                type: 'success',
                message: '記録を変更しました'
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
