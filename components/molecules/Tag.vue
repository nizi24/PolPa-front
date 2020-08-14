<template>
  <nuxt-link
  :to="toLink"
  style="color: inherit; text-decoration: none;"
  v-if="tag.name"
  >
    <v-chip
      class="tag-chip"
      color="#FFA000"
      label
      text-color="white"
    >
      <v-icon x-small class="tag-icon">
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
    },
    miniTagDetail: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    toLink () {
      return `/tags/${this.tag.id}`
    },
    nameShortening () {
      const name = this.tag.name
      if (this.miniTagDetail) {
        return name.length > 10 ? name.slice(0, 10) + '…' : name
      } else {
        return name.length > 20 ? name.slice(0, 20) + '…' : name
      }
    }
  }
}
</script>

<style scoped>
.tag-chip {
  margin: 8px;
}

.tag-icon {
  margin-right: 10px;
  margin-bottom: 10px;
}

@media (max-width: 480px) {

  .tag-chip {
    padding: 0 8px !important;
  }

  .tag-icon {
    margin-left: 4px;
    margin-right: 4px;
  }

  .tag-name {
    font-size: 0.6em;
  }
}

@media (max-width: 320px) {

  .tag-chip {
    margin: 2px;
    padding: 0 4px !important;
  }

  .tag-name {
    font-size: 0.5em;
  }
}
</style>
