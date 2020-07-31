<template>
  <div>
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
      v-if="btnDisplay"
      id="time-report-button"
    >
      時間を記録する
    </v-btn>
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
      v-if="btnDisplay"
      id="time-report-button-mobile"
      small
    >
      時間を記録する
    </v-btn>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >
      <EditTimeReport
      v-if="editInitialValue"
      :editInitialValue="editInitialValue"
      :initStudyDateHours="initStudyDateHours"
      :initStudyDateMinutes="initStudyDateMinutes"
      @closeModal="closeModal"
      @updateTimeReport="updateTimeReport"
      />
      <AddTimeReport
      v-else
      @closeModal="closeModal"
      />
    </v-dialog>
  </div>
</template>

<script>
import AddTimeReport from './AddTimeReport.vue'
import EditTimeReport from './EditTimeReport.vue'

export default {
  components: {
    AddTimeReport,
    EditTimeReport
  },
  props: {
    btnDisplay: {
      type: Boolean,
      default: true
    },
    modalDisplay: {
      type: Boolean,
      default: false
    },
    editInitialValue: {
      type: Object
    },
    initStudyDateHours: {
      type: String
    },
    initStudyDateMinutes: {
      type: String
    }
  },
  data () {
    return {
      dialog: this.modalDisplay
    }
  },
  methods: {
    closeModal () {
      this.dialog = false
      this.$emit('closeModal')
    },
    updateTimeReport (data) {
      this.$emit('updateTimeReport', data)
    }
  },
  watch: {
    modalDisplay (newValue) {
      this.dialog = newValue
    }
  }
}
</script>

<style scoped>
#time-report-button {
  display: inline-block;
}

#time-report-button-mobile {
  display: none;
}

@media (max-width: 480px) {

  #time-report-button {
    display: none;
  }

  #time-report-button-mobile {
    display: inline-block;
  }
}
</style>
