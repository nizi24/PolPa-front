<template>
  <ValidationObserver ef="obs" v-slot="{ passes }">
    <v-card class="mx-auto mt-5 pa-5" width="500px">
      <v-card-title>
        <h1 class="signup-title">新規登録</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <VTextFieldWithValidation
          v-model="name"
          rules="max:20|required"
          :counter="20"
          label="名前"
          />
          <VTextFieldWithValidation
          v-model="email"
          rules="max:255|required|email"
          label="メールアドレス"
          />
          <VTextFieldWithValidation
          v-model="password"
          rules="required|min:6"
          label="パスワード"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          vid="password"
          />
          <VTextFieldWithValidation
          v-model="passwordConfirm"
          rules="required|min:6|confirmed:パスワード"
          label="パスワードの確認"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
          />
          <div id="signup-note">
            <n-link to="/rules">
              利用規約
            </n-link>
            及び
            <n-link to="/privacy">
              プライバシーポリシー
            </n-link>
            に同意の上ご利用ください。
          </div>
          <v-row justify="center">
            <v-btn
            color="primary"
            class="mx-auto signup-btn"
            @click="passes(signup)"
            >登録</v-btn>
          </v-row>
          <v-divider />
          <div id="guest-login-title">ゲストログイン</div>
          <div>
            ゲストでログインしてPolPaの機能を試すことができます。
          </div>
          <div id="guest-login-note">
            ※ゲストアカウントは他のユーザーと共有です。<br />
            ※一部機能を制限しています。<br />
            ※投稿が削除される恐れがあるため、お試しとしてご利用ください。
          </div>
          <v-row justify="center">
            <v-btn
            color="primary"
            class="mx-auto"
            @click="guestLogin"
            >ゲストログイン</v-btn>
          </v-row>
          <p v-if="error" class="errors">{{error}}</p>
        </v-form>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { setUser } from '../plugins/auth-check.js'
import VTextFieldWithValidation from '~/components/molecules/inputs/VTextFieldWithValidation.vue'
import axios from '@/plugins/axios'
import firebase from '@/plugins/firebase'
export default {
  components: {
    VTextFieldWithValidation
  },
  data () {
    return {
      email: '',
      name: '',
      screen_name: '',
      password: '',
      passwordConfirm: '',
      show1: false,
      show2: false,
      error: ''
    }
  },
  methods: {
    signup () {
      this.$store.commit('drawing/setLoading', true)
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          const user = {
            email: res.user.email,
            name: this.name,
            screen_name: this.screen_name,
            uid: res.user.uid
          }
          axios.post('/v1/users', { user }).then((responce) => {
            setUser(responce.data, this.$store)
            this.$store.commit('drawing/setLoading', false)
            this.$store.commit('drawing/setFlash', {
              status: true,
              type: 'success',
              message: 'ログインしました'
            })
            setTimeout(() => {
              this.$store.commit('drawing/setFlash', {})
            }, 2000)
            this.$store.commit('setUser', responce.data)
            this.$store.commit('setLiked', [])
            setTimeout(() => {
              this.$router.push('/')
            }, 200)
          })
            .catch(() => {
              this.$store.commit('drawing/setLoading', false)
            })
        })
        .catch((error) => {
          this.error = ((code) => {
            this.$store.commit('drawing/setLoading', false)
            switch (code) {
              case 'auth/email-already-in-use':
                return '既にそのメールアドレスは使われています'
              case 'auth/wrong-password':
                return '※パスワードが正しくありません'
              case 'auth/weak-password':
                return '※パスワードは最低6文字以上にしてください'
              default:
                return '※メールアドレスとパスワードをご確認ください'
            }
          })(error.code)
        })
    },
    guestLogin () {
      firebase
        .auth()
        .signInWithEmailAndPassword('guest@example.com', 'password')
        .then((res) => {
          setUser(res.user, this.$store)
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: 'ゲストでログインしました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
          setTimeout(() => {
            this.$router.push('/')
          }, 200)
        })
    }
  },
  fetch ({ redirect, store }) {
    if (store.state.currentUser) {
      return redirect('/')
    }
  }
}
</script>

<style scoped>
.signup-title {
  font-weight: normal;
  font-size: 1.4em;
}

#signup-note {
  padding: 10px 0px 15px 0px;
}

a {
  text-decoration: none;
}

.signup-btn {
  margin-bottom: 20px;
}

#guest-login-title {
  padding: 20px 0px;
  font-size: 1.6em;
}

#guest-login-note {
  padding: 10px 0px 30px 0px;
  font-size: 0.8em;
}

.errors {
  color: red;
  margin-top: 20px;
}
</style>
