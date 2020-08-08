<template>
  <v-card id="search-card">
    <v-row justify="center">
      <v-col sm="10" cols="12">
        <v-tabs grow v-model="tab">
          <v-tab
          v-for="item in items"
          :key="item.tab"
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col lg="8" sm="10" cols="11">
        <h3 v-if="items[tab]" class="search-title">
          {{ items[tab].tab }}を検索する
        </h3>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <UserSearch />
          </v-tab-item>
          <v-tab-item>
            <TagsSearch />
          </v-tab-item>
          <v-tab-item>
            <TimeReportSearch
            @addTimeReports="addTimeReports"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col lg="10">
        <TimeReportsWithPagination
        :time_reports="displayTimeReports"
        :newTimeReport="newTimeReport"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import UserSearch from '../components/organisms/search/UserSearch.vue'
import TagsSearch from '../components/organisms/search/TagsSearch.vue'
import TimeReportSearch from '../components/organisms/search/TimeReportSearch.vue'
import TimeReportsWithPagination from '../components/organisms/timeReports/TimeReportsWithPagination.vue'
export default {
  components: {
    UserSearch,
    TagsSearch,
    TimeReportSearch,
    TimeReportsWithPagination
  },
  data () {
    return {
      tab: null,
      items: [
        { tab: 'ユーザー' },
        { tab: 'タグ' },
        { tab: '学習記録' }
      ],
      displayTimeReports: [],
      timeReports: [],
      newTimeReport: {}
    }
  },
  methods: {
    addTimeReports (result) {
      this.displayTimeReports = result
      this.timeReports = result
    }
  },
  watch: {
    tab () {
      if (this.tab !== 2) {
        this.displayTimeReports = []
      } else {
        this.displayTimeReports = this.timeReports
      }
    }
  }
}
</script>

<style scoped>
#search-card {
  margin: 0 auto;
  max-width: 800px;
}

.search-title {
  margin-left: 10px;
  font-weight: normal;
  font-size: 1.4em;
}

.v-text-field {
  padding: 10px;
}
</style>
