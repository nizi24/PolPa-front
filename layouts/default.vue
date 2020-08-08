<template>
  <v-app style="background-color: #F1F8E9;" id="app">
    <Flash />
    <Loading />
    <LevelUpModal />
    <Header />
    <Overlay />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '../components/organisms/header.vue'
import Footer from '../components/organisms/footer.vue'
import Loading from '../components/molecules/loading.vue'
import Overlay from '~/components/molecules/Overlay.vue'
import Flash from '~/components/molecules/Flash.vue'
import LevelUpModal from '~/components/organisms/LevelUpModal.vue'

export default {
  components: {
    Header,
    Footer,
    Loading,
    Flash,
    LevelUpModal,
    Overlay
  },
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'PolPa'
    }
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
