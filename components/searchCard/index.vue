<template>
  <div class="page-content page-container" id="search-box">
    <div class="padding">
      <div class="row container d-flex justify-content-center m-auto">
        <div class="col-xl-12 col-md-12 p-0">
          <div class="card user-card-full">
            <div class="row m-l-0 m-r-0 align-items-center">
              <div class="col-sm-4 bg-c-lite-green user-profile">
                <router-link
                  tag="a"
                  :to="`/${$i18n.locale}/doctor/` + this.post.uuid"
                  class="text-dark border-0"
                >
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      <img
                        v-if="this.post.user_picture"
                        :src="
                          'https://api.text.mednoor.com/profile/' +
                          this.post.user_picture
                        "
                        class="img-radius"
                        alt="User-Profile-Image"
                        style="max-width: 150px"
                      />
                      <img
                        v-else
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        class="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <h3 class="f-w-600">
                      {{ this.post.user_last_name }},
                      {{ this.post.user_first_name }}
                      {{ this.post.profe_credentials }}
                    </h3>
                  </div>
                </router-link>
              </div>

              <div
                :class="this.$store.auth.authorized ? 'col-sm-5' : 'col-sm-8'"
              >
                <div class="card-block">
                  <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Specialist</h6>
                  <div class="row">
                    <div class="col-sm-12">
                      <p class="m-b-10 f-w-600">{{ this.post.category }}</p>
                    </div>
                  </div>
                  <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                    Address
                  </h6>
                  <div class="row">
                    <div class="col-sm-12">
                      <h6
                        class="text-muted f-w-400"
                        v-if="
                          this.post.addr_line1 ||
                          this.post.addr_city ||
                          this.post.addr_state ||
                          this.post.addr_zip
                        "
                      >
                        {{
                          this.post.addr_line1 ? this.post.addr_line1 + "," : ""
                        }}
                        {{
                          this.post.addr_city ? this.post.addr_city + "," : ""
                        }}
                        {{
                          this.post.addr_state ? this.post.addr_state + "," : ""
                        }}
                        {{ this.post.addr_zip }}
                      </h6>
                      <h6 class="text-muted f-w-400" v-else>Not Available</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-3" v-if="this.$store.auth.authorized">
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
                  class="button-effect mt-3"
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
                  class="button-effect mt-3"
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
  name: "search-card",
  props: ["post", "myFavDoctors", "myProfessionalDoctors"],
  data: () => ({
    myFavFlag: false,
    myProFlag: false,
    myFavIds: [],
    myProIds: [],
  }),
  mounted() {
    this.setMyFavDoctor();
    this.setMyProfessionalDoctor();
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
              `${process.env.VUE_APP_API_URL}/my-doctor/toggle/${this.post.uuid}`,
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
              { professional: this.post.uuid },
              {
                headers,
              }
            )
            .then((response) => {
              this.myProFlag = true
            })
            .catch((e) => {});
        }
      } catch (e) {}
    },
    setMyFavDoctor() {
      this.myFavIds =
        this.myFavDoctors &&
        this.myFavDoctors.map(function (el) {
          return el.mydo_user_uuid;
        });
      this.myFavFlag = this.myFavIds.includes(this.post.uuid);
    },
    setMyProfessionalDoctor() {
      this.myProIds =
        this.myProfessionalDoctors &&
        this.myProfessionalDoctors.map(function (el) {
          return el.professional;
        });
      this.myProFlag = this.myProIds.includes(this.post.uuid);
    },
  },
};
</script>
