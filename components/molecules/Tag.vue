<template>
  <nuxt-link
  :to="toLink"
  style="color: inherit; text-decoration: none;"
  v-if="tag.name"
  >
    <v-chip
      class="ma-2"
      color="#FFA000"
      label
      text-color="white"
    >
      <v-icon x-small style="margin-right: 10px;">
        fas fa-tag
      </v-icon>
      <span style="padding-bottom: 4px;">{{ tag.name }}</span>
    </v-chip>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  computed: {
    toLink () {
      return `/tags/${this.tag.id}`
    }
  }
}
</script>
