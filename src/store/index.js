import { createStore } from 'vuex'

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export default createStore({
  state: {
    products: [],
    cart: [],
    cartCount: 0
  },
  getters: {
  
    products(state){
      return state.products
    },
   
    cartLength(state){
      let cartCount = state.cart.map(c => c.count)
      if (cartCount.length){
        return cartCount.reduce((prev, next) => prev + next)
      }
       else return 0
    },
    cartTotal(state){
      let total = 0
      state.cart.forEach(item => total += item.Price * item.count)
      return total
    }

  },
  mutations: {
    SET_PRODUCTS(state, data){
      state.products = data
      state.products.forEach((item) => (item.id = Math.floor(Math.random() * 10000 * Date.now())))
    },
   
    ADD_TO_CART(state, data) {
      let item = state.cart.find(i => i.id === data.id)
      if (item) {
        item.count++
      } else {
        state.cart.push({ ...data, count: 1 })
      }
      updateLocalStorage(state.cart)

    },

    INCREMENT_PRODUCT_QTY(state, product) {
     let item = state.cart.find(i => i.id === product.id)
      item.count++
      console.log(item.count)
    },
    DECREMENT_PRODUCT_QTY(state, product) {
      let item = state.cart.find(i => i.id === product.id)
      
      if (item.count === 0) {
        alert('Count is already Zero')
        return item.count= 0
      } else {
         item.count-- 
      }
    }
  },
  actions: {
    // addQuote({ commit, state }, payload) {
    //   commit("ADD_QUOTE", payload);
    //   const json = JSON.stringify(state.quotes);
    //   localStorage.setItem("saved-quotes", json);
    // },
    fetchProducts({commit}) {
      return fetch("http://localhost:5000/inventory")
        .then((response) => response.json())
        .then((data) => {
          commit("SET_PRODUCTS", data);
        })
        .catch((err) => console.error(err));
    },
  },
  modules: {
  }
})
