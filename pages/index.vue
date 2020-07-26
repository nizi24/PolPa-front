<template>
<v-container>
  <v-row>
    <v-col cols="3">
      <FeedSideMenu
      @timeline="displayTimeline"
      @tagFeed="displayTagFeed"
      />
    </v-col>
    <v-col cols="6">
      <Timeline v-if="timeline" />
      <TagFeed v-if="tagFeed" />
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
import TagFeed from '../components/organisms/feed/TagFeed.vue'
import FeedSideMenu from '../components/organisms/feed/FeedSideMenu.vue'
import MiniUserExperienceCard from '../components/organisms/feed/MiniUserExperienceCard.vue'
import ExperienceRanking from '../components/organisms/feed/ExperienceRanking.vue'
export default {
  components: {
    FeedSideMenu,
    Timeline,
    TagFeed,
    MiniUserExperienceCard,
    ExperienceRanking
  },
  data () {
    return {
      timeline: true,
      tagFeed: false
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
    },
    displayTagFeed () {
      this.tagFeed = true
      this.timeline = false
    }
  }
}
</script>

<style>
#right-side {
  padding-right: 0 !important;
}
</style>
