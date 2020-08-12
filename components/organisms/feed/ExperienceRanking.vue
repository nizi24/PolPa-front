<template>
  <v-card>
    <v-card-title>
      <v-icon small color="#ffc400">fas fa-trophy</v-icon>
      <span class="rank-title">獲得経験値ランキング</span>
    </v-card-title>
    <v-card-subtitle>
      <v-tabs grow v-model="tab">
        <v-tab
        v-for="item in items"
        :key="item.tab"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>
    </v-card-subtitle>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <WeeklyExperienceRanking />
        </v-tab-item>
        <v-tab-item>
          <MonthlyExperienceRanking />
        </v-tab-item>
        <v-tab-item>
          <AllExperienceRanking />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import WeeklyExperienceRanking from './WeeklyExperienceRanking.vue'
import MonthlyExperienceRanking from './MonthlyExperienceRanking.vue'
import AllExperienceRanking from './AllExperienceRanking.vue'
export default {
  components: {
    WeeklyExperienceRanking,
    MonthlyExperienceRanking,
    AllExperienceRanking
  },
  data () {
    return {
      tab: null,
      items: [
        { tab: '週間' },
        { tab: '月間' },
        { tab: '全て' }
      ]
    }
  }
}
</script>

<style scoped>
span.rank-title {
  font-size: 0.8em;
  padding-left: 5px;
}

.v-tab {
  min-width: 40px !important;
  font-size: 0.8em !important;
}
</style>
