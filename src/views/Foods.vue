<template>
  <div class="foods">
    <Navbar />

    <main class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>Daftar <strong class="text-success">Makanan</strong></h2>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Cari makanan kesukaan anda..."
              aria-label="Cari Makanan"
              aria-describedby="basic-addon1"
              v-model="searchKeywords"
              @keyup="searchFoods"
            />
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <b-icon-search />
              </span>
            </div>
          </div>
        </div>
      </div>

      <h5 v-if="isSearchNull" class="text-center mt-4">
        Sayang sekali, makanan yang anda cari <strong>tidak terdaftar </strong>
        <b-icon-emoji-frown />
      </h5>

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
import CardProduct from "../components/CardProduct.vue";
import axios from "axios";

export default {
  name: "Foods",
  components: {
    CardProduct,
    Navbar,
  },
  data() {
    return {
      products: [],
      searchKeywords: "",
      isSearchNull: false,
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
    setIsSearchNull(condition) {
      this.isSearchNull = condition;
    },
    searchFoods() {
      axios
        .get(`http://localhost:4000/products?q=${this.searchKeywords}`)
        .then((response) => {
          this.setProducts(response.data);

          if (response.data.length === 0) {
            this.setIsSearchNull(true);
          } else {
            this.setIsSearchNull(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        this.setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>