<template>
  <div class="topbar-wrap topbar-style-1 pt-2">
    <div class="ruby-container">
      <pre>

      </pre>
      <div class="topbar-inner container-inner clearfix">
        <div class="topbar-right">
          <div class="topbar-social tooltips">
            <ul class="mb-0">
              <li v-for="mainmenu in menus" :key="mainmenu.id">
                <nuxt-link
                  tag="a"
                  :to="localePath(`/${$i18n.locale}/${mainmenu.url_end_point}`)"
                  class="nav--utility__link mobile-none"
                >
                {{mainmenu.name}}
                </nuxt-link>

              </li>
              <li v-if="this.authorization">
                <div class="dropdown d-inline-block">
                  <a
                    style="border: none"
                    href="javascript:void(0)"
                    class="dropdown-toggle button--small button--search"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      v-if="this.user.picture"
                      :src="
                        'https://api.text.mednoor.com/profile/' +
                        this.user.picture
                      "
                      alt="user avatar"
                      style="max-width: 35px; border-radius: 100%"
                    />
                    <i
                      v-else
                      class="mdi mdi-account-circle"
                      style="font-size: 20px; position: relative; top: 2px"
                    ></i>
                    {{ this.user.user_first_name + " " + this.user.last_name }}
                    <span v-if="this.user.credentials">
                      , {{ this.user.credentials }}
                    </span>
                  </a>
                  <div class="dropdown-menu p-0 rounded-0 user-details-list">
                    <nuxt-link
                      tag="a"
                      :to="localePath(`/${$i18n.locale}/profile/edit`)"
                      class="d-flex m-0 p-0 align-items-center"
                    >
                      <i class="mdi mdi-account-circle"></i>
                      <span>{{ $t("my_profile") }}</span>
                    </nuxt-link>

                    <nuxt-link
                      v-if="this.user.roleTxt == 'Professional'"
                      tag="a"
                      :to="localePath(`/${$i18n.locale}/users-list`)"
                      class="d-flex p-0 m-0 align-items-center"
                    >
                      <i class="mdi mdi-account-group"></i>
                      <span>{{ $t("list_usrs") }}</span>
                    </nuxt-link>

                    <nuxt-link
                      v-if="this.user.roleTxt == 'Professional'"
                      tag="a"
                      :to="localePath(`/${$i18n.locale}/my-patients`)"
                      class="d-flex p-0 m-0 align-items-center"
                    >
                      <i class="mdi">
                        <svg style="width: 20px" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M21 9C19.9 9 19 8.1 19 7S21 3 21 3 23 5.9 23 7 22.1 9 21 9M17.5 7C17.5 6.27 17.91 5.29 18.42 4.34C16.68 2.88 14.44 2 12 2C6.47 2 2 6.5 2 12S6.47 22 12 22C17.5 22 22 17.5 22 12C22 11.45 21.94 10.91 21.86 10.38C21.58 10.45 21.3 10.5 21 10.5C19.07 10.5 17.5 8.93 17.5 7M15.62 7.38L16.68 8.44L15.62 9.5L16.68 10.56L15.62 11.62L13.5 9.5L15.62 7.38M7.32 8.44L8.38 7.38L10.5 9.5L8.38 11.62L7.32 10.56L8.38 9.5L7.32 8.44M15.44 17C14.75 15.81 13.47 15 12 15S9.25 15.81 8.56 17H6.88C7.18 16.24 7.64 15.57 8.22 15L5.24 13.3C4.79 13.56 4.23 13.58 3.75 13.3C3.03 12.89 2.79 11.97 3.2 11.25S4.53 10.29 5.25 10.7C5.73 11 6 11.5 6 12L9.57 14.06C10.3 13.7 11.12 13.5 12 13.5C14.33 13.5 16.32 14.95 17.12 17H15.44Z"
                          />
                        </svg>
                      </i>
                      <span>{{ $t("my_patients") }}</span>
                    </nuxt-link>


                    <nuxt-link
                      tag="a"
                      :to="localePath(`/${$i18n.locale}/search`)"
                      class="d-flex p-0 m-0 align-items-center"
                    >
                      <i class="mdi mdi-contacts"></i>
                      <span>My Appointments</span>
                    </nuxt-link>


                    <nuxt-link
                      v-if="this.user.roleTxt == 'Professional'"
                      tag="a"
                      :to="localePath(`/${$i18n.locale}/my-chats`)"
                      class="d-flex p-0 m-0 align-items-center"
                    >
                      <i class="mdi mdi-note"></i>
                      <span>{{ $t("prev_c_pdf") }}</span>
                    </nuxt-link>



                    <nuxt-link
                      tag="a"
                      :to="localePath(`/${$i18n.locale}/messenger`)"
                      class="d-flex p-0 m-0 align-items-center"
                    >
                      <i class="mdi mdi-forum"></i>
                      <span> Messenger</span>
                    </nuxt-link>



                    <nuxt-link
                      v-if="this.user.roleTxt == 'Professional'"
                      tag="a"
                      :to="localePath(`/${$i18n.locale}/chat-requests`)"
                      class="d-flex p-0 m-0 align-items-center"
                    >
                      <i class="mdi">
                        <svg style="width: 20px" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M5 6C3.9 6 3 6.9 3 8S3.9 10 5 10 7 9.11 7 8 6.11 6 5 6M12 4C10.9 4 10 4.89 10 6S10.9 8 12 8 14 7.11 14 6 13.11 4 12 4M19 2C17.9 2 17 2.9 17 4S17.9 6 19 6 21 5.11 21 4 20.11 2 19 2M3.5 11C2.67 11 2 11.67 2 12.5V17H3V22H7V17H8V12.5C8 11.67 7.33 11 6.5 11H3.5M10.5 9C9.67 9 9 9.67 9 10.5V15H10V20H14V15H15V10.5C15 9.67 14.33 9 13.5 9H10.5M17.5 7C16.67 7 16 7.67 16 8.5V13H17V18H21V13H22V8.5C22 7.67 21.33 7 20.5 7H17.5Z"
                          />
                        </svg>
                      </i>
                      <span> Chat Queue</span>
                    </nuxt-link>


                    <a
                      href="javescript:void(0)"
                      class="d-flex p-0 m-0 align-items-center"
                      @click="logout()"
                    >
                      <i class="mdi mdi-logout"></i>
                      <span>{{ $t("sign_out") }}</span>
                    </a>
                  </div>
                </div>
              </li>

              <!-- <li v-if="this.authorization">
                <router-link
                  tag="a"
                  :to="`/${$i18n.locale}/profile/edit`"
                  class="button--small button--search"
                >
                  <i class="mdi mdi-account-circle" style="font-size: 20px"></i
                  >{{ this.user.user_first_name + " " + this.user.last_name }}
                  <span v-if="this.user.credentials">
                    , {{ this.user.credentials }}
                  </span>
                </router-link>
              </li> -->
              <!-- <li v-if="this.authorization">
                <a
                  style="border: none"
                  href="javescript:void(0)"
                  aria-label="Search"
                  aria-controls="search-box"
                  class="button--small button--search"
                  disablewebedit="True"
                  aria-expanded="false"
                  @click="logout()"
                >
                  <i class="mdi mdi-logout" style="font-size: 20px"></i>
                </a>
              </li> -->
              <li class="dropdown">
                <!-- //Commented Code Aryan -->

              <!-- <a class="button--small dropdown-toggle" type="button" data-toggle="dropdown">{{$i18n.locale.toUpperCase()}}</a> -->
              <ul class="dropdown-menu" style="border:none !important">
                <li  @click="toggleSwitcher('en')">EN</li>
                <br>
                <li @click="toggleSwitcher('es')">ES</li>
              </ul>
            </li>
              <li v-if="!this.authorization">
                <div class="dropdown dropleft d-inline-block">
                  <a
                    style="border: none"
                    href="javascript:void(0)"
                    class="dropdown-toggle button--small button--search"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i
                      class="mdi mdi-account-arrow-left mr-1"
                      style="font-size: 20px"
                    ></i
                    >Login
                  </a>
                  <form
                    id="login-form"
                    class="dropdown-menu p-0 rounded-0"
                    @submit.prevent="login()"
                  >
                    <div class="form-group d-flex m-0 align-items-center">
                      <label class="m-0" for="username"
                        ><i
                          class="mdi mdi-email"
                          style="color: white; font-size: 24px"
                        ></i
                      ></label>
                      <input
                        type="email"
                        class="form-control m-0 rounded-0"
                        id="username"
                        placeholder="Enter Email"
                        v-model="email"
                        autocomplete="off"
                      />
                    </div>

                    <div class="form-group d-flex m-0 align-items-center">
                      <label class="m-0" for="userpassword"
                        ><i
                          class="mdi mdi-lock"
                          style="color: white; font-size: 24px"
                        ></i
                      ></label>
                      <input
                        type="password"
                        class="form-control m-0 rounded-0"
                        id="userpassword"
                        placeholder="Enter Password"
                        v-model="password"
                      />
                    </div>

                    <div class="mt-0">
                      <button
                        type="submit"
                        class="btn btn-custom btn-block rounded-0"
                        :disabled="submitted"
                      >
                        <div
                          v-if="submitted"
                          class="d-flex justify-content-center"
                        >
                          <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                        <!-- <span v-else>{{ $t("sign_in") }}</span> -->
                      </button>
                    </div>
                    <div class="mt-1 mb-1 pl-2 text-center border-bottom-2">
                      <nuxt-link
                        tag="a"
                        :to="localePath(`/${$i18n.locale}/Signup`)"
                        class="text-dark border-0 p-0 m-0 "
                      >
                        {{ $t("dont_h_acc") }} {{ $t("sign_up") }}
                      </nuxt-link>
                <!-- //Commented Code Aryan -->

                    </div>
                    <div class="mt-2 mb-2 text-center">
                      <nuxt-link
                        tag="a"
                        :to="localePath(`/${$i18n.locale}/password_forgot`)"
                        class="text-dark border-0 p-0 m-0"
                      >
                        <i class="mdi mdi-lock"></i> {{ $t("forgot_pwd") }}
                      </nuxt-link>
                <!-- //Commented Code Aryan -->

                    </div>
                  </form>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- end account-pages  -->
    <notifications position="bottom-left"></notifications>
  </div>
