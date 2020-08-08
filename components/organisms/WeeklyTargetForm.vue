<template>
  <v-dialog
  v-model="dialog"
  persistent
  max-width="600px"
  >
    <ValidationObserver ef="obs" v-slot="{ passes }">
      <v-card>
        <v-card-title id="weekly-target-form-card-title">
          <span
          class="headline"
          >今週の目標を設定する</span>
          <v-col cols="1" style="margin-left: 20px;">
            <Hint
            explanation="一度設定すると翌週になるまで変更できません。"
            />
          </v-col>
        </v-card-title>
        <v-form>
          <v-card-text id="weekly-target-form-card-text">
            <v-container>
              <v-row>
                <v-col lg="4" cols="6">
                  <VTextFieldWithValidation
                  rules="numeric|max_value:167|validTime:@分|required"
                  v-model="hour"
                  label="時"
                  />
                </v-col>
                <v-col lg="4" cols="6">
                  <VTextFieldWithValidation
                  rules="numeric|max_value:59|validTime:@時|required"
                  v-model="minute"
                  label="分"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeModal">Close</v-btn>
            <v-btn
            color="blue darken-1"
            text
            @click="passes(record)"
            >Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script>
import Hint from '../molecules/Hint.vue'
import VTextFieldWithValidation from '../molecules/inputs/VTextFieldWithValidation.vue'
import axios from '@/plugins/axios'

export default {
  components: {
    Hint,
    VTextFieldWithValidation
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hour: '3',
      minute: '0'
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeTargetForm')
    },
    record () {
      const hourNumber = Number(this.hour)
      let target_time //eslint-disable-line
      const day = Math.floor(hourNumber / 24)
      const hour = hourNumber % 24
      target_time = `2000-01-0${day + 1} ${hour}:${this.minute}` //eslint-disable-line
      axios
        .post(`/v1/users/${this.currentUser.id}/weekly_targets`, {
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
          this.$emit('closeTargetForm')
        })
    }
  }
}
</script>

<style scoped>
@media (max-width: 480px) {

  span.headline {
    font-size: 1.0em !important;
  }

  #weekly-target-form-card-title {
    padding-bottom: 0 !important;
  }

  #weekly-target-form-card-text {
    padding: 0 20px !important;
  }
}
</style>
