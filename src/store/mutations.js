export default {
    setProducts(state, products) {
      state.products = products
    },
    addToBasket(state, product) {
      const existing = state.basket.find(p => p.id === product.id)
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1
      } else {
        state.basket.push({ ...product, quantity: 1 })
      }
    },
    removeFromBasket(state, productId) {
      state.basket = state.basket.filter(p => p.id !== productId)
    },
    updateQuantity(state, { productId, quantity }) {
      const product = state.basket.find(p => p.id === productId)
      if (product) {
        product.quantity = quantity > 0 ? quantity : 1
      }
    },
    setFilter(state, { key, value }) {
      state.filters[key] = value
    },
    setPage(state, page) {
      state.filters.page = page
    },
  }
  