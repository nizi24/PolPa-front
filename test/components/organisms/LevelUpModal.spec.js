import LevelUpModal from '~/components/organisms/LevelUpModal.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import index from '~/store/index'
import experience from '~/store/experience'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

const initStore = () => {
  return cloneDeep({
    index,
    experience
  })
}

describe('レベルアップの通知', () => {
  let store
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store(initStore())
    wrapper = shallowMount(LevelUpModal, { localVue, store })
  })


  it('レベルが上がった時に通知されること', () => {
    wrapper.vm.levelUp = true
    expect(wrapper.find('h1#current-level').text()).toBe('Lv.1')
  })
})
