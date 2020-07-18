<template>
  <v-dialog
  v-model="dialog"
  max-width="500"
  persistent
  >
    <v-card>
      <v-card-text>
        <v-row>
          <h3 style="margin-top: 40px; margin-left: 20px;">
            先週と同じ目標を設定しますか？
          </h3>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn
        color="blue darken-1"
        text
        @click="reuse"
        >OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  props: {
    dialog: {
      type: Boolean
    },
    prevWeeklyTarget: {
      type: Object
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    reuse () {
      const target_time = this.prevWeeklyTarget.target_time //eslint-disable-line
      axios
        .post(`/v1/users/${this.currentUser.id}/weekly_target`, {
          target_time
        })
        .then((res) => {
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: '今週の目標を設定しました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
          this.$emit('addTarget', res.data.weekly_target)
          this.$emit('close')
        })
    }
  }
}
</script>
