<template>
  <v-row class="user-item">
    <v-col cols="1" class="avatar-col">
      <v-avatar
      size="30"
      class="user-avatar"
      >
        <img
        v-if="user.avatar_url"
        :src="user.avatar_url"
        >
        <img
        v-else
        src="~/assets/default_icon.jpeg"
        />
      </v-avatar>
    </v-col>
    <v-col
    cols="7"
    class="profile-col"
    style="padding-right: 0 !important"
    >
      <n-link :to="UserLink" style="color: inherit; text-decoration: none;">
        <div class="user-name">{{ user.name }}</div>
        <div class="user-screen-name">@{{ user.screen_name }}</div>
        <div class="user-profile">{{ user.profile }}</div>
      </n-link>
    </v-col>
    <v-col cols="2" class="follow-button-col">
      <FollowButton
      :userId="user.id"
      :iconOnly="true"
      class="follow-button"
      />
    </v-col>
    <v-col
    cols="2"
    style="padding-left: 2px !important; padding-right: 2px !important"
    >
      <div class="user-exp">
        <UserLevel :level="experience.level" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import UserLevel from '../atoms/UserLevel.vue'
import FollowButton from './FollowButton.vue'
export default {
  components: {
    FollowButton,
    UserLevel
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    experience: {
      type: Object,
      required: true
    }
  },
  computed: {
    UserLink () {
      return `/users/${this.user.id}`
    }
  }
}
</script>

<style scoped>
.user-item {
  border-bottom: 1px solid #e8e8e8;
}

.user-avatar {
  vertical-align: -140%;
}

.user-name {
  display: inline-block;
  font-size: 0.9em;
}

.user-screen-name {
  margin-left: 5px;
  display: inline-block;
  font-size: 0.8em;
  color: #666666;
}

.user-profile {
  font-size: 0.9em;
}

.follow-button {
  margin-top: 5px;
}

.user-exp {
  font-size: 1.4em;
  margin-top: 10px;
  font-weight: bold;
}

@media (max-width: 480px) {

  .avatar-col {
    padding-left: 0 !important;
  }

  .profile-col {
    padding-left: 6px !important;
  }

  .follow-button-col {
    padding-left: 2px !important;
    padding-right: 6px !important;
  }

  .user-exp {
    font-size: 1.0em;
  }

  .user-name {
    font-size: 0.8em;
  }

  .user-screen-name {
    margin-left: 2px;
    font-size: 0.7em;
  }

  .user-profile {
    font-size: 0.8em;
  }
}
</style>
