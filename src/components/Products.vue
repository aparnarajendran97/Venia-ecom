<template>
  <v-container class="router-container pa-6 pa-sm-8 pa-md8">
    <v-row
  justify="center"
  align="center"
  v-if="loading"
  class="my-10"
  style="height: 60vh;" >
>
  <v-col
    cols="12"
    class="d-flex justify-center align-center"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    />
  </v-col>
</v-row>

    <v-row v-else>
      <v-col cols="12">
        <!-- Filters Row -->
        <v-row align="center justify-center" class="mb-4 text-center" dense>
          <v-col cols="12" sm="4" md="3">
            <v-select v-model="categoryFilter" :items="categories" label="Category" clearable dense hide-details />
          </v-col>
          <v-col cols="12" sm="4" md="3">
            <v-select v-model="sortOption" :items="sortOptions" item-title="label" item-value="value" label="Sort by"
              dense hide-details />
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field v-model="searchTerm" label="Search" outlined append-inner-icon="mdi-magnify" dense
              hide-details clearable />
          </v-col>
        </v-row>



        <!-- Product Grid -->
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="product in paginatedProducts" :key="product.id">
            <v-card @click="openModal(product)" class="cursor-pointer">
              <v-img :src="product.thumbnail" height="180" />
              <v-card-title>{{ product.title }}</v-card-title>
              <v-card-subtitle>${{ product.price }}</v-card-subtitle>
              <v-card-text>{{ product.description.substring(0, 70) }}...</v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click.stop="addToBasket(product)">
                  Add to Basket
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- View More Button -->
        <v-row justify="center" class="my-4">
          <v-btn color="primary" v-if="productsToShow < filteredSortedProducts.length" @click="loadMore">
            View More
          </v-btn>
        </v-row>

        <!-- Product Detail Modal -->
        <v-dialog v-model="modalOpen" max-width="600">
          <v-card>
            <v-card-title>{{ selectedProduct?.title }}</v-card-title>
            <v-card-subtitle>${{ selectedProduct?.price }}</v-card-subtitle>
            <v-card-text>
              <v-img :src="selectedProduct?.thumbnail" height="250" class="mb-4" />
              <div><strong>Category:</strong> {{ selectedProduct?.category }}</div>
              <div class="mt-2">{{ selectedProduct?.description }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="modalOpen = false">Close</v-btn>
              <v-spacer />
              <v-btn color="primary" @click="addToBasket(selectedProduct)">
                Add to Basket
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// Local states for filters and modal
const categoryFilter = ref(null)
const sortOption = ref(null)
const searchTerm = ref('')

const modalOpen = ref(false)
const selectedProduct = ref(null)
const loading = computed(() => store.state.loading)

const productsToShow = ref(12) // pagination count

// Sort options for dropdown
const sortOptions = [
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A to Z', value: 'name_asc' },
  { label: 'Name: Z to A', value: 'name_desc' },
]

// Fetch products on mount
onMounted(() => {
  store.dispatch('fetchProducts')
})

// Categories from all products dynamically
const categories = computed(() => {
  const allCategories = store.state.products.map(p => p.category)
  return [...new Set(allCategories)].sort()
})

// Apply filters and sorting in computed
const filteredSortedProducts = computed(() => {
  let result = store.state.products

  if (categoryFilter.value) {
    result = result.filter(p => p.category === categoryFilter.value)
  }

  if (searchTerm.value.trim()) {
    const term = searchTerm.value.toLowerCase()
    result = result.filter(p => p.title.toLowerCase().includes(term))
  }

  if (sortOption.value) {
    switch (sortOption.value) {
      case 'price_asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'name_asc':
        result = [...result].sort((a, b) =>
          a.title.localeCompare(b.title)
        )
        break
      case 'name_desc':
        result = [...result].sort((a, b) =>
          b.title.localeCompare(a.title)
        )
        break
    }
  }

  return result
})

// Pagination slice
const paginatedProducts = computed(() =>
  filteredSortedProducts.value.slice(0, productsToShow.value)
)

function loadMore() {
  productsToShow.value += 12
}

function addToBasket(product) {
  store.commit('addToBasket', product)
  router.push('/basket')
}

function openModal(product) {
  selectedProduct.value = product
  modalOpen.value = true
}

// Watch filters to reset pagination when filters change
watch([categoryFilter, searchTerm, sortOption], () => {
  productsToShow.value = 12
})
</script>
