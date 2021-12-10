import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import SoundsList from '@/components/Sounds/SoundsList.vue'
import mockedSounds from '@/mocks/sound-recordings-mock.json'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

let wrapper = null

const actions = {
  deleteById: jest.fn()
}

const mockDeleteById = actions.deleteById

beforeEach(() => {
  wrapper = shallowMount(SoundsList, {
    propsData: {
      soundList: mockedSounds
    },
    stubs: {
      RouterLink: RouterLinkStub
    },
    actions,
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('SoundsList.vue', () => {
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has a table with a list of sounds', () => {
    const soundsListTable = wrapper.find('.sounds-list__table')
    expect(soundsListTable).toBeTruthy()
  })

  it('has 6 sounds on the list', () => {
    const soundsList = wrapper.findAll('.sounds-list__rows')
    expect(soundsList).toHaveLength(6)
  })

  it('triggers the delete sound button', () => {
    actions.deleteById(mockedSounds[3].id)

    expect(mockDeleteById).toHaveBeenCalled()
    expect(mockDeleteById).toHaveBeenCalledWith(mockedSounds[3].id)
  })

  it('triggers the sound details button', () => {
    expect(wrapper.findComponent(RouterLinkStub).props().to.params.id).toBe(mockedSounds[0].id)
  })
})
