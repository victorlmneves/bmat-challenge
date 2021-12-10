import { shallowMount, createLocalVue } from '@vue/test-utils'
import Filters from '@/components/Base/Filters.vue'

import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

let wrapper = null

beforeEach(() => {
  wrapper = shallowMount(Filters, {
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Filters.vue', () => {
  it('renders filters', () => {
    const filters = wrapper.find('.filters__wrap')
    expect(filters).toBeTruthy()
  })

  it('renders the `Add Sound` link', () => {
    const addSoundLink = wrapper.find('.filters__wrap .filters__add-item')
    expect(addSoundLink.text()).toBe('Add Sound')
  })

  it('renders the search input', () => {
    const searchInput = wrapper.find('.filters__wrap .filters__search')
    expect(searchInput).toBeTruthy()
  })

  it('renders the sort dropdown and his label', () => {
    const sortText = wrapper.find('.filters__wrap .filters__label')
    expect(sortText.text()).toBe('Sort by')

    const sortDropdown = wrapper.find('.filters__wrap .filters__select')
    expect(sortDropdown).toBeTruthy()
  })
})
