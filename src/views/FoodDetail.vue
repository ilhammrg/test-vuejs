<template>
  <div class="food-detail">
    <Navbar />

    <main class="container">
      <!-- breadcrumb -->
      <div class="row mt-5">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link class="text-success" to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link class="text-success" to="/foods"
                  >Foods</router-link
                >
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <strong>{{ product.nama }}</strong>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- food detail -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <img
            class="img-fluid shadow"
            :src="'../assets/images/' + product.gambar"
            :alt="product.nama"
          />
        </div>
        <div class="col-md-6">
          <h2 class="font-weight-bold">{{ product.nama }}</h2>
          <hr />
          <p>
            Harga: <strong>Rp. {{ product.harga }}</strong>
          </p>

          <!-- order form -->
          <form v-on:submit.prevent>
            <div class="form-group">
              <label for="jumlah-pesanan">Jumlah Pesanan:</label>
              <input
                type="number"
                min="1"
                class="form-control"
                id="jumlah-pesanan"
                placeholder="Jumlah pesanan, misal: 1, 2, dll..."
                v-model="pesan.jumlah_pesanan"
              />
            </div>
            <div class="form-group">
              <label for="keterangan">Keterangan:</label>
              <textarea
                type="text"
                class="form-control"
                id="keterangan"
                placeholder="Keterangan, misal: Pedas, Nasi Setengah, dll..."
                v-model="pesan.keterangan"
              />
            </div>
            <button type="submit" class="btn btn-success" @click="pemesanan">
              <b-icon-cart />
              Pesan
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  name: "FoodDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      product: {},
      pesan: {
        jumlah_pesanan: 1,
        keterangan: "",
        product: {},
      },
    };
  },
  methods: {
    setProduct(product) {
      this.product = product;
    },
    pemesanan() {
      if (this.pesan.jumlah_pesanan) {
        this.pesan.product = this.product;
        axios
          .post("http://localhost:4000/keranjangs", this.pesan)
          .then(() => {
            this.$router.push({ path: "/keranjang" });
            this.$toast.success("Pesanan masuk keranjang!", {
              position: "top-right",
              type: "success",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch(() => {
            this.$toast.error("Pesanan gagal, coba lagi!", {
              position: "top-right",
              type: "error",
              duration: 3000,
              dismissible: true,
            });
          });
      } else {
        this.$toast.error("Jumlah pesanan harus diisi!", {
          position: "top-right",
          type: "error",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    axios
      .get(`http://localhost:4000/products/${this.$route.params.id}`)
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped>
.breadcrumb {
  background-color: transparent;
  padding: 0;
}

img {
  border-radius: 1rem;
}
</style>