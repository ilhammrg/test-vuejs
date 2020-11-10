<template>
  <header class="container">
    <b-navbar class="row" toggleable="lg" type="light">
      <b-navbar-brand href="#">Kulineran</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/foods">Foods</router-link>
          </li>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <li class="nav-item">
            <router-link
              class="nav-link d-flex align-items-center"
              to="/keranjang"
            >
              <span class="mr-2">Keranjang</span>
              <b-icon-bag></b-icon-bag>
              <span class="badge badge-success ml-2">{{ jumlahPesanan }}</span>
            </router-link>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      jumlahPesanan: 0,
    };
  },
  methods: {
    setJumlahPesanan(jumlah_pesanan) {
      this.jumlahPesanan = jumlah_pesanan;
    },
  },
  mounted() {
    axios
      .get("http://localhost:4000/keranjangs")
      .then((response) => this.setJumlahPesanan(response.data.length))
      .catch((error) => console.log(error));
  },
};
</script>