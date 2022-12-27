import { createStore } from 'vuex'

import createPersistedState from 'vuex-persistedstate';
import layout from './modules/layout'
import auth from './modules/auth'
import todo from './modules/todo'
import notification from './modules/notification'
import authfack from './modules/authfack'

const dataState = createPersistedState({
  paths: ['data']
})

const store = createStore({
  modules: {
    layout,
    auth,
    todo,
    notification,
    authfack
  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: import.meta.env.NODE_ENV !== 'production',
  plugins: [dataState]  // 默认存储到本地local Storage
})

export default store

