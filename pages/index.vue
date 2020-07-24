<template>
<v-container>
  <v-row>
    <v-col cols="3">
      <FeedSideMenu
      />
    </v-col>
    <v-col cols="6">
      <Timeline />
    </v-col>
    <v-col cols="3" id="right-side" v-if="currentUser">
      <MiniUserExperienceCard
      :user="currentUser"
      />
      <ExperienceRanking
      style="margin-top: 20px;"
      />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import Timeline from '../components/organisms/feed/Timeline.vue'
import FeedSideMenu from '../components/organisms/feed/FeedSideMenu.vue'
import MiniUserExperienceCard from '../components/organisms/feed/MiniUserExperienceCard.vue'
import ExperienceRanking from '../components/organisms/feed/ExperienceRanking.vue'
export default {
  components: {
    FeedSideMenu,
    Timeline,
    MiniUserExperienceCard,
    ExperienceRanking
  },
  data () {
    return {
      timeReport: 0,
      timeReports: []
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  }
}
</script>

<style>
#right-side {
  padding-right: 0 !important;
}
</style>
