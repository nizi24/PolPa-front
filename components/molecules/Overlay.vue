<template>
<div
v-if="overlay"
@click="close"
id="overlay"
></div>
</template>

<script>
export default {
  computed: {
    overlay () {
      return this.$store.state.drawing.overlay
    }
  },
  methods: {
    close () {
      return this.$store.commit('drawing/setOverlay', false)
    }
  }
}
</script>

<style>
#overlay {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
}
</style>
