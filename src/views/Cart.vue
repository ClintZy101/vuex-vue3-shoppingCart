<template>
  <div class="cart">
    <h1 v-bind:style="{ fontSize: '20px' }">Products: {{ totalQty }}</h1>
    <h1 v-bind:style="{ fontSize: '20px' }">cartQty: {{ cartQty }}</h1>

    <div>
      <div class="product" v-for="product in products" :key="product.id">
        <h1 v-bind:style="{ fontSize: '15px' }">{{ product.Item }}</h1>
        <h1 v-bind:style="{ fontSize: '10px' }">{{ product.Description }}</h1>
        
        <div class="buttons">
          <button @click="increment(product)">Add</button>
          <span>{{ counter }}</span>
          <button>Minus</button>
        </div>
      </div>

      <!-- <ProductInCart 

      :product="product"
      /> -->
    </div>
  </div>
</template>

<script>
import ProductInCart from "../components/ProductInCart.vue";

import { ref } from "@vue/reactivity";

import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';

export default {
  components: {
    ProductInCart,
  },
  setup() {
    const store = useStore();
    const counter = ref(0);
    const products = ref([]);
    
    const totalQty = store.state.cartCount;

    const cartQty = computed(()=>store.getters.totalQuantity)
    

    function getProducts() {
      if (store.state.cart) {
        let cart = store.state.cart;
        products.value = cart;
        console.log(products.value);
      }
    }

    // function getProduct() {
    //   let productInCart = store.state.cart.map(p => p)
    //   product.value = productInCart
    // }

    // const totalQty = ref(0);
    // function getTotalQty() {
    //   if (store.state.length) {
    //     let cartQty = cart
    //       .map((item) => item.quantity)
    //       .reduce((prev, next) => prev + next);
    //     totalQty.value = cartQty;
    //   }
    // }

    function increment(item) {
      store.commit('INCREMENT_PRODUCT_QTY', item)
    }

    getProducts();
    // getTotalQty();

    return {
      totalQty,
      cartQty,
      products,
      counter,
      increment,
    };
  },
};
</script>

<style scoped>
.product {
  border: 1px solid;
  border-radius: 5px;
  width: 200px;
  height: max-content;
  margin: auto;
  padding: 3px;
  padding-bottom: 5px;
  margin-bottom: 5px;
}
.buttons > button {
  margin: 5px 0;
}
</style>
