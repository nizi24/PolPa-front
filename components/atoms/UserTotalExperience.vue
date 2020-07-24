<template>
  <div :class="changeColor">
    <div>total</div>
    <span id="total-experience">
      {{ totalExperience }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      required: true
    },
    totalExperience: {
      type: Number,
      required: true
    }
  },
  computed: {
    changeColor () {
      const level = this.level
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

<style scoped>
span#total-experience {
  font-size: 1.6em;
}
</style>
