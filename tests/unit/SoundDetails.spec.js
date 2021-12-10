import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import SoundDetails from '@/components/Sounds/SoundDetails.vue'
import mockedSounds from '@/mocks/sound-recordings-mock.json'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper = null

const getters = {
  soundDetails: () => mockedSounds[0]
}

const actions = {
  getById: () => 1
}

const $route = {
  params: {
    id: null
  }
}

const mocks = {
  $route
}

const store = new Vuex.Store({
  getters,
  actions
})

beforeEach(() => {
  wrapper = shallowMount(SoundDetails, {
    store,
    localVue,
    mocks
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('SoundDetails.vue', () => {
  it('renders correctly', async () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
