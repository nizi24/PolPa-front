<template>
  <v-container>
    <v-row justify="center">
      <v-spacer />
      <v-col cols="10" style="padding-bottom: 0 !important">
        <v-icon style="color: #FFB300; margin-right: 5px;" small>
          fas fa-tags
        </v-icon>
        <span
        style="font-size: 1.0em; color: #FFB300; font-weight: bold;
        vertical-align: -10%"
        >主な使用タグ</span>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="mainTags[0]">
      <v-spacer />
      <v-col
      cols="10"
      style="padding-top: 0 !important;"
      v-if="mainTags[0].count"
      >
        <Tag
        v-for="tag in mainTags"
        :key="tag.name"
        :tag="tag.name"
        />
      </v-col>
      <v-col
      cols="10"
      style="padding-top: 0 !important;"
      v-else
      >
        <span>まだタグがありません。</span>
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
