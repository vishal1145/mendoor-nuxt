<template>
  <div class="container" id="profile-card">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 mt-80">
        <div
          class="card bg-white d-flex align-items-center justify-content-center"
        >
          <div class="w-100">

              <img
                        v-if="this.user.user_picture"
                        :src="
                          'https://api.text.mednoor.com/profile/' +
                          this.user.user_picture
                        "
                        class="rounded-circle"
                        alt="User-Profile-Image"
                        style="max-width: 150px;max-height: 150px;"
                      />
                      <img
                        v-else
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        class="rounded-circle"
                        alt="User-Profile-Image"
                      />
          </div>
          <div class="text-center w-100 pb-3">
            <p class="name">{{this.user.user_first_name}} {{this.user.user_last_name}}</p>
            <div class="mb-4 mt-4">
              <p class="job mr-1" v-if="this.user.profe_specialty"> {{this.user.profe_specialty}}</p>
              <p class="job mr-1" v-if="this.user.cate_category"> {{this.user.cate_category}}</p>
              <p class="job ml-1 hide-mobile"> 
                <i class="mdi mdi-check-decagram" style="font-size: 20px;vertical-align:middle;"></i>
                    {{this.user.usro_role}}
                </p>
            </div>
             <div class="mb-4 mt-4 hide-desktop hide-tablet">
              <p class="job ml-1"> 
                <i class="mdi mdi-check-decagram" style="font-size: 20px;vertical-align:middle;"></i>
                    {{this.user.usro_role}}
                </p>
            </div>
            <div class="row align-items-center pro-detail-box">
              <div class="col-sm-12">
                <p class="dis">
                 <table class="table">
                     <tr>
                         <td>PHONE NUMBER</td>
                         <td v-if="this.user.user_phone_no">+{{this.user.user_country_code}}-{{this.user.user_phone_no}}</td>
                         <td v-else>-</td>
                     </tr>
                     <tr>
                         <td>EMAIL</td>
                         <td>{{this.user.user_email}}</td>
                     </tr>
                      <tr>
                         <td>PRACTICE ADDRESS</td>
                         <td>
                           <span
                          v-if="
                            this.user.addr_line1 ||
                            this.user.addr_city ||
                            this.user.addr_state ||
                            this.user.addr_zip
                          "
                        >
                          {{
                            this.user.addr_line1
                              ? this.user.addr_line1 + ","
                              : ""
                          }}
                          {{
                            this.user.addr_city ? this.user.addr_city + "," : ""
                          }}
                          {{
                            this.user.addr_state
                              ? this.user.addr_state + ","
                              : ""
                          }}
                          {{ this.user.addr_zip }}
                        </span>
                         <span v-else>No address was provided. </span>
                         </td>
                     </tr>
                 </table>
                </p>
              </div>
              <div v-if="this.$store.auth.authorized && this.user.usro_role == 'Professional' " class="col-md-12 action-buttons">

                 <div
                  class="button-effect"
                  @click="toggleMyFavourites()"
                  v-if="this.myFavFlag"
                >
                  <a
                    class="effect"
                    href="javascript:void(0)"
                    title="Learn More"
                  >
                    REMOVE FROM MY DOCTORS
                  </a>
                </div>
                <div class="button-effect" @click="toggleMyFavourites()" v-else>
                  <a
                    class="effect"
                    href="javascript:void(0)"
                    title="Learn More"
                  >
                    ADD TO MY DOCTORS
                  </a>
                </div>
                
               <div
                  v-if="!myProFlag"
                  class="button-effect"
                  @click="sendReqForAppointment()"
                >
                  <a
                    class="effect effect-btn-style"
                    href="javascript:void(0)"
                    title="Learn More"
                  >
                    MAKE APPOINTMENT
                  </a>
                </div>
                <div
                  v-if="myProFlag"
                  class="button-effect"
                  @click="sendReqForAppointment()"
                >
                  <a
                    class="effect effect-btn-style"
                    href="javascript:void(0)"
                    title="Learn More"
                  >
                    APPOINTMENT QUEUED
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./index.css";

import axios from "axios";

export default {
  data: () => ({
    user: [],
    myFavFlag: false,
    myProFlag: false,
    myFavIds: [],
    myProIds: [],
  }),
  components: {},
  mounted() {
    // this.$store.loader = true;
    this.getDoctor();
  },
  methods: {
    toggleMyFavourites() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
          const headers = {
            Authorization: "Bearer " + authData.token,
          };
          axios
            .post(
              `${process.env.VUE_APP_API_URL}/my-doctor/toggle/${this.user.user_uuid}`,
              null,
              {
                headers,
              }
            )
            .then((response) => {
              if (this.myFavFlag) {
                this.myFavFlag = false;
              } else {
                this.myFavFlag = true;
              }
            })
            .catch((e) => {});
        }
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
            this.myFavIds = response.data.map(function (el) {
              return el.mydo_user_uuid;
            });
            this.myFavFlag = this.myFavIds.includes(this.$route.params.id);
          })
          .catch((e) => {});
      } catch (e) {}
    },
    myProfessionalDoctor() {
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
            this.myProIds = response.data.map(function (el) {
              return el.professional;
            });
            this.myProFlag = this.myProIds.includes(this.$route.params.id);
          })
          .catch((e) => {});
      } catch (e) {}
    },
    sendReqForAppointment() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
          const headers = {
            Authorization: "Bearer " + authData.token,
          };
          axios
            .post(
              `${process.env.VUE_APP_API_URL}/my-professional`,
              { professional: this.$route.params.id },
              {
                headers,
              }
            )
            .then((response) => {
              myProFlag = true;
            })
            .catch((e) => {});
        }
      } catch (e) {}
    },
    getDoctor() {
      try {
        axios
          .get(`${process.env.VUE_APP_USER_API_URL}/${this.$route.params.id}`)
          .then(async (response) => {
            this.user = response.data;
            await this.myFavourites();
            await this.myProfessionalDoctor();
            // this.$store.loader = false;
          })
          .catch((e) => {});
      } catch (e) {}
    },
  },
};
</script>
