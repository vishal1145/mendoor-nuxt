
<template>
  <div>
    <div>
      <topBarMessage />
    </div>
    <!-- STRAT NAVBAR -->
    <topBar />
    <Header />
    <div v-scroll-spy>
      <section>
        <div class="container pt-5">
          <h1 class="text-center pt-3 pb-3">Find Doctors</h1>
          <input
            class="form-control"
            type="search"
            name="name"
            id="search-input"
            placeholder="Search by professional name"
            v-model="keyword"
            v-on:keyup="$store.auth.authorized ? myFavourites() : search()"
          /><span
            role="button"
            aria-label="Clear Search Input"
            aria-hidden="true"
          ></span>
          <div
            v-if="doctorsList.length == 0"
            class="alert alert-warning"
            role="alert"
          >
            Not Found!
          </div>
        </div>
      </section>
      <Search
        v-for="doctor in doctorsList"
        :key="doctor.message"
        :post="doctor"
        :myFavDoctors="myFavDoctors"
        :myProfessionalDoctors="myProfessionalDoctors"
      />
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/footer";
import topBarMessage from "@/components/topBarMessage";
import topBar from "@/components/topBar";
import Header from "@/components/header/";
import Search from "@/components/searchCard/";

import axios from "axios";

export default {
  name: "search",
  components: {
    Footer,
    topBarMessage,
    topBar,
    Header,
    Search,
  },
  data: () => ({
    doctorsList: [],
    myFavDoctors: [],
    myProfessionalDoctors: [],
    keyword: "",
  }),
  methods: {
    search() {
      try {
        axios
          .get(
            `${process.env.VUE_APP_USER_API_URL}/search?searchTerm=${this.keyword}&type=MODERATOR`
          )
          .then((response) => {
            this.doctorsList = response.data;
            this.$store.loader = false;
          })
          .catch((e) => {});
      } catch (e) {}
    },
    myFavourites() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        const headers = {
          Authorization: "Bearer " + authData.token,
        };
        axios
          .get(`${process.env.VUE_APP_API_URL}/my-doctor?five=true`, {
            headers,
          })
          .then((response) => {
            this.myFavDoctors = response.data;
            this.getMyProfessional();
          })
          .catch((e) => {});
      } catch (e) {}
    },
    getMyProfessional() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        const headers = {
          Authorization: "Bearer " + authData.token,
        };
        axios
          .get(`${process.env.VUE_APP_API_URL}/my-professional/ids`, {
            headers,
          })
          .then((response) => {
            this.myProfessionalDoctors = response.data;
            this.search();
          })
          .catch((e) => {});
      } catch (e) {}
    },
  },
  async mounted() {
    this.$store.loader = true;
    await this.myFavourites();
    if (!this.$store.auth.authorized) {
      this.search();
    }
  },
};
</script>

<style scoped>
::v-deep .modal-content {
  background-color: #000000;
  color: white;
  background: none;
  border: none;
}
::v-deep .modal-header {
  border: none;
}
::v-deep .modal-backdrop {
  opacity: 0.5;
}
</style>