</template>

<script>
import "./index.css";

import axios from "axios";
import Notifications from "@voerro/vue-notifications";

export default {
  name: "topBar",
  data: () => ({
    email: "",
    password: "",
    error: null,
    success: false,
    submitted: false,
    authorization: false,
    Notifications,
    user: {},
    menus:[]
  }),
  components: {
    Notifications,
  },
  mounted() {
    this.checkSession();
    this.getMainMenus();
    // this.authUser();
  },

  methods: {
    getMainMenus(){
      axios
        .get(`${process.env.VUE_APP_API_URL}/submenu/get-active-mainmenu`)
        .then((response) => {
          console.log(response)
          if (response && response.data) {
            this.menus = response.data;
          } else {
            this.menus = [];
          }
        })
        .catch((e) => {});
    },
    toggleSwitcher(locale) {
      // this.isVisible = !this.isVisible;
      this.$i18n.locale = locale;
      this.$router.push({
        params: { lang: locale },
      });
    },
    redirectToSignUp() {
      this.$router.push({
        name: "Signup",
        params: { lang: this.$i18n.locale },
      });
    },
    redirectToSignIn() {
      this.$router.push({
        name: "Signin",
        params: { lang: this.$i18n.locale },
      });
    },
    login() {
      this.submitted = true;
      const auth = { email: this.email, password: this.password };
      axios
        .post(`${process.env.VUE_APP_USER_API_URL}/sign-in`, auth)
        .then((response) => {
          if (response.data.valid) {
            notify({
              text: "Successfully LoggedIn",
              theme: "green",
            });
            localStorage.setItem("auth", JSON.stringify(response.data));
            this.setAuthData(response.data);
            // this.authUser();
          }
        })
        .catch((e) => {
          notify({
            text: e.response.data.msg,
            theme: "red",
          });
          this.submitted = false;
        });
    },
    checkSession() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
       // console.log("cc", authData);
        if (authData && authData.session_id) {
          axios
            .post(`${process.env.VUE_APP_USER_API_URL}/token-exchange`, {
              session_id: authData.session_id,
            })
            .then((response) => {
              // console.log(response)
              if (response.data.valid) {
                localStorage.setItem("auth", JSON.stringify(response.data));
                this.setAuthData(response.data);
              }
            })
            .catch((e) => {
               localStorage.removeItem("auth");
            });
        }
      } catch (err) {
        localStorage.removeItem("auth");
      }
    },
    authUser() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
          const headers = {
            Authorization: "Bearer " + authData.token,
          };
          axios
            .get(`${process.env.VUE_APP_USER_API_URL}/me`, { headers })
            .then((response) => {
              this.user = response.data.user;
              this.authorization = true;
              this.$store.auth.authorized = true;
              this.$store.auth.user = this.user;
            })
            .catch((e) => {
              this.authorization = false;
              this.$store.auth.authorized = false;
            });
        }
      } catch (e) {}
    },

    setAuthData(response) {
       window.location.href = `${process.env.VUE_APP_SYSTEM_URL}/en/sign-in?token_exchange=${response.session_id}`;
    },

    logout() {
      localStorage.removeItem("auth");
      this.authorization = false;
      this.$store.auth.authorized = false;
      this.$router.push({ name: "Home", params: { lang: this.$i18n.locale } });
    },
  },
};
</script>
