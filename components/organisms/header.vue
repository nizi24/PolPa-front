<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
    style="background-color: #64DD17;"
    id="header"
  >
    <v-toolbar-title>
      <n-link to="/" style="color:white; text-decoration:none;">
        <h2 class="app-title">
          PolPa
        </h2>
      </n-link>
    </v-toolbar-title>
    <v-spacer />
    <n-link to="/search" style="text-decoration: none;">
      <v-icon style="color: white; margin-right: 20px;">
        fas fa-search
      </v-icon>
    </n-link>
    <v-btn
    v-if="!currentUser"
    to="/login"
    text
    color="white"
    id="login-btn"
    :outlined="true"
    >
      <h4>ログイン</h4>
    </v-btn>
    <v-btn
    v-if="!currentUser"
    to="/login"
    text
    color="white"
    :outlined="true"
    id="login-btn-mobile"
    small
    >
      <h4>ログイン</h4>
    </v-btn>
    <v-btn
    v-if="!currentUser"
    color="primary"
    to="/signup"
    id="signup-btn"
    >
      <span>新規登録</span>
    </v-btn>
    <v-btn
    v-if="!currentUser"
    color="primary"
    to="/signup"
    id="signup-btn-mobile"
    small
    >
      <span>新規登録</span>
    </v-btn>
    <NoticeField
    v-if="currentUser"
    />
    <v-menu
    v-model="value"
    :offset-y="true"
    :left="true"
    v-if="currentUser"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
        size="30"
        v-bind="attrs"
        v-on="on"
        >
          <img
          v-if="currentUser.avatar_url"
          :src="currentUser.avatar_url"
          >
          <img
          v-else
          src="~/assets/default_icon.jpeg"
          />
        </v-avatar>
      </template>
      <v-list
      :dense="true"
      width="200px"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          exact
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
      :dense="true"
      width="200px"
      >
        <v-list-item @click="logOut" key="logout">
          <v-list-item-title>ログアウト</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <TimeReportModal v-if="currentUser" id="time-report-modal" />
  </v-app-bar>
</template>

<script>
import NoticeField from '../molecules/notices/NoticeField.vue'
import TimeReportModal from './timeReports/TimeReportModal.vue'
import firebase from '@/plugins/firebase'

export default {
  components: {
    TimeReportModal,
    NoticeField
  },
  data () {
    return {
      value: false,
      clipped: true,
      item: 1
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    items () {
      const items = [
        {
          title: 'マイページ',
          to: `/users/${this.currentUser.id}`
        },
        {
          title: '設定',
          to: '/users/setting/profile'
        },
        {
          title: '目標の履歴',
          to: '/weekly_targets'
        }
      ]
      return items
    }
  },
  methods: {
    logOut () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('setUser', null)
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: 'ログアウトしました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
          this.$router.push('/login')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
h2.app-title {
  margin-left: 200px;
  font-size: 1.5em;
  letter-spacing: 2px;
}

.v-avatar {
  margin-right: 20px;
  margin-left: 20px;
}

#login-btn {
  margin-right: 20px;
}

#login-btn-mobile {
  display: none;
}

#signup-btn {
  margin-right: 200px;
  display: inline-block;
}

#signup-btn span {
  padding: 8px;
}

#signup-btn-mobile {
  display: none;
}

#time-report-modal {
  margin-right: 200px;
}

@media (max-width: 1024px) {
  h2.app-title {
    margin-left: 100px;
  }

  #time-report-modal {
    margin-right: 100px;
  }

  #signup-btn {
    margin-right: 100px;
  }
}

@media (max-width: 480px) {

  h2.app-title {
    margin-left: 0px;
    font-size: 1.3em;
  }

  .v-avatar {
    margin-right: 10px;
    margin-left: 10px;
  }

  #time-report-modal {
    margin-right: 10px;
  }

  #login-btn {
    display: none;
  }

  #login-btn-mobile {
    display: inline-block;
    margin-right: 10px;
  }

  #login-btn-mobile h4 {
    padding: 4px;
  }

  #signup-btn {
    display: none;
  }

  #signup-btn-mobile span {
    padding: 4px;
  }

  #signup-btn-mobile {
    margin-right: 10px;
    display: inline-block;
  }
}

@media (max-width: 320px) {
  .v-toolbar__content {
    padding: 4px !important;
  }

  #time-report-modal {
    margin-right: 0px;
  }
}
</style>

<style>
@media (max-width: 320px) {
  #header .v-toolbar__content {
    padding: 4px !important;
  }
}
</style>
