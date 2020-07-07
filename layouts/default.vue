<template>
  <v-app style="background-color: #F1F8E9">
    <Flash />
    <Loading />
    <LevelUpModal />
    <Header />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '~/components/organisms/Header.vue'
import Footer from '~/components/organisms/Footer.vue'
import Loading from '~/components/molecules/Loading.vue'
import Flash from '~/components/molecules/Flash.vue'
import LevelUpModal from '~/components/organisms/LevelUpModal.vue'

export default {
  components: {
    Header,
    Footer,
    Loading,
    Flash,
    LevelUpModal
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
