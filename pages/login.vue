
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
      <div class="display-table pt-5 pb-5" id="login">
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
                      <h1 class="">Welcome to Mednoor.</h1>
                    </div>
                    <div class="p-3">
                      <form @submit.prevent="login()">
                        <div class="form-group">
                          <label for="username">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="username"
                            placeholder="Enter Email"
                            v-model="email"
                          />
                        </div>

                        <div class="form-group">
                          <label for="userpassword">Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="userpassword"
                            placeholder="Enter Password"
                            v-model="password"
                          />
                        </div>

                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customControlInline"
                          />
                          <label
                            class="custom-control-label"
                            for="customControlInline"
                            >Remember me</label
                          >
                        </div>

                        <div class="mt-3">
                          <button
                            type="submit"
                            class="btn btn-custom btn-block"
                            :disabled="submitted"
                          >
                            <div v-if="submitted" class="d-flex justify-content-center">
                              <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                              </div>
                            </div>
                            <span v-else>Log In</span>
                          </button>
                        </div>

                        <div class="mt-4 mb-0 text-center">
                          <router-link
                            tag="a"
                            to="/password_forgot"
                            class="text-dark"
                          >
                            <i class="mdi mdi-lock"></i> Forgot your password?
                          </router-link>
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
    <Footer />
    <!-- end account-pages  -->
    <notifications></notifications>
  </div>
</template>

<script>
import topBarMessage from "@/components/topBarMessage";
import topBar from "@/components/topBar";
import Header from "@/components/header/";
import Footer from "@/components/footer";

import axios from "axios";
import Notifications from "@voerro/vue-notifications";

export default {
  data: () => ({
    email: "",
    password: "",
    error: null,
    success: false,
    submitted: false,
  }),
  components: {
    topBarMessage,
    topBar,
    Header,
    Footer,
    Notifications,
  },
  name: "Login",
  mounted() {},
  methods: {
    login() {
      this.submitted = true;
      const auth = { email: this.email, password: this.password };
      // const url = 'https://httpbin.org/basic-auth/foo/bar';
      // this.success = false;
      // this.error = null;
      // const headers = { "Content-Type": "application/json" };
      // axios.post("https://api.text.mednoor.com/user/sign-i", { headers })
      //   .then(response => this.totalVuePackages = response.data.total);

      // const article = { title: "Vue POST Request Example" };
      // const headers = {
      //   Authorization: "Bearer my-token",
      //   "My-Custom-Header": "foobar",
      // };
      axios
        .post(`${process.env.VUE_APP_USER_API_URL}/sign-in`, auth)
        .then((response) => {
          if (response.data.valid) {
            notify({
              text: "Successfully LoggedIn",
              theme: "green",
            });
            window.location.href = `${process.env.VUE_APP_SYSTEM_URL}/en/sign-in?token_exchange=${response.refresh_token}`;
            localStorage.setItem("auth", JSON.stringify(response.data));
            this.$router.push({ name: "Home", params: { lang:this.$i18n.locale  }  });
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
  },
};
</script>



<style scoped>
#login {
  padding: 10rem 0 !important;
  /* border: 6px solid #576eb2; */
}
#login .card-body {
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

#login .row .card {
  max-width: 80%;
  margin: auto;
}
#login .row img {
  display: block;
  margin: auto;
}

@media (max-width: 768px) {
  #login .img-fluid {
    margin-bottom: 50px !important;
  }
  #login {
    padding: 5rem 0 !important;
  }
  #login .row .card {
    max-width: 90%;
  }
}

@media (max-width: 425px) {
  #login .row .card {
    max-width: 100%;
  }

  #login .row .card h1 {
    font-size: 20px;
  }
}
</style>