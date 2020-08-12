<template>
  <ValidationObserver ef="obs" v-slot="{ passes }">
    <div class="input-block">
      <v-row>
        <v-col lg="4" cols="6" class="input-label-block">
          <v-icon small>far fa-images</v-icon>
          <span class="input-label">アイコン画像</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" cols="11">
          <VFileInputWithValidation
          @change="selectedFile"
          :fileRules="rules"
          label="アイコン"
          accept="image/png, image/jpeg, image/bmp, image/gif, image/heic"
          placeholder="画像を選択してください"
          prepend-icon="mdi-camera"
          />
        </v-col>
        <v-spacer class="avatar-form-spacer" />
        <div class="setting-avatar-form-btn">
          <v-col lg="6" cols="4" class="input-btn-block">
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
        </div>
      </v-row>
      <v-row class="setting-avatar-form-btn-mobile">
        <v-col cols="8" sm="9" class="avatar-form-mobile-col" />
        <v-col cols="4" sm="3" class="avatar-form-mobile-col">
          <v-btn
          @click="passes(update)"
          color="primary"
          depressed
          :disabled="disabled"
          v-if="!btnHidden"
          >変更</v-btn>
        </v-col>
      </v-row>
    </div>
  </ValidationObserver>
</template>

<script>
import VFileInputWithValidation from '~/components/molecules/inputs/VFileInputWithValidation.vue'
export default {
  components: {
    VFileInputWithValidation
  },
  props: {
    btnHidden: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      required: true
    },
    value: {
      type: null
    }
  },
  data () {
    return {
      rules: [
        value => !value || value.size < 5000000 || '5MB以下の画像を選択してください。'
      ],
      innerValue: ''
    }
  },
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
    },
    selectedFile (newVal) {
      this.$emit('selectedFile', newVal)
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

.avatar-form-spacer {
  display: none;
}

.setting-avatar-form-btn {
  display: inline-block;
}

.setting-avatar-form-btn-mobile {
  display: none;
}

@media (max-width: 1024px) {

  .input-block {
    margin-left: 10px;
    margin-top: 10px;
    padding-bottom: 10px;
  }

  .avatar-form-spacer {
    display: inline-block;
  }

  .setting-avatar-form-btn-mobile {
    display: flex;
  }

  .setting-avatar-form-btn {
    display: none !important;
  }

  .avatar-form-mobile-col {
    padding: 0px 12px !important;
  }
}
</style>
