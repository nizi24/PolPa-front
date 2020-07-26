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
        @click="select(item.name)"
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
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    select (itemName) {
      this.$emit(`${itemName}`)
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

#tag-feed-selecter .v-list-item__icon {
  margin-right: 26px !important;
}
</style>
