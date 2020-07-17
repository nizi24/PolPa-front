<template>
  <div>
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
      v-if="btnDisplay"
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
