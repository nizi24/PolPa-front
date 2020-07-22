<template>
<v-card>
  <v-list dense style="padding: 10px;">
    <v-subheader>MENU</v-subheader>
    <v-list-item-group v-model="item" color="primary">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        :id="item.id"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</v-card>
</template>

<script>
export default {
  data () {
    return {
      item: 1,
      items: [
        {
          text: 'プロフィール',
          icon: 'far fa-address-card',
          to: '/users/setting/profile',
          id: 'profile'
        },
        {
          text: 'アカウント',
          icon: 'fas fa-user-circle',
          to: '/users/setting/account'
        },
        {
          text: '通知',
          icon: 'far fa-bell',
          to: '/users/setting/notice'
        }
      ]
    }
  }
}
</script>

<style>
.no-link-style {
  color: inherit !important;
  text-decoration: none;
  display: flex;
  width: 100%;
}

#profile .v-list-item__icon {
  margin-right: 29px !important;
}
</style>
