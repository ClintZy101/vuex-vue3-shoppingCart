import { createStore } from 'vuex'

function updateLocalStorage(cart){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export default createStore({
  state: {
    cart: [],
    count: 0
  },
 
  mutations: {
    // ADD_TO_CART(state, data) {
    //   state.cart.push(data)
    // },
    ADD_TO_CART(state, product) {
      let item = state.cart.find(i => i.id === product.id)
      if (item){
          item.quantity++
      } else {
          state.cart.push({...product, quantity:1})
      }
      updateLocalStorage(state.cart)
  },
  // fetchQuote({}) {
  //   if (localStorage.getItem("saved-quote")) {
  //     try {
  //       return JSON.parse(localStorage.getItem("saved-quote"));
  //     } catch (e) {
  //       localStorage.removeItem("saved-quote");
  //     }
  //   }
  // },

  INCREMENT(state){
    state.count ++
  },
  DECREMENT(state){
    if(state.count === 0){
      alert('Count is already Zero')
      return state.count = 0  
    } else {
      return state.count --
    }
  }
  },
  actions: {
    // addQuote({ commit, state }, payload) {
    //   commit("ADD_QUOTE", payload);
    //   const json = JSON.stringify(state.quotes);
    //   localStorage.setItem("saved-quotes", json);
    // },
    addToCart({commit, state}, payload) {
      commit('ADD_TO_CART', payload);
    }
  },
  modules: {
  }
})
