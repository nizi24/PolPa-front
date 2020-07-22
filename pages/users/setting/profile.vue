<template>
<v-container>
  <v-row>
    <v-col cols="3">
      <UserSettingSideMenu />
    </v-col>
    <v-col cols="7">
      <v-card>
        <v-card-title>
          <h4>プロフィール</h4>
        </v-card-title>
        <v-form>
          <VTextFieldWithValidation
          v-model="profile"
          label="プロフィール"
          />
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import axios from '@/plugins/axios'
import VTextFieldWithValidation from '~/components/molecules/inputs/VTextFieldWithValidation.vue'
import UserSettingSideMenu from '~/components/organisms/setting/UserSettingSideMenu.vue'
export default {
  components: {
    UserSettingSideMenu,
    VTextFieldWithValidation
  },
  data () {
    return {
      profile: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  mounted () {
    axios
      .get(`/v1/users/${this.currentUser.id}/edit`)
      .then((res) => {
      })
  }
}
</script>
