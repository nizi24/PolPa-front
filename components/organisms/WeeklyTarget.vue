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
    <v-col cols="8" style="padding-left: 0 !important">
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
    />
    </v-col>
  </v-row>
  <v-row
  v-if="Object.keys(weeklyTarget).length === 0"
  justify="center"
  >
    <v-spacer />
    <v-col cols="10" style="padding-top: 0 !important">
      まだ設定していません。
    </v-col>
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
    weeklyTarget: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      displayTargetForm: false
    }
  },
  computed: {
    paramsUserId () {
      return Number(this.$route.params.id)
    }
  }
}
</script>
