<template>
  <div class="pesanan-sukses">
    <Navbar />

    <main class="container">
      <div class="row justify-content-cener mt-5">
        <div class="col text-center">
          <img src="../assets/images/waiting.png" alt="waiting" class="img-fluid">
          <h2><strong>Sukses!</strong></h2>
          <h4>Pesanan Anda segera disproses <br> Selamat Menunggu</h4>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: "PesananSukses",
  components: {
    Navbar
  }
}
</script>

<style scoped>
  img {
    max-width: 320px;
  }
</style>