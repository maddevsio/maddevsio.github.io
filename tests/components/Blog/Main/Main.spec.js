import { render } from '@testing-library/vue'
import Main from '@/components/Blog/Main/Main'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as blogContent from '../../../__mocks__/blogPageContent'
import blogPosts from '../../../__mocks__/blogPosts'

const localVue = createLocalVue()
localVue.use(Vuex)

const mocks = {
  $prismic: {
    asText: () => 'text',
    asHtml: html => `<p>${html}</p>`,
    api: {
      getSingle: () => ({ data: {} }),
    },
  },
  getBlogAuthors: jest.fn(),
}

const stubs = ['NuxtLink', 'FeaturedPost', 'CustomerUniversitySection']

const store = {
  getters: {
    filteredBlogPosts: () => blogPosts,
    featuredBlogPost: () => blogPosts[0],
    blogPosts: () => blogPosts,
    blogAuthors: () => [{}],
    blogPostsLoaded: () => true,
    blogPostsCategory: jest.fn(),
    recentBlogPosts: jest.fn(),
    featuredCUPost: jest.fn(),
    blogPostsPage: () => 2,
    blogPageContent: () => blogContent.default,
    customerContent: () => ({}),
  },
  actions: {
    getBlogPageContent: jest.fn(),
    getBlogPosts: () => jest.fn(),
    getCustomerUniversityContent: jest.fn(),
    getBlogAuthors: jest.fn(),
  },
}

describe('Main component', () => {
  it('should render correctly', () => {
    const { container } = render(Main, {
      stubs,
      mocks,
      store,
    })

    expect(container).toMatchSnapshot()
  })
})
