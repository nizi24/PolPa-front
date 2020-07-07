import ExpReductionAlert from '~/components/organisms/ExpReductionAlert.vue'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)


describe('経験値減少確認画面', () => {
  let store
  let vuetify

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
    vuetify = new Vuetify()
  })

  it('確認画面が表示されること', () => {
    const wrapper = shallowMount(ExpReductionAlert, { localVue, store,
      propsData: { displayModal: true }
    })
    expect(wrapper.find('p').text()).toBe('経験値が下がります。')
  })

  it('キャンセルできること', () => {
    const wrapper = mount(ExpReductionAlert, { localVue, store, vuetify,
      propsData: { displayModal: true }
    })
    const button = wrapper.find('#cancel')
    button.trigger('click')
    expect(wrapper.vm.displayModal).toBeTruthy()
    const emit = wrapper.emitted()
    expect(emit.cancel).toBeTruthy()
  })

  it('了承できること', () => {
    const wrapper = mount(ExpReductionAlert, { localVue, store, vuetify,
      propsData: { displayModal: true }
    })
    const button = wrapper.find('#understanding')
    button.trigger('click')
    expect(wrapper.vm.displayModal).toBeTruthy()
    const emit = wrapper.emitted()
    expect(emit.understanding).toBeTruthy()
  })
})
