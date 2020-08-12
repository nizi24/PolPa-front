<template>
  <nuxt-link
  :to="toLink"
  style="color: inherit; text-decoration: none;"
  v-if="tag.name"
  >
    <v-chip
      class="ma-2 tag-chip"
      color="#FFA000"
      label
      text-color="white"
    >
      <v-icon x-small style="margin-right: 10px;">
        fas fa-tag
      </v-icon>
      <span class="tag-name">{{ nameShortening }}</span>
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
    },
    nameShortening () {
      const name = this.tag.name
      return name.length > 20 ? name.slice(0, 20) + '…' : name
    }
  }
}
</script>

<style scoped>
.tag-name {
  padding-bottom: 4px;
}
</style>
