import UsersId from '../../mocks/pages/UsersId.vue'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

// 本当のコンポーネントを使用していません
describe('ユーザーページ', () => {
  let store
  let vuetify
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
    vuetify = new Vuetify()
    wrapper = shallowMount(UsersId, { localVue, store })
  })

  it.skip('経験値をアップデートできること', () => {
    const data = {
      experience: {
        level: 2,
        total_experience: 100
      },
      required_exp: {
        experience_to_next: 4
      }
    }
    wrapper.vm.updateExperience(data)
    expect(wrapper.emitted().updateExperience).toBeTruthy()
    expect(wrapper.vm.user).toEqual(data.experience)
    expect(wrapper.vm.required_exp).toEqual(data.required_exp)
  })

  it('特定のタイムレポートを消せること', () => {
    const timeReports = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]
    wrapper.setData({ timeReports })
    wrapper.vm.deleteTimeReport(2)
    expect(wrapper.vm.timeReports.length).toBe(2)
  })
})
