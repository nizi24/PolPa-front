import TimeReportForm from '~/components/organisms/timeReports/TimeReportForm.vue'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import VeeValidate, { Validator } from 'vee-validate'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

describe('タイムレポートフォーム', () => {
  let store
  let vuetify

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
    vuetify = new Vuetify()

  })

  it('再編集の時、初期値が設定されること', () => {
    const editInitialValue = {
      study_time: '2000-01-01 1:20:00 UTC',
      memo: 'test'
    }
    const wrapper = mount(TimeReportForm, { localVue, store,
      propsData: { editInitialValue }
    })
    expect(wrapper.vm.hour).toBe('1')
    expect(wrapper.vm.minute).toBe('20')
    expect(wrapper.vm.memo).toBe('test')
    expect(wrapper.vm.editInitHour).toBe(1)
    expect(wrapper.vm.editInitMinute).toBe(20)
  })

  it.skip('経験値が減る場合は警告を出すこと', () => {
    const editInitialValue = {
      id: 1,
      study_time: '2000-01-01 1:20:00 UTC',
      memo: 'test'
    }
    const wrapper = mount(TimeReportForm, { localVue, store, vuetify,
      propsData: { editInitialValue }
    })
    wrapper.setData({ hour: '1', minute: '10' })
    wrapper.find('#save').trigger('click')
    expect(wrapper.emitted().record).toBeTruthy()
    expect(wrapper.vm.displayAlert).toBeTruthy()
  })
})
