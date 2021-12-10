import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import AddSound from '@/components/Sounds/AddSound.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

let wrapper = null

const actions = {
  onSubmit: jest.fn()
}

beforeEach(() => {
  wrapper = shallowMount(AddSound, {
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

  it('submits the form, shows the success message and hides the message when the users clicks on the x', async () => {
    const submitBtn = wrapper.find('.add-item__button')

    expect(submitBtn.text()).toBe('Add Sound')

    wrapper.vm.onSubmit = jest.fn()
    wrapper.vm.isSending = true
    await wrapper.vm.onSubmit()

    expect(wrapper.vm.onSubmit).toHaveBeenCalled()
    expect(submitBtn.text()).toBe('Sending...')

    wrapper.vm.showSuccessMsg = true
    await wrapper.vm.$nextTick()

    const successMessage = wrapper.find('.add-item__success > p')
    expect(successMessage.text()).toBe('Sound added successfully!!!')

    wrapper.vm.closeMessage = jest.fn()
    wrapper.vm.showSuccessMsg = false
    await wrapper.vm.closeMessage()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.closeMessage).toHaveBeenCalled()
    expect(wrapper.find('.add-item__success > p').exists()).toBe(false)
  })
})
