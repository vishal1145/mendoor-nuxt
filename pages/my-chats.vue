
<template>
  <div>
    <TopBarMessage />
    <TopBar />
    <Header />
    <div class="container">
      <h1 class="pt-5 mt-5 mb-5">{{ $t("prev_c_pdf") }}</h1>
    </div>
    <div class="container mb-5 pb-5">
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
              <template #cell(fn2)="row">
                <router-link
                  tag="a"
                  :to="`/${$i18n.locale}/user/${row.item.uuid2}`"
                >
                  {{ row.item.fn2 }} {{ row.item.ln2 }}
                </router-link>
              </template>

              <template #cell(prco_date)="row">
                {{ $moment(row.item.prco_date).format("MMMM Do YYYY") }}
              </template>

              <template #cell(prco_pdf)="row">
                <a
                  :href="`https://api.text.mednoor.com/generated/${row.item.prco_pdf}`"
                  target="_blank"
                >
                  Download PDF
                </a>
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
        key: "fn2",
        label: "Chat With",
        sortable: true,
      },
      {
        key: "prco_date",
        label: "Date",
        sortable: false,
      },
      {
        key: "prco_pdf",
        label: "PDF",
        sortable: true,
      },
    ],
    items: [],
    chatData: [],
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
    getPreviousChat() {
      this.$store.loader = true;
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        const headers = {
          Authorization: "Bearer " + authData.token,
        };
        axios
          .get(`${process.env.VUE_APP_API_URL}/previous-chats`, {
            headers,
          })
          .then((response) => {
            this.items = response.data;
            this.chatData = response.data;
            this.$store.loader = false;
          })
          .catch((e) => {});
      } catch (e) {}
    },
  },
  mounted() {
    this.getPreviousChat();
  },
};
</script>