<template>
  <div>
  </div>
</template>

<script>
// なぜかトランスコンパイルされないのでモックを作成しました

export default {
  props: {
    timeReports: {
      type: Array,
      required: true
    }
  },
  computed: {
    // timeReportを日付ごとにグループ化して返す
    entries () {
      const entries = this.timeReports.map((value) => {
        return {
          counting: value.experience_point,
          created_at: value.created_at.split('T')[0]
        }
      })
      const group = entries.reduce((result, current) => {
        const element = result.find((pre) => {
          return pre.created_at === current.created_at
        })
        if (element) {
          element.counting += current.counting
        } else {
          result.push({
            counting: current.counting,
            created_at: current.created_at
          })
        }
        return result
      }, [])
      return group
    }
  }
}
</script>
