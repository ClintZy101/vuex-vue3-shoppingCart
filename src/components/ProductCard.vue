<template>
  <div class="container" v-for="(product, index) in data" :key="index">
        <div>{{ product.Item }}</div>
        <div>{{ product.Description }}</div>
        <div>{{ product.Quantity}}</div>
        <div>{{ product.Cost}}</div>
      </div>
</template>

<script>
export default {
}
</script>

<style>

</style>