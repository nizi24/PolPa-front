<template>
<v-container>
  <LoginFormModal
  :auth="auth"
  :email="prevEmail"
  @closeModal="auth = false"
  @authSuccess="authSuccess"
  />
  <v-row>
    <v-col cols="3">
      <UserSettingSideMenu />
    </v-col>
    <v-col cols="7">
      <v-card style="padding: 20px;">
        <v-card-title id="setting-title">
          <h4>アカウント</h4>
        </v-card-title>
        <v-form>
          <SettingTextField
          v-model="email"
          rules="email|max:255|required"
          label="メールアドレス"
          icon="far fa-envelope"
          :disabled="disabled"
          @on="authDisplayEmail"
          />
          <SettingTextField
          v-model="screenName"
          hint="ユーザーIDには半角英数字とアンダーバーが使用できます。他のユーザーと重複することはできません。"
          :rules="{ min: 5, max: 15, regex: /^[a-z0-9_]+$/i }"
          label="ユーザーID"
          icon="far fa-id-badge"
          :disabled="disabled"
          @on="updateScreenName"
          />
          <ValidationObserver ef="obs" v-slot="{ passes }">
            <div class="input-block">
              <v-row>
                <v-col cols="4" class="input-label-block">
                  <v-icon small>fas fa-key</v-icon>
                  <span class="input-label">パスワード</span>
                  <span style="margin-left: 10px;">
                    <Hint
                    explanation="再認証には変更前のパスワードが必要です。"
                    class="hint"
                    />
                  </span>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="6">
                  <VTextFieldWithValidation
                  v-model="password"
                  rules="required|min:6"
                  label="パスワード"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  />
                  <VTextFieldWithValidation
                  v-model="passwordConfirm"
                  rules="required|min:6|confirmed:パスワード"
                  label="パスワードの確認"
                  :type="show2 ? 'text' : 'password'"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show2 = !show2"
                  />
                </v-col>
                <v-col cols="6">
                  <v-btn
                  @click="passes(authDisplayPassword)"
                  color="primary"
                  depressed
                  id="password-btn"
                  :disabled="disabled"
                  >変更</v-btn>
                </v-col>
                <v-spacer />
              </v-row>
            </div>
          </ValidationObserver>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import axios from '@/plugins/axios'
import firebase from '@/plugins/firebase'
import Hint from '~/components/molecules/Hint.vue'
import VTextFieldWithValidation from '~/components/molecules/inputs/VTextFieldWithValidation.vue'
import LoginFormModal from '~/components/organisms/setting/LoginFormModal.vue'
import UserSettingSideMenu from '~/components/organisms/setting/UserSettingSideMenu.vue'
import SettingTextField from '~/components/organisms/setting/SettingTextField.vue'

export default {
  components: {
    Hint,
    UserSettingSideMenu,
    VTextFieldWithValidation,
    LoginFormModal,
    SettingTextField
  },
  data () {
    return {
      disabled: false,
      auth: false,
      screenName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      prevEmail: '',
      show1: false,
      show2: false,
      emailFlag: false,
      passwordFlag: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    authSuccess () {
      if (this.emailFlag) {
        this.emailFlag = false
        this.updateEmail()
      } else if (this.passwordFlag) {
        this.passwordFlag = false
        this.updatePassword()
      }
    },
    updateEmail () {
      const user = firebase.auth().currentUser
      user.updateEmail(this.email).then(() => {
        axios
          .patch(`/v1/users/${this.currentUser.id}`, {
            user: { email: this.email }
          })
          .then((res) => {
            this.$store.commit('drawing/setLoading', false)
            this.prevEmail = res.data.user.email
            this.$store.commit('drawing/setFlash', {
              status: true,
              type: 'success',
              message: 'メールアドレスを変更しました'
            })
            setTimeout(() => {
              this.$store.commit('drawing/setFlash', {})
            }, 2000)
          }).catch(() => {
            this.$store.commit('drawing/setLoading', false)
          })
      }).catch(() => {
        this.$store.commit('drawing/setLoading', false)
      })
    },
    updateScreenName () {
      axios
        .patch(`/v1/users/${this.currentUser.id}`, {
          user: { screen_name: this.screenName }
        })
        .then((res) => {
          this.prevEmail = res.data.user.email
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: 'ユーザーIDを変更しました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        }).catch(() => {
        })
    },
    updatePassword () {
      const user = firebase.auth().currentUser
      user.updatePassword(this.password).then(() => {
        this.$store.commit('drawing/setLoading', false)
        this.$store.commit('drawing/setFlash', {
          status: true,
          type: 'success',
          message: 'パスワードを変更しました'
        })
        setTimeout(() => {
          this.$store.commit('drawing/setFlash', {})
        }, 2000)
      }).catch(() => {
        this.$store.commit('drawing/setLoading', false)
      })
    },
    authDisplayPassword () {
      this.auth = true
      this.passwordFlag = true
    },
    authDisplayEmail () {
      this.auth = true
      this.emailFlag = true
    }
  },
  mounted () {
    this.disabled = true
    setTimeout(() => {
      if (this.currentUser.id) {
        axios
          .get(`/v1/users/${this.currentUser.id}/edit`)
          .then((res) => {
            this.email = res.data.user.email
            this.prevEmail = res.data.user.email
            this.screenName = res.data.user.screen_name
          })
      }
      this.disabled = false
    }, 1000)
  }
}
</script>

<style scoped>
#setting-title {
  border-bottom: 1px solid #e8e8e8;
}

.input-block {
  margin-left: 20px;
  margin-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e8e8e8;
}

.input-label-block {
  padding-bottom: 0px !important;
}

.input-label {
  color: #555555;
  margin-left: 4px;
  vertical-align: -5%;
}

#password-btn {
  vertical-align: -450%;
}
</style>
