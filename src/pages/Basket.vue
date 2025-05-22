<template>
  <v-container class="py-6 router-container h-100 ">

    <v-row v-if="basket.length">
      <!-- Left: Basket Items -->
      <v-col cols="12">
        <h1 class="text-h5 mb-6 font-weight-bold">🛒 Your Basket</h1>

      </v-col> <v-col cols="12" md="8">
        <v-card v-for="item in basket" :key="item.id" class="mb-4 pa-4" outlined>
          <!-- Top part: Image + Title stacked vertically on mobile -->
          <v-row class="flex-column flex-sm-row" align="center">
            <v-col cols="12" sm="3" class="text-center">
              <v-img :src="item.images[0]" max-height="100" max-width="100" contain class="mx-auto" />
            </v-col>

            <v-col cols="12" sm="9" class="text-center text-sm-left mt-2 mt-sm-0">
              <strong class="text-subtitle-2">{{ item.title }}</strong>
            </v-col>
          </v-row>

          <!-- Bottom part: Quantity, Price, Subtotal, Remove all in one line on mobile -->
          <v-row class="align-center" justify="space-between" style="margin-top: 12px;">
            <v-col cols="3" sm="2" class="pa-0">
              <v-text-field v-model.number="item.quantity" type="number" min="1"
                @change="updateQuantity(item.id, item.quantity)" hide-details dense style="max-width: 70px;" />
            </v-col>

            <v-col cols="3" sm="2" class="pa-0 text-center">
              <div>${{ item.price.toFixed(2) }}</div>
            </v-col>

            <v-col cols="3" sm="2" class="pa-0 text-center">
              <div>${{ (item.price * item.quantity).toFixed(2) }}</div>
            </v-col>

            <v-col cols="3" sm="1" class="pa-0 text-center">
              <v-btn color="error" icon @click="removeFromBasket(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

      </v-col>

      <!-- Right: Order Summary -->
      <v-col cols="12" md="4">
        <v-card class="pa-3 pa-sm-6" elevation="2">
          <h2 class="text-h6 font-weight-bold mb-4">Order Summary</h2>

          <v-row justify="space-between" class="mb-2">
            <span>Subtotal</span>
            <span>${{ basketTotal.toFixed(2) }}</span>
          </v-row>

          <v-row justify="space-between" class="mb-2">
            <span>Shipping</span>
            <span>$5.00</span>
          </v-row>

          <v-divider class="my-2" />

          <v-row justify="space-between" class="mb-4">
            <strong>Total</strong>
            <strong>${{ (basketTotal + 5).toFixed(2) }}</strong>
          </v-row>

          <v-btn color="primary" block @click="checkout">
            Checkout
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="fill-height align-center justify-center">
      <v-col cols="12" class="text-center">
        <v-icon size="64" color="grey lighten-1">mdi-cart-off</v-icon>
        <h2 class="text-h5 mt-4">Your basket is empty</h2>
        <p>Browse our products and add some to your basket!</p>
        <v-btn color="primary" class="mt-4" @click="$router.push('/')">Continue Shopping</v-btn>
      </v-col>
    </v-row>
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

function checkout() {
  alert("Proceeding to checkout!") // Replace with real logic
}
</script>
