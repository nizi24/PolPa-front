<template>
  <ValidationObserver ef="obs" v-slot="{ passes }">
    <div class="input-block">
      <v-row>
        <v-col lg="4" cols="12" class="input-label-block">
          <v-icon small v-if="icon">{{ icon }}</v-icon>
          <span class="input-label">{{ label }}</span>
          <span style="margin-left: 10px;">
            <Hint
            v-if="hint"
            :explanation="hint"
            class="hint"
            />
          </span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" class="setting-text-area">
          <VTextAreaWithValidation
          v-model="innerValue"
          :rules="rules"
          :label="label"
          v-bind="$attrs"
          />
        </v-col>
        <v-col cols="6" class="input-btn-block">
          <v-btn
          @click="passes(update)"
          color="primary"
          depressed
          style="margin-top: 30px;"
          :disabled="disabled"
          v-if="!btnHidden"
          >変更</v-btn>
        </v-col>
        <v-spacer />
      </v-row>
    </div>
  </ValidationObserver>
</template>

<script>
import VTextAreaWithValidation from '~/components/molecules/inputs/VTextAreaWithValidation.vue'
export default {
  components: {
    VTextAreaWithValidation
  },
  props: {
    rules: {
      type: [Object, String],
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    disabled: {
      type: Boolean,
      required: true
    },
    hint: {
      type: String
    },
    btnHidden: {
      type: Boolean,
      default: false
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
  },
  methods: {
    update () {
      this.$emit('on')
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
    margin-left: 10px;
    margin-top: 10px;
    padding-bottom: 10px;
  }

  .setting-text-area {
    padding-top: 0 !important;
  }
}
</style>
