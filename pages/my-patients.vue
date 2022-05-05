
<template>
  <div>
    <TopBarMessage />
    <TopBar />
    <Header />
    <div class="container">
      <h1 class="pt-5 mt-5 mb-5">{{ $t("my_patients") }}</h1>
    </div>
    <div class="container mb-5 pb-5">
      <div class="container mb-5 pb-5">
        <div class="filter-box mb-4">
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            >
            </b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </div>

        <b-table
          striped
          hover
          bordered
          responsive
          id="my-table"
          :fields="fields"
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
          <template #cell(full_name)="row">
            <router-link
              tag="a"
              :to="`/${$i18n.locale}/user/${row.item.user_uuid}`"
            >
              {{ row.item.full_name }}
            </router-link>
          </template>

          <template #cell(mere_uuid)="row">
            <router-link
              tag="a"
              :to="`/${$i18n.locale}/new-emr?mere=${row.item.mere_uuid}`"
            >
              EMR
            </router-link>
          </template>
        </b-table>

        <div class="pagination-box">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            class="justify-content-center"
          >
          </b-pagination>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/footer";
import TopBarMessage from "@/components/topBarMessage";
import TopBar from "@/components/topBar/";
import Header from "@/components/header/";
import axios from "axios";

export default {
  components: {
    Footer,
    TopBarMessage,
    TopBar,
    Header,
  },
  data: () => ({
    perPage: 10,
    currentPage: 1,
    filter: null,
    filterOn: [],
    fields: [
      {
        key: "mrn",
        label: "MRN",
        sortable: true,
      },
      {
        key: "full_name",
        label: "Patient's Name",
        sortable: false,
      },
      {
        key: "mere_uuid",
        label: "Actions",
        sortable: true,
      },
    ],
    items: [],
    myPatients: [],
  }),
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getMyPatients() {
      this.$store.loader = true;
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        const headers = {
          Authorization: "Bearer " + authData.token,
        };
        axios
          .get(`${process.env.VUE_APP_API_URL}/medical-record/patients`, {
            headers,
          })
          .then((response) => {
            this.items = response.data;
            this.myPatients = response.data;
            this.$store.loader = false;
          })
          .catch((e) => {});
      } catch (e) {}
    },
  },
  mounted() {
    this.getMyPatients();
  },
};
</script>