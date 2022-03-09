<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/cart">
      Cart
    </router-link> |
    <router-link :to="{name: 'Users'}">Users</router-link>

  </div>
  <router-view />
</template>

<script>
import { ref } from "@vue/reactivity";

import { useStore } from "vuex";
import { onMounted, onUpdated } from "@vue/runtime-core";


export default {
  components:{

  },
  setup() {
    const store = useStore();
    const cart = store.state.cart;
    const cartQty = store.state.cartCount
    const totalQty = ref(0);

    function getTotalQty() {
      if (cart.length) {
        let cartQty = cart
          .map((item) => item.quantity)
          .reduce((prev, next) => prev + next);
        totalQty.value = cartQty;
        console.log(totalQty);
      }
    }
    onMounted(() => {
      getTotalQty();
      console.log('App onmount')
    });
  
console.log('cartQty',cartQty)
    return {
      totalQty,
      cartQty
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
