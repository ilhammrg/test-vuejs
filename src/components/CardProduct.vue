<template>
  <div class="card shadow">
    <img
      :src="'assets/images/' + product.gambar"
      class="card-img-top"
      :alt="product.nama"
    />
    <div class="card-body">
      <h5 class="card-title">{{ product.nama }}</h5>
      <p class="card-text">Harga: Rp {{ product.harga }}</p>
      <router-link :to="'/foods/' + product.id" class="btn btn-success"
        ><b-icon-cart class="mr-2" />Pesan</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
  overflow: hidden;
}
</style>