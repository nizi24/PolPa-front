<template>
  <ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors, valid }">
    <v-file-input
      @change="selectedFile"
      :error-messages="errors"
      :success="valid"
      :rules="fileRules"
      v-bind="$attrs"
      v-on="$listeners"
    ></v-file-input>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    fileRules: {
      type: Array
    },
    rules: {
      type: [String, Object]
    },
    value: {
      type: null
    }
  },
  data: () => ({
    uploadFile: ''
  }),
  watch: {
    uploadFile (newVal) {
      this.$emit('change', newVal)
    },
    value (newVal) {
      this.uploadFile = newVal
    }
  },
  methods: {
    selectedFile () {
      if (event.target.files) {
        const files = event.target.files || event.dataTransfer.files
        this.uploadFile = files[0]
      } else {
        this.uploadFile = []
      }
    }
  }
}
</script>
