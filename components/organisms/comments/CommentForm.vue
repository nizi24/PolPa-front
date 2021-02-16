<template>
  <ValidationObserver ef="obs" v-slot="{ passes }">
      <VTextAreaWithValidation
      rules="max:280|required"
      :counter="280"
      label="コメント"
      v-model="comment"
      />
      <v-row>
        <v-spacer />
        <v-btn
        color="blue darken-1"
        text
        @click="passes(sendComment)"
        style="margin-top: 10px;"
        :disabled="!currentUser"
        >Send</v-btn>
      </v-row>
  </ValidationObserver>
</template>

<script>
import VTextAreaWithValidation from '../../molecules/inputs/VTextAreaWithValidation.vue'
import axios from '@/plugins/axios'
import firebase from '@/plugins/firebase'
export default {
  components: {
    VTextAreaWithValidation
  },
  props: {
    timeReportId: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    comment: ''
  }),
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    sendComment () {
      const comment = {
        content: this.comment,
        time_report_id: this.timeReportId
      }
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
            .post('/v1/comments', { comment }, config)
            .then((res) => {
              that.$emit('addComment', res.data)
              that.comment = ''
              that.$store.commit('drawing/setFlash', {
                status: true,
                type: 'success',
                message: 'コメントを投稿しました'
              })
              setTimeout(() => {
                that.$store.commit('drawing/setFlash', {})
              }, 2000)
            })
        })
      }
    }
  }
}
</script>
