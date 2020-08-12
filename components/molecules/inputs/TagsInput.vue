<template>
  <v-row>
    <v-col sm="1" cols="2" style="padding-right: 0 !important">
      <v-icon small class="tag-icon" style="color: #FFA000;">
        fas fa-tag
      </v-icon>
    </v-col>
    <v-col lg="11" cols="10" style="padding-left: 0 !important">
      <vue-tags-input
      v-model="tag"
      :tags="initTags"
      :allow-edit-tags="true"
      @tags-changed="newTags => tags = newTags"
      placeholder="タグを追加"
      :maxlength="50"
      :max-tags="10"
      />
    </v-col>
  </v-row>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
export default {
  components: {
    VueTagsInput
  },
  props: {
    value: {
      type: null
    },
    initTags: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      tag: '',
      tags: this.initTags
    }
  },
  watch: {
    tag (newVal) {
      this.$emit('input', newVal)
    },
    tags (newVal) {
      this.$emit('tags-changed', newVal)
    },
    value (newVal) {
      this.tag = newVal
    }
  },
  created () {
    if (this.value) {
      this.tag = this.value
    }
  }
}
</script>

<style>
.ti-tags {
  padding: 0 !important;
}

.ti-tag {
  background-color: #FFA000 !important;
}

.tag-icon {
  margin-top: 10px;
  color: #FFA000;
}

@media (max-width: 480px) {
  .tag-icon {
    margin-left: 10px;
  }
}
</style>
