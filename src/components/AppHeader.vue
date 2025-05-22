<template>
  <v-app-bar app color="primary" dark>
    <!-- Hamburger Icon for Mobile -->
    <v-btn icon class="mr-2 d-sm-none" @click="drawer = true">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-toolbar-title class="font-weight-bold cp" @click="$router.push('/')">VENIA</v-toolbar-title>
    <v-spacer v-if="!isMobile" />

    <!-- Category Menus - Shown only on larger screens -->
    <div class="d-none d-sm-flex">
      <!-- Cloth Menu -->
      <v-menu
        v-model="menu"
        close-on-content-click
        text
        max-width="150"
        offset-y
      >
        <template #activator="{ props }">
          <v-btn v-bind="props" text density="compact" style="max-width: 150px">
            {{ selectedClothCategory || 'Clothes' }}
            <v-icon end>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(cloth, index) in clothes" :key="index" @click="selectCloth(cloth)">
            <v-list-item-title>{{ cloth }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Grocery Menu -->
      <v-menu
        v-model="groceryMenu"
        close-on-content-click
        max-width="150"
        offset-y
      >
        <template #activator="{ props }">
          <v-btn v-bind="props" text density="compact" style="max-width: 150px" class="mr-4">
            {{ selectedGroceryCategory || 'Groceries' }}
            <v-icon end>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in groceries" :key="index" @click="selectGrocery(item)">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Pet Food Menu -->
      <v-menu
        v-model="petFoodMenu"
        close-on-content-click
        max-width="150"
        offset-y
      >
        <template #activator="{ props }">
          <v-btn v-bind="props" text density="compact" style="max-width: 150px" class="mr-4">
            {{ selectedPetfoodCategory || 'Pet Foods' }}
            <v-icon end>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in petFoods" :key="index" @click="selectPetFood(item)">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- Search Bar - hidden on mobile -->
    <v-text-field
      v-if="!isMobile"
      class="my-2"
      v-model="search"
      append-inner-icon="mdi-magnify"
      label="Search"
      dense
      hide-details
      style="max-width: 250px"
      @click:append-inner="onSearch"
    ></v-text-field>

    <!-- Login Button -->
    <v-btn outlined color="white" class="ml-4"  @click="login">
      <v-icon size="24">mdi-account</v-icon>
      <span class="ml-2">Login</span>
    </v-btn>

    <!-- Wishlist -->
    <v-btn icon class="ml-4" @click="$router.push('/basket')">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Navigation Drawer for Mobile -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list dense class="pa-6 cp" @click="$router.push('/')">
      <v-subheader>Home</v-subheader>

    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const clothes = ['Men', 'Women', 'Kids']
const petFoods = ['Dog', 'Cat', 'Fish']
const groceries = ['Fruits', 'Vegetables', 'Dairy']

const selectedClothCategory = ref(null)
const selectedGroceryCategory = ref(null)
const selectedPetfoodCategory = ref(null)

const menu = ref(false)
const groceryMenu = ref(false)
const petFoodMenu = ref(false)

const search = ref('')
const drawer = ref(false)
const isMobile = ref(window.innerWidth < 768)

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(search, (val) => {
  store.commit('setSearchFilter', val)
})

function selectCloth(cloth) {
  selectedClothCategory.value = cloth
  store.commit('setCategoryFilter', cloth)
  menu.value = false
}
function selectGrocery(item) {
  selectedGroceryCategory.value = item
  store.commit('setCategoryFilter', item)
  groceryMenu.value = false
}
function selectPetFood(item) {
  selectedPetfoodCategory.value = item
  store.commit('setCategoryFilter', item)
  petFoodMenu.value = false
}
function onSearch() {
  // Optional search logic
}
function login() {
  alert('Login clicked! Implement login flow.')
}
</script>
