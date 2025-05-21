<template>
    <v-container>
      <h1>Your Basket</h1>
      <v-simple-table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in basket" :key="item.id">
            <td>{{ item.title }}</td>
            <td>
              <v-text-field
                type="number"
                v-model.number="item.quantity"
                @change="updateQuantity(item.id, item.quantity)"
                min="1"
                style="max-width: 70px"
              />
            </td>
            <td>${{ item.price }}</td>
            <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <v-btn color="red" text @click="removeFromBasket(item.id)">
                Remove
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
  
      <div class="mt-4">
        <strong>Total: ${{ basketTotal.toFixed(2) }}</strong>
      </div>
  
      <v-btn class="mt-4" color="primary" @click="$router.push('/')">
        Continue Shopping
      </v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  const store = useStore()
  
  const basket = computed(() => store.state.basket)
  const basketTotal = computed(() => store.getters.basketTotal)
  
  function updateQuantity(productId, quantity) {
    if (quantity < 1) quantity = 1
    store.commit('updateQuantity', { productId, quantity })
  }
  
  function removeFromBasket(productId) {
    store.commit('removeFromBasket', productId)
  }
  </script>
  