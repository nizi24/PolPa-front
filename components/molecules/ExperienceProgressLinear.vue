<template>
  <v-row justify="center" align-content="center">
    <v-col :cols="leftBlank" v-if="leftBlank">
    </v-col>
    <v-col :cols="progressLinear">
      <v-progress-linear height="10px" :value="progressProportion">
      </v-progress-linear>
    </v-col>
    <v-col
    :cols="progressFraction"
    style="padding-top: 6px; color: #B0BEC5;"
    :id="progressProportionStyle"
    >
      {{ progressNumeretor }}/{{ requiredExp }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    requiredExp: {
      type: Number,
      required: true
    },
    experienceToNext: {
      type: Number,
      required: true
    },
    leftBlank: {
      type: Number,
      default: 1
    },
    progressLinear: {
      type: Number,
      default: 7
    },
    progressFraction: {
      type: Number,
      default: 2
    },
    progressProportionPaddingSideNone: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    progressProportion () {
      const proportion = 100 - this.experienceToNext / this.requiredExp * 100
      if (proportion === 100) {
        return 0
      } else {
        return proportion
      }
    },
    progressNumeretor () {
      return this.requiredExp - this.experienceToNext
    },
    progressProportionStyle () {
      if (this.progressProportionPaddingSideNone) {
        return 'progress-proportion'
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
#progress-proportion {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
