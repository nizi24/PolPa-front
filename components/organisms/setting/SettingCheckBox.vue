<template>
  <div class="input-block">
    <v-row>
      <v-col lg="4" cols="12" class="input-label-block">
        <v-icon small if="icon">{{ icon }}</v-icon>
        <strong class="input-label">{{ label }}</strong>
        <span style="margin-left: 10px;">
          <Hint
          v-if="hint"
          :explanation="hint"
          class="hint"
          />
        </span>
      </v-col>
    </v-row>
    <v-row>
      <span style="padding-left: 10px;">{{ explanation }}</span>
    </v-row>
    <v-row justify="center" style="padding-left: 10px;">
      <v-checkbox
      v-model="innerValue"
      :disabled="disabled"
      />
      <v-spacer />
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    explanation: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    hint: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    value: {
      type: null
    }
  },
  data: () => ({
    innerValue: ''
  }),
  watch: {
    innerValue (newVal) {
      this.$emit('input', newVal)
    },
    value (newVal) {
      this.innerValue = newVal
    }
  },
  created () {
    if (this.value) {
      this.innerValue = this.value
    }
  }
}
</script>

<style scoped>
.input-block {
  margin-left: 20px;
  margin-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e8e8e8;
}

.input-label-block {
  padding-bottom: 0px !important;
  padding-right: 0px !important;
}

.input-label {
  color: #555555;
  margin-left: 4px;
  vertical-align: -5%;
}

.input-btn-block {
  padding-top: 0 !important;
}

@media (max-width: 480px) {
  .input-block {
    margin-left: 10px !important;
    margin-top: 10px !important;
    padding-bottom: 10px !important;
  }
}
</style>
