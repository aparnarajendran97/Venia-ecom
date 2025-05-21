export default {
    async fetchProducts({ commit }) {
      const res = await fetch('https://dummyjson.com/products?limit=100')
      const data = await res.json()
      commit('setProducts', data.products)
    },
  }
  