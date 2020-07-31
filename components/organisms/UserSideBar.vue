<template>
  <v-card id="user-side-bar">
    <v-row justify="center">
      <v-avatar size="70">
        <img
        v-if="user.avatar_url"
        :src="user.avatar_url"
        />
        <img
        v-else
        src="~/assets/default_icon.jpeg"
        />
      </v-avatar>
    </v-row>
    <v-row justify="center" id="user-name">
      <h3>{{ user.name }}</h3>
    </v-row>
    <v-row justify="center" id="user-screen-name">
      <span>@{{ user.screen_name }}</span>
    </v-row>
    <div id="user-profile" v-if="user.profile">
      <span>{{ user.profile }}</span>
    </div>
    <Relationship
    v-if="Object.keys(user).length"
    :followerCount="user.follower_count"
    :followingCount="user.following_count"
    @addFollower="user.follower_count++"
    @subFollower="user.follower_count--"
    />
  </v-card>
</template>

<script>
import Relationship from '../molecules/Relationship.vue'
export default {
  components: {
    Relationship
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
#user-side-bar {
  padding: 30px;
}

#user-name {
  padding-top: 15px;
  font-size: 1.0em;
}

#user-screen-name {
  color: #888888;
}

#user-profile {
  margin-top: 10px;
  padding: 10px;
  font-size: 0.8em;
  text-align: center;
}

@media (max-width: 480px) {
  #user-side-bar {
    padding: 20px;
  }
}
</style>
