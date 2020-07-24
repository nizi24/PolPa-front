<template>
  <div>
    <CommentForm
    :timeReportId="timeReportId"
    @addComment="addComment"
    />
    <Comment
    v-for="comment in comments"
    :key="comment.id"
    :comment="comment"
    @deleteComment="deleteComment"
    @addCommentLikesCount="addCommentLikesCount"
    @subCommentLikesCount="subCommentLikesCount"
    />
  </div>
</template>

<script>
import CommentForm from './CommentForm.vue'
import Comment from './Comment.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    CommentForm,
    Comment
  },
  props: {
    timeReportId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      comments: []
    }
  },
  methods: {
    addComment (comment) {
      this.$emit('closeField')
      this.comments.unshift(comment)
    },
    deleteComment (commentId) {
      this.comments = this.comments.filter((t) => {
        return t.id !== commentId
      })
    },
    subCommentLikesCount (commentId) {
      this.comments = this.comments.map((c) => {
        if (c.id === commentId) {
          c.likes_count -= 1
        }
        return c
      })
    },
    addCommentLikesCount (commentId) {
      this.comments = this.comments.map((c) => {
        if (c.id === commentId) {
          c.likes_count += 1
        }
        return c
      })
    }
  },
  mounted () {
    axios.get(`/v1/time_reports/${this.timeReportId}/comments`)
      .then((res) => {
        this.comments = res.data
      })
  }
}
</script>
