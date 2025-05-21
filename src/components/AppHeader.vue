<template>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="font-weight-bold">VENIA</v-toolbar-title>
  
      <v-spacer />
  
      <!-- Cloth Menu -->
      <v-menu
        v-model="menu"
        close-on-content-click
        text
        max-width="150"
        offset-y
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            text
            density="compact"
            style="max-width: 150px"
          >
            {{ selectedClothCategory || 'Clothes' }}
            <v-icon end>mdi-menu-down</v-icon>
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(cloth, index) in clothes"
            :key="index"
            @click="selectCloth(cloth)"
          >
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
          <v-btn
            v-bind="props"
           text
            density="compact"
            style="max-width: 150px"
            class="mr-4"
          >
            {{ selectedGroceryCategory || 'Groceries' }}
            <v-icon end>mdi-menu-down</v-icon>
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, index) in groceries"
            :key="index"
            @click="selectGrocery(item)"
          >
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
          <v-btn
            v-bind="props"
            text
            density="compact"
            style="max-width: 150px"
            class="mr-4"
          >
            {{ selectedPetfoodCategory || 'Pet Foods' }}
            <v-icon end>mdi-menu-down</v-icon>
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, index) in petFoods"
            :key="index"
            @click="selectPetFood(item)"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
  
      <!-- Search Bar -->
        <v-text-field
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
      <v-btn outlined color="white" class="ml-4" @click="login">
        Login
      </v-btn>
    </v-app-bar>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useStore } from 'vuex'
  
  const store = useStore()
  
  // Categories
  const clothes = ['Men', 'Women', 'Kids']
  const petFoods = ['Dog', 'Cat', 'Fish']
  const groceries = ['Fruits', 'Vegetables', 'Dairy']
  
  // Selected category states
  const selectedClothCategory = ref(null)
  const selectedGroceryCategory = ref(null)
  const selectedPetfoodCategory = ref(null)
  
  // Menu controls
  const menu = ref(false)
  const groceryMenu = ref(false)
  const petFoodMenu = ref(false)
  
  // Search
  const search = ref('')
  
  // Vuex syncing
  watch(search, (val) => {
    store.commit('setSearchFilter', val)
  })
  
  // Handlers for category selection
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
    // Optional: trigger additional search logic
  }
  
  function login() {
    alert('Login clicked! Implement login flow.')
  }
  </script>
  