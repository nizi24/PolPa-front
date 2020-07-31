<template>
  <v-footer
    :absolute="!fixed"
    app
  >
    <span>&copy; 2020 polpa</span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    fixed: false
  })
}
</script>
