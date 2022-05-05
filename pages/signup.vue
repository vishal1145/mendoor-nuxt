
<template>
  <div class="bg-account-pages">
    <!-- <div class="account-home-btn d-none d-sm-block">
      <a href="/" class="text-black">
        <i class="mdi mdi-home h1"></i>
      </a>
    </div> -->
    <topBarMessage />
    <topBar />
    <Header />

    <section>
      <div class="display-table pt-5 pb-5" id="register">
        <div class="display-table-cell">
          <div class="container-fluid">
            <div class="row justify-content-center align-items-center">
              <div class="col-lg-5">
                <img
                  src="@/assets/images/reg-doctor.png"
                  class="img-fluid"
                  alt="doctor"
                />
              </div>
              <div class="col-lg-7">
                <div class="card account-card border-0">
                  <div class="card-body">
                    <div class="p-3">
                      <h3 class="mb-4">Register Here, We Take Care</h3>
                    </div>
                    <div class="p-3">
                      <form @submit.prevent="register()">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label for="firstname">First Name</label>
                              <input
                                v-validate="'required'"
                                :autocomplete="false"
                                type="text"
                                class="form-control"
                                id="firstname"
                                placeholder="First Name"
                                v-model="first_name"
                                name="FistName"
                              />
                              <span v-show="errors.has('FistName')"  class="error-text">{{ errors.first("FistName") }}</span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label for="lastname">Last Name</label>
                              <input
                                v-validate="'required'"
                                :autocomplete="false"
                                type="text"
                                class="form-control"
                                id="lastname"
                                placeholder="Last Name"
                                v-model="last_name"
                                name="LastName"
                              />
                                <span  v-show="errors.has('LastName')" class="error-text">{{ errors.first("LastName") }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="email">Email</label>
                          <input
                            :autocomplete="false"
                            type="email"
                            v-validate="'required|email'"
                            class="form-control"
                            id="email"
                            placeholder="Enter Email"
                            v-model="email"
                            name="email"
                          />
                          <span
                            v-show="errors.has('email')"
                            class="error-text"
                            >{{ errors.first("email") }}</span
                          >
                        </div>
                        <div class="row">
                          <div class="col-md-3">
                            <div class="form-group">
                              <label for="code">Country Code</label>
                              <input
                                v-validate="'required'"
                                maxlength="4"
                                type="number"
                                :autocomplete="false"
                                class="form-control"
                                id="code"
                                placeholder="Enter Conuntry Code"
                                v-model="country_code"
                                name="CountryCode"
                              />
                              <span
                                v-show="errors.has('CountryCode')"
                                class="error-text"
                                >{{ errors.first("CountryCode") }}</span
                              >
                            </div>
                          </div>
                          <div class="col-md-9">
                            <div class="form-group">
                              <label for="number">Phone Number</label>
                              <input
                                v-validate="'required'"
                                name="phone_no"
                                :autocomplete="false"
                                maxlength="10"
                                type="number"
                                class="form-control"
                                id="number"
                                placeholder="Enter Phone Number"
                                v-model="phone_no"
                              />
                              <span
                                v-show="errors.has('phone_no')"
                                class="error-text"
                                >{{ errors.first("phone_no") }}</span
                              >
                            </div>
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="userpassword">Password</label>
                          <input
                            name="Password"
                            v-validate.continues="'required|min:6'"
                            :autocomplete="false"
                            type="password"
                            class="form-control"
                            id="userpassword"
                            placeholder="Enter password"
                            v-model="password"
                          />
                          <li
                            style="list-style: none"
                            class="error-text"
                            v-for="error in errors.collect('Password')"
                            :key="error"
                          >
                            {{ error }}
                          </li>
                        </div>
                        <div class="form-group">
                          <label for="userConfirmPassword"
                            >Confirm Password</label
                          >
                          <input
                            name="ConfirmPassword"
                            v-validate.continues="'required|min:6'"
                            type="password"
                            class="form-control"
                            id="userConfirmPassword"
                            placeholder="Enter Confirm Password"
                            v-model="confirm_password"
                          />
                          <li
                            style="list-style: none"
                            class="error-text"
                            v-for="error in errors.collect('ConfirmPassword')"
                            :key="error"
                          >
                            {{ error }}
                          </li>
                        </div>

                        <div>
                          <b-form-checkbox
                            id="checkbox-1"
                            v-model="status"
                            name="checkbox-1"
                            value="accepted"
                            unchecked-value="not_accepted"
                          >
                            I Agree to the
                            <router-link
                              tag="a"
                              :to="`/${$i18n.locale}/terms-and-conditions`"
                            >
                              <span>Terms and conditions</span>
                            </router-link>
                            &
                            <router-link
                              tag="a"
                              :to="`/${$i18n.locale}/privacy-policy`"
                            >
                              <span>Privacy</span>
                            </router-link>
                          </b-form-checkbox>
                        </div>

                        <div class="mt-3">
                          <button
                            type="submit"
                            class="btn btn-custom btn-block"
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
                            <span v-else> Submit</span>
                          </button>
                        </div>

                        <div class="mt-4 mb-0 text-center">
                          <p class="mb-0">
                            {{ $t("dont_h_acc") }}
                            <router-link tag="a" to="/login" class="text-danger"
                              >Log in
                            </router-link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <!-- end card -->
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
        </div>
      </div>
    </section>
    <br />
    <br />
    <Footer />
    <!-- end account-pages  -->
    <!-- <notifications></notifications> -->
  </div>
</template>

<script>
import topBarMessage from "@/components/topBarMessage";
import topBar from "@/components/topBar";
import Header from "@/components/header/";
import Footer from "@/components/footer";

import axios from "axios";
// import Notifications from "@voerro/vue-notifications";

export default {
  data: () => ({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_no: "",
    country_code: "",
    error: null,
    success: false,
    submitted: false,
    status: "not_accepted",
  }),
  components: {
    topBarMessage,
    topBar,
    Header,
    Footer,
    // Notifications,
  },
  name: "signUp",
  methods: {
    async register() {
      if (this.status == "not_accepted") {
        notify({
          text: "You must agree.",
          theme: "red",
        });

        return false;
      }
      this.submitted = true;

      const auth = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone_no: this.phone_no,
        country_code: this.country_code,
        password: this.password,
        confirm_password: this.confirm_password,
      };

      axios
        .post(`${process.env.VUE_APP_USER_API_URL}/register`, auth)
        .then((response) => {
          if (response.data.length > 0) {
            this.login();
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
    async login() {
      const auth = { email: this.email, password: this.password };
      axios
        .post(`${process.env.VUE_APP_USER_API_URL}/sign-in`, auth)
        .then((response) => {
          if (response.data.valid) {
            window.location.href = `${process.env.VUE_APP_SYSTEM_URL}/en/sign-in?token_exchange=${response.session_id}`;
            localStorage.setItem("auth", JSON.stringify(response.data));
            this.$router.push({
              name: "Home",
              params: { lang: this.$i18n.locale },
            });
          }
        })
        .catch((e) => {});
    },
  },
};
</script>




<style scoped>
#register {
  padding: 10rem 0 !important;
  /* border: 6px solid #576eb2; */
}

.error-text {
  color: #f22435;
  font-size: 13px;
}

#register .card-body {
  box-shadow: 0px 0px 17px -6px rgba(0, 0, 0, 0.75);
  border-radius: 15px;
  /* background: rgb(2, 0, 36); */
  /* background: linear-gradient(
    27deg,
    rgba(2, 0, 36, 0) 0%,
    rgba(89, 108, 255, 0.3897934173669467) 81%,
    rgba(89, 108, 255, 0.7035189075630253) 100%
  ); */
}

.form-control {
  margin-bottom: 0;
}

#register .row .card {
  max-width: 80%;
  margin: auto;
}
#register .row img {
  display: block;
  margin: auto;
}

@media (max-width: 768px) {
  #register .img-fluid {
    margin-bottom: 50px !important;
  }
  #register {
    padding: 5rem 0 !important;
  }
  #register .row .card {
    max-width: 90%;
  }
}

@media (max-width: 425px) {
  #register .row .card {
    max-width: 100%;
  }

  #register .row .card h1 {
    font-size: 20px;
  }
}
</style>