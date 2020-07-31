<template>
  <v-dialog
      v-model="levelUp"
      max-width="500"
      transition="scroll-x-transition"
    >
      <v-card>
        <v-card-title style="color: #FFD54F;">
          <h1 id="level-up">Level UP!!</h1>
          <v-icon x-large style="color: #FFD54F;">
            fas fa-level-up-alt
          </v-icon>
        </v-card-title>

        <v-card-text id="level-up-card-text">
          <h1 id="current-level">
            Lv.{{ level }}
          </h1>
          <p id="level-up-message">レベルがあがりました！この調子で頑張ろう！</p>
        </v-card-text>

        <v-card-actions id="level-up-card-actions">
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="levelUp = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  data: () => ({
    levelUp: false,
    level: 1
  }),
  mounted () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'experience/setExperience') {
        const level = mutation.payload.level
        if (level > this.$store.state.currentUser.level) {
          this.levelUp = true
          this.level = level
        }
        this.$store.commit('setLevel', level)
      }
    })
  }
}
</script>

<style scoped>
h1#level-up {
  font-size: 1.8em;
  margin-left: 140px;
  margin-right: 20px;
}

#level-up-card-text {
  margin-top: 40px;
}

h1#current-level {
  text-align: center;
  color: #FF8F00;
  font-size: 3.4em;
}

p#level-up-message {
  margin-top: 50px;
  text-align: center;
  font-size: 1.2em;
}

@media (max-width: 480px) {
  h1#level-up {
    font-size: 1.4em;
    margin-left: 70px;
  }

  #level-up-card-text {
    margin-top: 20px;
  }

  h1#current-level {
    font-size: 2.6em;
  }

  p#level-up-message {
    margin-top: 20px;
    font-size: 0.9em;
  }

  #level-up-card-actions {
    padding-top: 0 !important;
  }
}
</style>
