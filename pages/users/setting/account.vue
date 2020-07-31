<template>
<v-container>
  <LoginFormModal
  :auth="auth"
  :email="prevEmail"
  @closeModal="auth = false"
  @authSuccess="authSuccess"
  />
  <v-row id="account-row" justify="center">
    <v-col lg="3" sm="8" cols="12">
      <UserSettingSideMenu />
    </v-col>
    <v-col lg="7" sm="8" cols="12">
      <v-card id="accout-card">
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
                <v-col lg="4" cols="12" class="input-label-block">
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
              <v-row>
                <v-col lg="6" cols="12">
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
                <div class="password-update-btn">
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
                </div>
              </v-row>
              <v-row class="password-update-btn-mobile">
                <v-col cols="8" sm="9" class="password-update-mobile-col" />
                <v-col cols="4" sm="3" class="password-update-mobile-col">
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
          this.$store.commit('setScreenName', res.data.user.screen_name)
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: 'ユーザーIDを変更しました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        }).catch((err) => {
          console.error(err)
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
    const getter = () => {
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
    }
    if (this.currentUser.id) {
      getter()
    } else {
      setTimeout(getter, 1000)
    }
  },
  fetch ({ store, redirect }) {
    store.watch(
      state => state.currentUser,
      (newUser, oldUser) => {
        if (!newUser) {
          return redirect('/login')
        }
      }
    )
  }
}
</script>

<style scoped>
#accout-card {
  padding: 20px;
}

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

.password-update-btn {
  display: inline-block;
}

.password-update-btn-mobile {
  display: none;
}

@media (max-width: 1024px) {
  #accout-card {
    padding: 10px;
  }

  .password-update-btn {
    display: none;
  }

  .password-update-btn-mobile {
    display: flex;
  }

  .password-update-mobile-col {
    padding: 0px 12px !important;
  }

  .input-block {
    margin-left: 10px;
    margin-top: 10px;
    padding-bottom: 10px;
  }
}

</style>
