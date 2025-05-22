export default store => {
    // Load basket from localStorage on init
    const saved = localStorage.getItem('basket')
    if (saved) {
      store.commit('setBasket', JSON.parse(saved))
    }
  
    // Watch for changes and update localStorage
    store.subscribe((mutation, state) => {
      if (
        mutation.type === 'addToBasket' ||
        mutation.type === 'removeFromBasket' ||
        mutation.type === 'updateQuantity'
      ) {
        localStorage.setItem('basket', JSON.stringify(state.basket))
      }
    })
  }
  