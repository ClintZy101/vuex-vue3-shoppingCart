<template>
  <div class="home">
    <h1>Home</h1>

    <!-- Product Card -->
    <div class="container" v-for="(product, index) in data" :key="index">
      <div>{{ product.Item }}</div>
      <div>{{ product.Description }}</div>
      <div>{{ product.Quantity }}</div>
      <div>{{ product.Cost }}</div>
      <div>
        <button @click="increment">Add</button>
        <span>{{ counter }}</span>
        <button @click="decrement">Minus</button>
      </div>
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

export default {
  name: "Home",
  setup() {
    const data = ref(null);
    
    const fetchData = async () => {
      await fetch("http://localhost:5000/inventory")
        .then((res) => res.json())
        .then((res) => (data.value = res));

        addIdToObject();
        let ID = data.value.map(d => d.id)
        // console.log(ID)
    };

    function addIdToObject (){
      data.value.forEach(item => item.id = Math.floor(Math.random() * 10000000000))
    }
   
    const store = useStore();
    const counter = computed(() => store.state.count);


    const increment = () => {
      store.commit('INCREMENT')
    }
    const decrement=()=>{
      store.commit('DECREMENT')
    }
    
     

    function addToCart(data) {
      store.commit("ADD_TO_CART", data);
      // console.log(store.state.cart)
    }

    onMounted(() => {
      fetchData()

    });
    return {
      data,
      counter,
      increment,
      decrement,
      addToCart,
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
