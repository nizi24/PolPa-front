<template>
  <div>
    <v-row justify="center">
      <v-col cols="6">
        <v-row justify="center">
          <span>フォロー</span>
        </v-row>
        <v-row justify="center">
          <h3>{{ followingCount }}</h3>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row justify="center">
          <span>フォロワー</span>
        </v-row>
        <v-row justify="center">
          <h3>{{ followerCount }}</h3>
        </v-row>
      </v-col>
      <v-row justify="center">
        <v-col cols="5" v-if="currentUser && Number(paramsUserId) !== currentUser.id">
          <FollowButton
          :userId="Number(paramsUserId)"
          @addFollower="$emit('addFollower')"
          @subFollower="$emit('subFollower')"
          />
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import FollowButton from './FollowButton.vue'
export default {
  components: {
    FollowButton
  },
  props: {
    followingCount: {
      type: Number,
      required: true
    },
    followerCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    paramsUserId () {
      return this.$route.params.id
    }
  }
}
</script>
