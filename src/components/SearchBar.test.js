import { mount } from '@vue/test-utils'
import SearchBar from './SearchBar.vue'

describe('SearchBar.vue', () => {
	it('updates input value on typing', async () => {
		const wrapper = mount(SearchBar)
		const input = wrapper.find('input')

		await input.setValue('London')
		expect(input.element.value).toBe('London')
	})

	it('emits "search" event when button is clicked', async () => {
		const wrapper = mount(SearchBar)
		const input = wrapper.find('input')
		const button = wrapper.find('button')

		await input.setValue('Berlin')
		await button.trigger('click')

		expect(wrapper.emitted('search')[0]).toEqual(['Berlin'])
		expect(input.element.value).toBe('') // input cleared
	})

	it('does not emit if input is empty or whitespace', async () => {
		const wrapper = mount(SearchBar)
		const input = wrapper.find('input')
		const button = wrapper.find('button')

		await input.setValue('')
		await button.trigger('click')
		expect(wrapper.emitted('search')).toBeUndefined()
	})
})
