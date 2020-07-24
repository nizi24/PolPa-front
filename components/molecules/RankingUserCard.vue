<template>
  <v-row class="ranking-user-item" justify="center">
    <v-col cols="1" style="margin-right: 4px;">
      <div v-if="[0, 1, 2].includes(index)">
        <v-icon v-if="index === 0" class="gold-medal">
          fas fa-medal
        </v-icon>
        <v-icon v-if="index === 1" class="silver-medal">
          fas fa-medal
        </v-icon>
        <v-icon v-if="index === 2" class="bronze-medal">
          fas fa-medal
        </v-icon>
      </div>
      <span v-else class="index">{{ index + 1 }}</span>
    </v-col>
    <v-col cols="2">
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
    cols="5"
    style="padding-left: 2px !important; padding-right: 2px !important"
    >
      <div class="user-name">{{ user.name }}</div>
      <div class="user-screen-name">@{{ user.screen_name }}</div>
    </v-col>
    <v-col
    cols="3"
    style="padding-left: 2px !important; padding-right: 2px !important"
    >
      <div class="user-exp amber--text text--darken-4">{{ user.exp }}</div>
      <div class="exp">exp</div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.ranking-index {
  vertical-align: middle;
}

.gold-medal {
  color: #ffc400;
  vertical-align: -70%;
  margin-right: 5px;
}

.silver-medal {
  color: #c9c9c9;
  vertical-align: -70%;
  margin-right: 5px;
}

.bronze-medal {
  color: #ac6d4d;
  vertical-align: -70%;
  margin-right: 5px;
}

.user-avatar {
  vertical-align: -140%;
}

.ranking-user-item {
  border-bottom: 1px solid #e8e8e8;
}

span.index {
  vertical-align: -60%;
  font-size: 1.4em;
  margin-left: 5px;
  margin-right: 5px;
}

div.user-name {
  font-size: 0.8em;
  font-weight: bold;
}

div.user-screen-name {
  font-size: 0.6em;
}

div.user-exp {
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
}

div.exp {
  font-size: 0.8em;
  text-align: center;
}
</style>
