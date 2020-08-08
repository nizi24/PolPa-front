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
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      axios
        .patch(`/v1/users/${this.currentUser.id}/update_avatar`, formData, config)
        .then((res) => {
          const user = JSON.parse(res.data.user)
          this.$store.commit('setAvatarUrl', user.avatar_url)
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: 'アイコン画像を変更しました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        })
    },
    updateProfile () {
      const user = {
        name: this.name,
        profile: this.profile
      }
      axios.patch(`/v1/users/${this.currentUser.id}`, { user })
        .then((res) => {
          this.$store.commit('setProfile', res.data.user.profile)
          this.$store.commit('setName', res.data.user.name)
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: 'プロフィールを変更しました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        })
    },
    selectedFile (newVal) {
      this.avatar = newVal
    }
  },
  mounted () {
    this.disabled = true
    const that = this
    const wait = (sec) => {
      return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000)
      })
    }
    async function mount () {
      try {
        if (!that.currentUser.id) {
          await wait(1)
        }
        axios
          .get(`/v1/users/${that.currentUser.id}/edit`)
          .then((res) => {
            that.name = res.data.user.name
            that.profile = res.data.user.profile
            that.disabled = res.data.user.guest
          })
      } catch {
        that.disabled = true
      }
    }
    mount()
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
