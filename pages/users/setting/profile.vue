<template>
<v-container>
  <v-row justify="center">
    <v-col lg="3" sm="8" cols="12">
      <UserSettingSideMenu />
    </v-col>
    <v-col lg="7" sm="8" cols="12">
      <v-card id="profile-card">
        <v-card-title id="setting-title">
          <h4>プロフィール</h4>
        </v-card-title>
        <v-form>
          <ValidationObserver ef="obs" v-slot="{ passes }">
            <SettingAvatarForm
            @selectedFile="selectedFile"
            @on="uploadFile"
            :disabled="disabled"
            />
            <SettingTextField
            v-model="name"
            rules="required|max:20"
            label="名前"
            icon="fas fa-user-tag"
            :disabled="disabled"
            :btnHidden="true"
            />
            <SettingTextArea
            v-model="profile"
            label="プロフィール文"
            rules="max:160"
            icon="fas fa-user-edit"
            :disabled="disabled"
            :btnHidden="true"
            :counter="160"
            />
            <v-row justify="center">
              <v-btn
              style="margin-top: 20px;"
              @click="passes(updateProfile)"
              color="primary"
              depressed
              :disabled="disabled"
              >変更</v-btn>
            </v-row>
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
import SettingTextField from '~/components/organisms/setting/SettingTextField.vue'
import SettingTextArea from '~/components/organisms/setting/SettingTextArea.vue'
import SettingAvatarForm from '~/components/organisms/setting/SettingAvatarForm.vue'
import UserSettingSideMenu from '~/components/organisms/setting/UserSettingSideMenu.vue'
export default {
  components: {
    UserSettingSideMenu,
    SettingTextField,
    SettingTextArea,
    SettingAvatarForm
  },
  data () {
    return {
      avatar: '',
      name: '',
      profile: '',
      disabled: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    uploadFile () {
      const formData = new FormData()
      formData.append('avatar', this.avatar)
      const user = firebase.auth().currentUser
      if (user) {
        const that = this
        user.getIdToken(true).then(function (idToken) {
          const config = {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: `Bearer ${idToken}`
            }
          }
          axios
            .patch(`/v1/users/${that.currentUser.id}/update_avatar`, formData, config)
            .then((res) => {
              const user = JSON.parse(res.data.user)
              that.$store.commit('setAvatarUrl', user.avatar_url)
              that.$store.commit('drawing/setFlash', {
                status: true,
                type: 'success',
                message: 'アイコン画像を変更しました'
              })
              setTimeout(() => {
                that.$store.commit('drawing/setFlash', {})
              }, 2000)
            }).catch(() => {
              that.errorFlash()
            })
        })
      }
    },
    updateProfile () {
      const params = {
        name: this.name,
        profile: this.profile
      }
      const user = firebase.auth().currentUser
      if (user) {
        const that = this
        user.getIdToken(true).then(function (idToken) {
          axios.patch(`/v1/users/${that.currentUser.id}`, { user: params },
            {
              headers: {
                Authorization: `Bearer ${idToken}`
              }
            })
            .then((res) => {
              that.$store.commit('setProfile', res.data.user.profile)
              that.$store.commit('setName', res.data.user.name)
              that.$store.commit('drawing/setFlash', {
                status: true,
                type: 'success',
                message: 'プロフィールを変更しました'
              })
              setTimeout(() => {
                that.$store.commit('drawing/setFlash', {})
              }, 2000)
            }).catch(() => {
              that.errorFlash()
            })
        })
      }
    },
    selectedFile (newVal) {
      this.avatar = newVal
    },
    errorFlash () {
      this.$store.commit('drawing/setFlash', {
        status: true,
        type: 'error',
        message: 'エラーが発生しました'
      })
      setTimeout(() => {
        this.$store.commit('drawing/setFlash', {})
      }, 2000)
    }
  },
  mounted () {
    this.disabled = true
    const getter = () => {
      if (this.currentUser.id) {
        const user = firebase.auth().currentUser
        if (user) {
          const that = this
          user.getIdToken(true).then(function (idToken) {
            axios
              .get(`/v1/users/${that.currentUser.id}/edit`, {
                headers: {
                  Authorization: `Bearer ${idToken}`
                }
              }).then((res) => {
                that.name = res.data.user.name
                that.profile = res.data.user.profile
                that.disabled = res.data.user.guest
              })
          })
        }
      }
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
  },
  head () {
    return {
      title: 'プロフィール設定 - PolPa'
    }
  }
}
</script>

<style>
#setting-title {
  border-bottom: 1px solid #e8e8e8;
}

#profile-card {
  padding: 20px;
}

@media (max-width: 480px) {
  #profile-card {
    padding: 10px;
  }
}
</style>
