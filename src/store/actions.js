export default {
    async fetchProducts({ commit }) {
      commit('setLoading', true)
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100')
        const data = await res.json()
        commit('setProducts', data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        commit('setLoading', false)
      
      }
    }
  }
  