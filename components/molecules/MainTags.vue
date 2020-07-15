<template>
  <v-container>
    <v-row justify="center">
      <v-spacer />
      <v-col cols="10" style="padding-bottom: 0 !important">
        <v-icon style="color: #FFB300; margin-right: 5px;" small>
          fas fa-tags
        </v-icon>
        <span
        style="font-size: 1.0em; color: #FFB300; font-weight: bold"
        >主な使用タグ</span>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-spacer />
      <v-col cols="10" style="padding-top: 0 !important;">
        <Tag
        v-for="tag in mainTags"
        :key="tag.name"
        :tag="tag.name"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tag from './Tag.vue'
export default {
  components: {
    Tag
  },
  props: {
    mainTags: {
      type: Array,
      required: true
    }
  }
}
</script>
