<template>
<v-container>
  <v-row justify="center">
    <v-col lg="3" sm="8" cols="12">
      <FeedSideMenu
      @timeline="displayTimeline"
      @tagFeed="displayTagFeed"
      @newest="displayNewest"
      />
    </v-col>
    <v-col lg="6" cols="12">
      <Timeline v-if="timeline && currentUser" />
      <TagFeed v-if="tagFeed && currentUser" />
      <Newest v-if="newest || !currentUser" />
    </v-col>
    <v-col lg="3" sm="8" cols="12" id="right-side">
      <MiniUserExperienceCard
      v-if="currentUser"
      :user="currentUser"
      />
      <ExperienceRanking
      style="margin-top: 20px;"
      />
      <adsbygoogle ad-slot="2714915879" />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import Timeline from '../components/organisms/feed/Timeline.vue'
import TagFeed from '../components/organisms/feed/TagFeed.vue'
import Newest from '../components/organisms/feed/Newest.vue'
import FeedSideMenu from '../components/organisms/feed/FeedSideMenu.vue'
import MiniUserExperienceCard from '../components/organisms/feed/MiniUserExperienceCard.vue'
import ExperienceRanking from '../components/organisms/feed/ExperienceRanking.vue'
export default {
  components: {
    FeedSideMenu,
    Timeline,
    TagFeed,
    Newest,
    MiniUserExperienceCard,
    ExperienceRanking
  },
  data () {
    return {
      timeline: true,
      tagFeed: false,
      newest: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    displayTimeline () {
      this.timeline = true
      this.tagFeed = false
      this.newest = false
    },
    displayTagFeed () {
      this.tagFeed = true
      this.timeline = false
      this.newest = false
    },
    displayNewest () {
      this.newest = true
      this.tagFeed = false
      this.timeline = false
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
#right-side {
  padding-right: 0 !important;
}
</style>
