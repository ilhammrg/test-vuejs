<template>
  <div class="home">
    <Navbar />

    <main class="container">
      <Hero />

      <div class="row mt-4">
        <div class="col">
          <h2>Best <strong class="text-success">Foods</strong></h2>
        </div>
        <div class="col d-flex justify-content-end align-items-center">
          <router-link to="/foods" class="btn btn-success"
            ><b-icon-eye /> Lihat Semua</router-link
          >
        </div>
      </div>

      <div class="row mb-4">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Hero from "../components/Hero.vue";
import CardProduct from "../components/CardProduct.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Hero,
    CardProduct,
    Navbar,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:4000/best-products")
      .then((response) => {
        this.setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
