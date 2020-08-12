<template>
  <v-row justify="center" align-content="center">
    <v-col id="left-blank" :lg="1" v-if="leftBlank">
    </v-col>
    <v-col :lg="progressLinear" cols="9" id="progress-linear">
      <v-progress-linear height="10px" :value="progressProportion">
      </v-progress-linear>
    </v-col>
    <v-col
    cols="2"
    :lg="progressFraction"
    :id="progressProportionStyle"
    class="progress-proportion"
    >
      {{ progressNumeretor }}/{{ requiredExp }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    requiredExp: {
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
      default: 8
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

.progress-proportion {
  padding-top: 6px;
  color: #B0BEC5;
}

@media (max-width: 480px) {

  #left-blank {
    display: none;
  }

  .progress-proportion {
    font-size: 0.8em;
    padding-left: 0 !important;
    padding-right: 4px !important;
  }

  #progress-linear {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }

  .progress-proportion {
    padding-top: 8px;
  }
}
</style>
