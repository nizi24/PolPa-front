import Heatmap from '../../mocks/components/Heatmap.vue'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

// 本当のコンポーネントを使用していません
describe('ヒートマップ', () => {
  let store
  let vuetify

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
    vuetify = new Vuetify()
  })

  it('タイムレポートをグループ化すること', () => {
    const that = { timeReports: [
      {
        experience_point: 20,
        created_at: '2020-01-01T00:00:00'
      },
      {
        experience_point: 30,
        created_at: '2020-01-01T06:00:00'
      },
      {
        experience_point: 30,
        created_at: '2020-01-02T06:00:00'
      }
    ]}

    const expectValue = [
      {
        counting: 50,
        created_at: '2020-01-01'
      },
      {
        counting: 30,
        created_at: '2020-01-02'
      }
    ]

    expect(Heatmap.computed.entries.call(that)).toEqual(expectValue)
  })
})
