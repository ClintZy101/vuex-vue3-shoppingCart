<template>
  <div class="home">
    <h1>Home</h1>
    <Header :cartQty="cartQty" />
    <!-- Product Card -->
    <div class="container" v-for="(product, index) in data" :key="index">
      <div>{{ product.Item }}</div>
      <div>{{ product.Description }}</div>
      <div>{{ product.Quantity }}</div>
      <div>Php{{ product.Cost }}</div>

      <button class="btn" @click="addToCart(product)">Add to Cart</button>
      <hr />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
// import data from '../assets/data.json'
import { useStore } from "vuex";
import Header from "../components/Header.vue";

export default {
  name: "Home",
  components: {
    Header,
  },
  setup() {
    // const data = ref(null);
    const store = useStore();
    // The ideal standard dealing with computed properties should be done in the vuex store using "getters"
    const cartQty = computed(() => store.getters.cartLength);
    const data = computed(() => store.state.products);

    
    function fetchData() {
      store.dispatch("fetchProducts");
      console.log(data)
    }
    function addToCart(data) {
      store.commit("ADD_TO_CART", data);
      console.log(data);
    }

    onMounted(() => {
      fetchData();
    });
    return {
      data,
      addToCart,
      cartQty,
    };
  },
};
</script>

<style scoped>
.btn {
  padding: 5px;
  background: grey;
  border-radius: 3px;
  cursor: pointer;
}
.container {
  padding: 3px;
  font: 300;
  color: gray;
  border: black;
  border-width: 1;
  border-radius: 5px;
  width: 300px;
  height: max-content;
  margin: 10px auto;
}
li {
  list-style: none;
}
</style>
