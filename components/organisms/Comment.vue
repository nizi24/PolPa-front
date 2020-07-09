<template>
  <v-container>
    <v-card class="mx-auto mt-5 pa-5" width="600px">
      <v-card-title>
        <v-avatar size="40">
          <img src="~/assets/default_icon.jpeg" />
        </v-avatar>
        <span style="margin-left: 15px;">
          {{ comment.user.name }}
        </span>
      <small style="color: #BDBDBD; margin-left: 10px">
        @{{ comment.user.screen_name }}
      </small>
      <v-spacer />
      </v-card-title>
      <v-card-text>
        {{ comment.content }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    comment: {
      comment: {
        type: Object,
        required: true
      }
    }
  }
}
</script>
