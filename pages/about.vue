<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-card id="about-card">
        <v-card-title>
          <span id="about-card-title">PolPaについて</span>
        </v-card-title>
        <v-card-text>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head () {
    return {
      title: 'About - PolPa'
    }
  }
}
</script>

<style scoped>
#about-card {
  padding: 20px;
}

#about-card-title {
  font-size: 1.4em;
}
</style>
