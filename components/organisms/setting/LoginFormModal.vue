<template>
  <v-dialog
  v-model="dialog"
  persistent
  max-width="500px"
  >
    <v-card width="500px" class="mx-auto">
      <v-card-title style="margin-bottom: 10px;">
        <h3>再認証</h3>
        <span style="margin-left: 10px;">
          <Hint
          explanation="重要なアカウント情報を変更するには再認証が必要です。"
          class="hint"
          />
        </span>
      </v-card-title>
      <v-card-text style="margin-bottom: 10px">
        <v-form>
          <VTextFieldWithValidation
          v-model="password"
          label="パスワード"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          vid="password"
          />
        </v-form>
      </v-card-text>
      <p v-if="error" class="errors" style="margin-left: 20px;">{{error}}</p>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal">Close</v-btn>
        <v-btn
        color="blue darken-1"
        text
        @click="login"
        >Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Hint from '~/components/molecules/Hint.vue'
import VTextFieldWithValidation from '~/components/molecules/inputs/VTextFieldWithValidation.vue'
import firebase from '@/plugins/firebase'
export default {
  components: {
    Hint,
    VTextFieldWithValidation
  },
  props: {
    auth: {
      type: Boolean,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      password: '',
      show1: false,
      error: '',
      dialog: this.auth
    }
  },
  watch: {
    auth (newValue) {
      this.dialog = newValue
    }
  },
  methods: {
    login () {
      this.$store.commit('drawing/setLoading', true)
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$emit('authSuccess')
          this.password = ''
          this.error = ''
          this.$emit('closeModal')
        })
        .catch((error) => {
          this.$store.commit('drawing/setLoading', false)
          this.error = ((code) => {
            switch (code) {
              case 'auth/wrong-password':
                return '※パスワードが正しくありません'
            }
          })(error.code)
        })
    },
    closeModal () {
      this.password = ''
      this.error = ''
      this.$emit('closeModal')
    }
  }
}

</script>

<style scoped>
.errors {
  color: red;
  margin-top: 20px;
}
</style>
