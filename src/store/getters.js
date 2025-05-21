export default {
    filteredProducts(state) {
      let filtered = [...state.products]
  
      if (state.filters.category)
        filtered = filtered.filter(p => p.category === state.filters.category)
  
      if (state.filters.search)
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(state.filters.search.toLowerCase())
        )
  
      if (state.filters.sort === 'price_asc')
        filtered.sort((a, b) => a.price - b.price)
      else if (state.filters.sort === 'price_desc')
        filtered.sort((a, b) => b.price - a.price)
      else if (state.filters.sort === 'name_asc')
        filtered.sort((a, b) => a.title.localeCompare(b.title))
      else if (state.filters.sort === 'name_desc')
        filtered.sort((a, b) => b.title.localeCompare(a.title))
  
      return filtered
    },
    paginatedProducts(state, getters) {
      const start = (state.filters.page - 1) * state.filters.pageSize
      return getters.filteredProducts.slice(start, start + state.filters.pageSize)
    },
    categories(state) {
      const cats = new Set(state.products.map(p => p.category))
      return Array.from(cats)
    },
    basketTotal(state) {
      return state.basket.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
      )
    },
  }
  