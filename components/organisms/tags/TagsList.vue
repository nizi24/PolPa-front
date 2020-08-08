<template>
  <v-container v-if="tags" class="tag-container">
    <v-row justify="center">
      <v-col style="padding-bottom: 0 !important">
        <v-icon style="color: #FFB300; margin-right: 5px;" small>
          fas fa-tags
        </v-icon>
        <span
        class="tag-list-title"
        >{{ title }}</span>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
      class="tag-col"
      v-if="tags.length && tags[0].name"
      >
        <Tag
        v-for="tag in tags"
        :key="tag.name"
        :tag="tag"
        />
      </v-col>
      <v-col
      style="padding-top: 0 !important;"
      v-else
      >
        <span>{{ nonTagMessage }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    nonTagMessage: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.tag-container {
  padding: 20px;
}

.tag-col {
  padding-top: 0 !important;
}

.tag-list-title {
  font-size: 1.0em;
  color: #FFB300;
  font-weight: bold;
  vertical-align: -10%;
}

@media (max-width: 480px) {
  .tag-container {
    padding: 5px 15px;
  }

  .tag-col {
    padding-bottom: 4px !important;
  }
}
</style>
