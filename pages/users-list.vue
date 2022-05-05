
<template>
  <div>
    <TopBarMessage />
    <TopBar />
    <Header />
    <div class="container">
      <h1 class="pt-5 mt-5 mb-5">{{ $t("list_usrs") }}</h1>
    </div>
    <div class="container mb-5 pb-5">
      <div class="row">
        <div class="col-md-12">
          <div class="filter-box mb-4">
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
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
            <template #cell(user_date_of_birth)="row">
              {{ $moment(row.item.user_date_of_birth).format("MMMM Do, YYYY") }}
            </template>
            <template #cell(user_phone_no)="row">
              {{
                row.item.user_country_code && "+" + row.item.user_country_code
              }}
              {{ row.item.user_phone_no }}
            </template>
          </b-table>

          <div class="pagination-box">
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
              class="justify-content-center"
            ></b-pagination>
          </div>
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
  computed: {
    rows() {
      return this.items.length;
    },
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
        key: "user_first_name",
        label: "First Name",
        sortable: false,
      },
      {
        key: "user_last_name",
        label: "Last Name",
        sortable: true,
      },
      {
        key: "user_email",
        label: "Email",
        sortable: true,
      },
      {
        key: "user_date_of_birth",
        label: "DOB",
        sortable: true,
      },
      {
        key: "user_phone_no",
        label: "Phone No.",
        sortable: true,
      },
      {
        key: "action",
        label: "Actions",
        sortable: true,
      },
      {
        key: "pro",
        label: "PRO",
        sortable: true,
      },
    ],
    items: [],
  }),
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
          .get(`${process.env.VUE_APP_USER_API_URL}?view=users`, {
            headers,
          })
          .then((response) => {
            this.items = response.data;
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