<template>
  <v-container class="comment-container">
    <v-card class="comment-card mx-auto" width="600px">
      <v-card-title>
        <v-avatar size="40" class="comment-avatar">
          <img v-if="comment.user.avatar_url" :src="comment.user.avatar_url" />
          <img v-else src="~/assets/default_icon.jpeg" />
        </v-avatar>
        <v-avatar size="30" class="comment-avatar-mobile">
          <img v-if="comment.user.avatar_url" :src="comment.user.avatar_url" />
          <img v-else src="~/assets/default_icon.jpeg" />
        </v-avatar>
        <nuxt-link :to="toUserLink" class="no-link-style">
          <span class="comment-user-name">
            {{ comment.user.name }}
          </span>
          <small class="comment-screen-name">
            @{{ comment.user.screen_name }}
          </small>
        </nuxt-link>
        <v-spacer />
        <IconButtonWithAuth
        type="far fa-trash-alt"
        :comparison="comment.user_id"
        style="margin-right: 10px;"
        @click="deleteComment"
        small
        />
      </v-card-title>
      <v-card-text>
        <v-row>
          {{ comment.content }}
        </v-row>
        <v-row>
          <v-spacer />
          <LikeButton
          :objectId="comment.id"
          objectType="Comment"
          :likesCount="comment.likes_count"
          @destroyLike="subCount"
          @addLiked="addCount"
          />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import LikeButton from '../../molecules/LikeButton.vue'
import axios from '@/plugins/axios'
import firebase from '@/plugins/firebase'
export default {
  components: {
    LikeButton
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    toUserLink () {
      return `/users/${this.comment.user.id}`
    }
  },
  methods: {
    deleteComment () {
      const confirm = window.confirm('削除しますか？') // eslint-disable-line
      if (confirm) {
        const commentId = this.comment.id
        const user = firebase.auth().currentUser
        if (user) {
          const that = this
          user.getIdToken(true).then(function (idToken) {
            const config = {
              headers: {
                Authorization: `Bearer ${idToken}`
              }
            }
            axios
              .delete(`/v1/comments/${commentId}`, config)
              .then((res) => {
                that.$emit('deleteComment', commentId)
                that.$store.commit('drawing/setFlash', {
                  status: true,
                  type: 'success',
                  message: 'コメントを削除しました'
                })
                setTimeout(() => {
                  that.$store.commit('drawing/setFlash', {})
                }, 2000)
              })
          })
        }
      }
    },
    subCount () {
      this.$emit('subCommentLikesCount', this.comment.id)
    },
    addCount () {
      this.$emit('addCommentLikesCount', this.comment.id)
    }
  }
}
</script>

<style scoped>
.no-link-style {
  color: inherit;
  text-decoration: none;
}

.comment-card {
  padding: 20px;
  margin: 20px;
}

.comment-avatar {
  display: inline-block;
}

.comment-avatar-mobile {
  display: none;
}

.comment-user-name {
  margin-left: 15px;
}

.comment-screen-name {
  color: #BDBDBD;
  margin-left: 10px;
}

@media (max-width: 480px) {
  .comment-card {
    padding: 10px;
    margin: 10px;
  }

  .comment-container {
    padding: 0px 0px 5px 0px !important;
  }

  .comment-avatar {
    display: none;
  }

  .comment-avatar-mobile {
    display: inline-block;
  }

  .comment-user-name {
    font-size: 1.0em;
    margin-left: 10px;
  }

  .comment-screen-name {
    font-size: 0.8em;
    margin-left: 5px;
  }
}
</style>
