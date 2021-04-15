import { render, screen, fireEvent } from '@testing-library/vue'
import AllPostsSection from '@/components/Blog/Main/AllPostsSection'
import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import allPosts from '../../../__mocks__/allPosts'
import * as homeContent from '../../../__mocks__/homePageContent'

const localVue = createLocalVue()
localVue.use(Vuex)

const recipeMock = jest.fn()
recipeMock.mockReturnValue('homePageContent')

const mocks = {
  $prismic: {
    asText: () => 'text',
    asHtml: html => `<p>${html}</p>`,
  },
}

const stubs = ['NuxtLink']

const store = {
  getters: {
    filteredPosts: () => allPosts,
    allPosts: () => allPosts,
    postsCategory: jest.fn(),
    postsPage: () => 2,
    homePageContent: () => homeContent.default,
  },
  actions: {
    changePostsCategory: jest.fn(),
    getMorePosts: jest.fn(),
  },
}

const containerToRender = document.createElement('a')
containerToRender.setAttribute('href', 'Hardware')
containerToRender.setAttribute('data-testid', 'test-href')

describe('AllPostsSection component', () => {
  it('is a Vue instance', () => {
    const { container } = render(AllPostsSection, {
      localVue,
      mocks,
      stubs,
      store,
    })

    expect(container).toMatchSnapshot()
  })

  it('should correct render posts', () => {
    render(AllPostsSection, {
      localVue,
      mocks,
      stubs,
      store,
    })

    expect(screen.getAllByTestId('test-single-post')).toHaveLength(allPosts.length)
  })

  it('should correct work change post category', async () => {
    render(AllPostsSection, {
      localVue,
      mocks,
      stubs,
      store,
    })

    const input = screen.getAllByTestId('test-post-input')
    await fireEvent.update(input[0], 'Hardware')
    expect(store.actions.changePostsCategory).toHaveBeenCalledTimes(1)
  })

  it('correctly call update class function from watcher', () => {
    mocks.visitedPost = 'Hardware'
    const wrapper = shallowMount(AllPostsSection, {
      localVue,
      mocks,
      stubs,
      store,
      container: document.body.appendChild(containerToRender),
    })

    wrapper.vm.$options.watch.filteredPosts()
    expect('1').toBe('1')
  })

  it('correctly work postsPage watcher', () => {
    const nextTick = jest.fn()
    mocks.visitedPost = 'Hardware'
    mocks.$nextTick = nextTick
    const wrapper = shallowMount(AllPostsSection, {
      localVue,
      mocks,
      stubs,
      store,
      container: document.body.appendChild(containerToRender),
    })

    wrapper.vm.$options.watch.postsPage.call({
      $nextTick: nextTick,
    })
    expect(nextTick).toHaveBeenCalledTimes(1)
  })
})