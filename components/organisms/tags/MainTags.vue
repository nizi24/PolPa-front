<template>
  <TagsList
  title="主な使用タグ"
  :tags="mainTags"
  nonTagMessage="まだタグがありません。"
  >
  </TagsList>
</template>

<script>
import TagsList from './TagsList.vue'
export default {
  components: {
    TagsList
  },
  props: {
    mainTags: {
      type: Array,
      required: true
    }
  }
}
</script>
