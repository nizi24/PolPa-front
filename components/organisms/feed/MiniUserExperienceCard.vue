<template>
  <v-card>
    <v-card-title style="padding-bottom: 0 !important">
      <v-col cols="3">
        <v-avatar
        size="40"
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
      <v-col cols="8">
        <v-row>
          <span id="user-name">{{ nameShortening }}</span>
        </v-row>
        <v-row>
          <span id="user-screen-name">@{{ user.screen_name }}</span>
        </v-row>
      </v-col>
    </v-card-title>
    <v-card-text style="padding-right: 3px;">
      <v-row>
        <v-col cols="6" id="user-level-cols">
          <UserLevel :level="user.level" id="user-level" />
        </v-col>
        <v-col cols="6" id="user-total-experience-cols">
          <UserTotalExperience
          :level="user.level"
          :totalExperience="user.total_experience"
          />
        </v-col>
      </v-row>
      <ExperienceProgressLinear
      :requiredExp="currentUser.required_exp.required_exp"
      :experienceToNext="currentUser.experience_to_next"
      :leftBlank="0"
      :progressLinear="9"
      :progressFraction="3"
      :progressProportionPaddingSideNone="true"
      style="margin-top: 10px;"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import UserLevel from '../../atoms/UserLevel.vue'
import ExperienceProgressLinear from '../../molecules/ExperienceProgressLinear.vue'
export default {
  components: {
    UserLevel,
    ExperienceProgressLinear
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    nameShortening () {
      const name = this.user.name
      return name.length > 8 ? name.slice(0, 8) + '…' : name
    }
  },
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'experience/setExperience') {
        this.$store.commit('setTotalExperience', mutation.payload.total_experience)
        this.$store.commit('setExperienceToNext', mutation.payload.experience_to_next)
      } else if (mutation.type === 'experience/setRequiredExp') {
        this.$store.commit('setRequiredExp', mutation.payload)
      }
    })
  }
}
</script>

<style>
span#user-name {
  font-size: 0.8em;
}

span#user-screen-name {
  font-size: 0.5em;
  font-weight: normal;
  color: #666666;
}

#user-level {
  font-size: 1.6em;
}

#user-level-cols {
  padding-right: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #e8e8e8;
}

#user-total-experience-cols {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #e8e8e8;
}
</style>
