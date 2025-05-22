import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const store = createStore({
  state,
  mutations,
  actions,
  getters,
})
store.watch(
  (state) => state.basket,
  (newBasket) => {
    localStorage.setItem('basket', JSON.stringify(newBasket))
  },
  { deep: true }
)

export default store
