export const state = () => ({
  loading: false,
  flash: {
    status: false,
    type: '',
    message: ''
  },
  overlay: false
})

export const mutations = {
  setLoading (state, payload) {
    state.loading = payload
  },
  setFlash (state, payload) {
    state.flash = payload
  },
  setOverlay (state, payload) {
    state.overlay = payload
  }
}
