import convertStringToSlug from '@/helpers/convertStringToSlug'

export default {
  state: () => ({
    category: '',
    categoryPosts: [],
    categoryPostsLoaded: false,
  }),
  mutations: {
    SET_CATEGORY(state, category) {
      state.category = category
    },
    SET_CATEGORY_POSTS(state, posts) {
      state.categoryPosts = posts
    },
    SET_CATEGORY_POSTS_LOADED(state, value) {
      state.categoryPostsLoaded = value
    },
  },
  actions: {
    getBlogCategory({ commit }, payload) {
      const category = this.$prismic.api.tags.find(tag => convertStringToSlug(tag) === payload)
      commit('SET_CATEGORY', category)
    },
    async getCategoryPosts({ commit }, payload) {
      const posts = (await this.$prismic.api.query(this.$prismic.predicates.at('document.tags', [payload]), {
        orderings: '[my.post.date desc]',
        pageSize: 100,
      })).results
      commit('SET_CATEGORY_POSTS', posts)
      commit('SET_CATEGORY_POSTS_LOADED', true)
    },
  },
  getters: {
    blogCategory(state) {
      return state.category
    },
    categoryPosts(state) {
      return state.categoryPosts
    },
    categoryPostsCount(state) {
      return state.categoryPosts.length
    },
    categoryPostsLoaded(state) {
      return state.categoryPostsLoaded
    },
  },
}
