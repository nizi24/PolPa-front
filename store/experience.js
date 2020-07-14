export const state = () => ({
  experienceRecord: {},
  experience: {},
  requiredExp: {}
})

export const mutations = {
  setExperience (state, payload) {
    state.experience = payload
    state.experience = {}
  },
  setRequiredExp (state, payload) {
    state.requiredExp = payload
    state.requiredExp = {}
  }
}
