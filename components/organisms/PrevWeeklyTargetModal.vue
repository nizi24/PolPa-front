<template>
  <v-dialog
  v-model="dialog"
  max-width="500"
  transition="scroll-x-transition"
  persistent
  >
    <ReuseWeeklyTarget
    :prevWeeklyTarget="prevWeeklyTarget"
    :dialog="reuse"
    @close="reuse = false"
    @addTarget="addTarget"
    />
    <WeeklyTargetCard
    :weeklyTarget="prevWeeklyTarget"
    @reuseWeeklyTarget="reuseWeeklyTarget"
    />
  </v-dialog>
</template>

<script>
import WeeklyTargetCard from './WeeklyTargetCard.vue'
import ReuseWeeklyTarget from './ReuseWeeklyTarget.vue'
export default {
  components: {
    ReuseWeeklyTarget,
    WeeklyTargetCard
  },
  props: {
    prevWeeklyTargetModal: {
      type: Boolean
    },
    prevWeeklyTarget: {
      required: true
    }
  },
  data () {
    return {
      dialog: this.prevWeeklyTarget,
      reuse: false
    }
  },
  watch: {
    prevWeeklyTargetModal (newValue) {
      this.dialog = newValue
    }
  },
  methods: {
    reuseWeeklyTarget () {
      this.dialog = false
      this.reuse = true
    },
    addTarget (weeklyTarget) {
      this.$emit('addTarget', weeklyTarget)
    }
  }
}
</script>

<style scoped>
h1#achieve {
  text-align: center;
  color: #FF8F00;
  font-size: 2.4em;
}

h1.time {
  display: inline-block;
  font-size: 2.8em;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
