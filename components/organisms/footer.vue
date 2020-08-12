<template>
  <v-footer
  :absolute="true"
  :app="true"
  color="#33692E"
  id="footer"
  >
    <v-row justify="center">
      <v-col class="footer-list" cols="3" lg="1" sm="2">
        <n-link to="/about" class="no-link">About</n-link>
      </v-col>
      <v-col class="footer-list" cols="3" lg="1" sm="2">
        <n-link to="/contact" class="no-link">お問い合わせ</n-link>
      </v-col>
      <v-col class="footer-list" cols="3" lg="1" sm="2">
        <n-link to="/rules" class="no-link">利用規約</n-link>
      </v-col>
      <v-col class="footer-list" id="privacy" cols="3" lg="2" sm="3">
        <n-link to="/privacy" class="no-link">プライバシーポリシー</n-link>
      </v-col>
      <v-col cols="12" id="copy-light-col">
        <span id="copy-light">&copy; 2020 polpa All Rights Reserved.</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    fixed: false
  })
}
</script>

<style scoped>
.no-link {
  color: inherit;
  text-decoration: none;
}

#copy-light, .footer-list {
  color: white;
}

.footer-list {
  text-align: center;
  font-size: 0.9em;
}

#copy-light-col {
  text-align: center;
}

#privacy {
  padding: 12px 0px;
}

@media (max-width: 480px) {
  .footer-list {
    padding: 6px !important;
    font-size: 0.6em;
  }

  #copy-light-col {
    padding: 0px;
    font-size: 0.8em;
  }
}
</style>
