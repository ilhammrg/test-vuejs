<template>
  <div class="keranjang">
    <Navbar :key="keranjangs.length" />

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
                <strong>Keranjang</strong>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col">
          <h2>Keranjang <strong class="text-success">Saya</strong></h2>
        </div>
      </div>

      <div class="row table-responsive mt-2">
        <table class="col table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Foto</th>
              <th scope="col">Pesanan</th>
              <th scope="col">Jumlah</th>
              <th scope="col">Keterangan</th>
              <th scope="col">Harga</th>
              <th scope="col">Total Harga</th>
              <th scope="col">Hapus</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <img
                  class="img-fluid shadow"
                  :src="'../assets/images/' + keranjang.product.gambar"
                  :alt="keranjang.product.nama"
                />
              </td>
              <td class="font-weight-bold">{{ keranjang.product.nama }}</td>
              <td>{{ keranjang.jumlah_pesanan }}</td>
              <td>
                {{ keranjang.keterangan ? keranjang.keterangan : "-" }}
              </td>
              <td>Rp. {{ keranjang.product.harga }}</td>
              <td class="font-weight-bold">
                Rp. {{ keranjang.product.harga * keranjang.jumlah_pesanan }}
              </td>
              <td>
                <button class="btn" @click="hapusItem(keranjang.id)">
                  <b-icon-trash class="text-danger" />
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="6" align="right">
                <strong>Total Harga :</strong>
              </td>
              <td colspan="2">
                <strong>Rp. {{ totalHarga }}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row">
        <div class="offset-md-8 col-md-4">
          <form v-on:submit.prevent>
            <div class="form-group">
              <label for="nama-pemesan">Nama:</label>
              <input
                type="text"
                min="1"
                class="form-control"
                id="nama-pemesan"
                placeholder="Tulis nama anda..."
                v-model="pesanan.nama"
              />
            </div>
            <div class="form-group">
              <label for="nomor-meja">Nomor meja:</label>
              <input
                type="text"
                class="form-control"
                id="nomor-meja"
                placeholder="Tulis nomor meja anda..."
                v-model="pesanan.nomorMeja"
              />
            </div>
            <button type="submit" class="btn btn-success float-right" @click="checkout">
              <b-icon-cart />
              Checkout
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";

export default {
  name: "Keranjang",
  components: {
    Navbar,
  },
  data() {
    return {
      keranjangs: [],
      totalHarga: 0,
      pesanan: {
        nama: '',
        nomorMeja: '',
        keranjangs: []
      }
    };
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
    },
    countTotalHarga() {
      this.totalHarga = this.keranjangs.reduce(
        (accu, keranjang) =>
          accu + keranjang.product.harga * keranjang.jumlah_pesanan,
        0
      );
    },
    hapusItem(id) {
      axios
        .delete(`http://localhost:4000/keranjangs/${id}`)
        .then(() => {
          this.$toast.error("Item dihapus!", {
            position: "top-right",
            type: "error",
            duration: 3000,
            dismissible: true,
          });
        })
        .catch((error) => {
          this.$toast.error("Gagal menghapus, coba lagi!", {
            position: "top-right",
            type: "error",
            duration: 3000,
            dismissible: true,
          });
          console.log(error);
        })
        .then(() => {
          this.getKeranjangs();
        });
    },
    getKeranjangs() {
      axios
        .get("http://localhost:4000/keranjangs")
        .then((response) => this.setKeranjangs(response.data))
        .then(() => this.countTotalHarga())
        .catch((error) => console.log(error));
    },
    submitPesanan() {
      this.pesanan.keranjangs = this.keranjangs;
      axios
      .post("http://localhost:4000/pesanans", this.pesanan)
      .then(() => {
        this.$toast.success("Sukses memesan!", {
          position: "top-right",
          type: "success",
          duration: 3000,
          dismissible: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.$toast.error("Gagal memesan, coba lagi beberapa saat!", {
          position: "top-right",
          type: "error",
          duration: 3000,
          dismissible: true,
        });
      });
    },
    checkout() {
      if (this.pesanan.nama && this.pesanan.nomorMeja) {
        this.submitPesanan();

        this.keranjangs.forEach((item) => this.clearKeranjangs(item.id));

        this.$router.push({ path: "/pesanan-sukses" });
      } else {
        this.$toast.error("Nama dan nomor meja harus diisi!", {
          position: "top-right",
          type: "error",
          duration: 3000,
          dismissible: true,
        });
      }
    },
    clearKeranjangs(id) {
      axios
        .delete(`http://localhost:4000/keranjangs/${id}`)
        .catch((error) => console.log(error));
    }
  },
  mounted() {
    this.getKeranjangs();
  },
};
</script>

<style scoped>
.breadcrumb {
  background-color: transparent;
  padding: 0;
}

img {
  max-width: 128px;
  border-radius: 1rem;
}

@media screen and (max-width: 572px) {
  .table {
    display: block;
    max-width: 100vw;
  }
}
</style>