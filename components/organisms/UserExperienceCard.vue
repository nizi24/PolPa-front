<template>
  <v-card>
    <v-row style="padding: 20px;">
      <v-col cols="6" :class="changeColor">
        <v-row justify="center">
          <h1>Lv.{{ user.level }}</h1>
        </v-row>
        <v-row justify="center">
          <span>current Level</span>
        </v-row>
      </v-col>
      <v-col cols="6" :class="changeColor">
        <v-row justify="center">
          <h1>{{ user.total_experience }}</h1>
        </v-row>
        <v-row justify="center">
          <span>Total EXP</span>
        </v-row>
      </v-col>
    </v-row>
    <ExperienceProgressLinear
    v-if="Object.keys(user).length && requiredExp.required_exp"
    :requiredExp="requiredExp.required_exp"
    :experienceToNext="user.experience_to_next"
    style="padding-bottom: 10px;"
    />
    <WeeklyTarget
    v-if="user.target_of_the_week"
    :target="user.target_of_the_week[0]"
    />
    <Heatmap :timeReports="timeReports" />
  </v-card>
</template>

<script>
import ExperienceProgressLinear from '../molecules/ExperienceProgressLinear.vue'
import Heatmap from '~/components/molecules/Heatmap.vue'
import WeeklyTarget from '~/components/organisms/WeeklyTarget.vue'
export default {
  components: {
    ExperienceProgressLinear,
    Heatmap,
    WeeklyTarget
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    requiredExp: {
      type: Object,
      required: true
    },
    timeReports: {
      type: Array,
      required: true
    }
  },
  computed: {
    changeColor () {
      const level = this.user.level
      if (level >= 100) {
        return 'amber--text text--darken-4'
      } else if (level >= 80) {
        return 'amber--text text--darken-3'
      } else if (level >= 50) {
        return 'amber--text text--darken-2'
      } else if (level >= 20) {
        return 'amber--text text--lighten-1'
      } else {
        return 'amber--text text--lighten-2'
      }
    }
  }
}
</script>
