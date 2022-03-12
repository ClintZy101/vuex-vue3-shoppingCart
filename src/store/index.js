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
    // productQuantity: state => product => {
    //   const item = state.cart.find(i => i.id === product.id)
    //   if (item) return item.quantity
    //   else return null
    // },
    totalQuantity(state){
      if(state.cart.length >= 1){
        let itemQuantity = state.cart.map(item => item.quantity)
        let cartTotal = itemQuantity.reduce((prev, next) => prev + next)
        return cartTotal
      } else return 0
     
    },
    productQuantity(state, product){
    return product.quantity
    },
    products(state){
      return state.products
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
        item.Quantity++
      } else {
        state.cart.push({ ...data, Quantity: 1 })
      }
      updateLocalStorage(state.cart)

      // let productQuantity = state.cart.map(p => p.Quantity)
      // let totalQuantity = productQuantity.reduce((prev, next) => prev + next)
      // state.cartCount = totalQuantity

    },

    INCREMENT_PRODUCT_QTY(state, product) {
     let item = state.cart.find(i => i.id === product.id)
      item.Quantity++
      console.log(item.Quantity)
    },
    DECREMENT_PRODUCT_QTY(state, product) {
      let item = state.cart.find(i => i.id === product.id)
      
      if (item.Quantity === 0) {
        alert('Count is already Zero')
        return item.Quantity = 0
      } else {
         item.Quantity-- 
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
