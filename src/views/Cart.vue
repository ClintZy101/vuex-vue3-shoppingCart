<template>
  <div class="cart">
    <h1>Cart Page</h1>

    <div >
      {{ totalQty }}
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const cart = store.state.cart;
    const totalQty = ref(0);

    function getTotalQty() {
      if (cart.length) {
        let cartQty = cart
          .map((item) => item.quantity)
          .reduce((prev, next) => prev + next);
          totalQty.value = cartQty
      }
    }

  getTotalQty();

    return {
      totalQty,
    };
  },
};
</script>

