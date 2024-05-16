import { createStore, createLogger } from 'vuex'
import planetStore from '@/store/modules/planetStore'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    planetStore,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})