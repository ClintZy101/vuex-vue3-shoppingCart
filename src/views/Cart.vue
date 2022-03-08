<template>
  <div class="cart">
    <h1>Products</h1>
    <div>
      {{ totalQty }}
    </div>
    <div>
      <div v-for="product in products" :key="product.id">
        <h1>{{ product.Item }}</h1>
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

export default {
  components: {
    ProductInCart,
  },
  setup() {
    const store = useStore();

    const products = ref([]);

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

    const totalQty = ref(0);
    function getTotalQty() {
      if (store.state.length) {
        let cartQty = cart
          .map((item) => item.quantity)
          .reduce((prev, next) => prev + next);
        totalQty.value = cartQty;
      }
    }

    getProducts();
    getTotalQty();

    
    return {
      totalQty,
      products,
    };
  },
};
</script>

