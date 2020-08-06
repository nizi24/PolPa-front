<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" lg="6">
      <ValidationObserver ef="obs" v-slot="{ passes }">
        <v-card id="about-card">
          <v-card-title>
            <span id="about-card-title">お問い合わせ</span>
          </v-card-title>
          <v-card-subtitle>
            <div id="contact-subtitle">
              ご意見ご感想、フィードバックなどお気軽にお問い合わせください。<br />
              皆様からのご意見を参考に、より良いサイトになるよう改善します！
            </div>
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="input-col">
                <VTextFieldWithValidation
                v-model="name"
                label="名前"
                />
                <v-icon small>fas fa-info-circle</v-icon>
                <span>返信が必要な場合はメールアドレスをご記入ください</span>
                <VTextFieldWithValidation
                v-model="email"
                label="メールアドレス"
                rules="email|max:255"
                />
              </v-col>
              <v-col cols="12" class="input-col">
                <VTextAreaWithValidation
                v-model="message"
                label="お問い合わせ内容"
                rules="required"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
            color="primary"
            @click="passes(send)"
            >
            送信
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-col>
  </v-row>
</template>

<script>
import VTextFieldWithValidation from '~/components/molecules/inputs/VTextFieldWithValidation.vue'
import VTextAreaWithValidation from '~/components/molecules/inputs/VTextAreaWithValidation.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    VTextFieldWithValidation,
    VTextAreaWithValidation
  },
  data () {
    return {
      message: '',
      email: '',
      name: ''
    }
  },
  methods: {
    send () {
      const contact = {
        message: this.message,
        email: this.email,
        name: this.name
      }
      axios.post('/v1/contacts', { contact })
        .then((res) => {
          this.message = ' '
          this.email = ''
          this.name = ''
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: 'お問い合わせを受け付けました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        })
        .catch((err) => {
          console.error(err)
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'error',
            message: 'エラーが発生しました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        })
    }
  },
  head () {
    return {
      title: 'お問い合わせ - PolPa'
    }
  }
}
</script>

<style scoped>
#about-card {
  padding: 20px;
}

#contact-subtitle {
  padding-top: 20px;
}

#about-card-title {
  font-size: 1.4em;
}
</style>
