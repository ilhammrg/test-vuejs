<template>
  <div class="hero">
    <!-- Mobile -->
    <div class="mobile row mt-4">
      <div class="col-md-6 mb-3">
        <img src="../assets/images/hero.png" alt="hero" width="100%" />
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h2><strong>Delicious Food Menu</strong>, <br>in your Gadget</h2>
        <p>Ayo segera pilih dan pesan makanan favorit Anda</p>
        <router-link class="btn btn-success btn-lg" to="/foods">
          <b-icon-arrow-right />
          Pesan
        </router-link>
      </div>
    </div>

    <!-- Desktop -->
    <div class="desktop row mt-4">
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h2><strong>Delicious Food Menu</strong>, <br>in your Gadget</h2>
        <p>Ayo segera pilih dan pesan makanan favorit Anda</p>
        <router-link class="btn btn-success btn-lg" to="/foods">
          <b-icon-arrow-right />
          Pesan
        </router-link>
      </div>
      <div class="col-md-6">
        <img src="../assets/images/hero.png" alt="hero" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero'
}
</script>

<style scoped>
  .mobile {
    display: block;
  }

  .desktop {
    display: none;
  }

  .btn {
    width: fit-content;
  }

  @media screen and (min-width: 768px) {
    .mobile {
      display: none;
    }

    .desktop {
      display: flex;
    }
  }
</style>