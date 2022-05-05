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

    <section class="height-100vh">
      <div class="display-table">
        <div class="display-table-cell">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card account-card">
                  <div class="card-body">
                    <div class="text-center mt-3">
                      <h3 class="font-weight-bold">
                        <a
                          href="/"
                          class="text-dark text-uppercase account-pages-logo"
                        >
                          <img
                            alt
                            src="@/assets/images/logo.png"
                            style="max-width: 20%"
                          />
                        </a>
                      </h3>
                      <p class="text-muted">Reset Password</p>
                    </div>
                    <div class="p-3" v-if="!emailSend">
                      <div class="alert alert-warning text-center" role="alert">
                        Enter your email address and we'll send you an email
                        with instructions to reset your password.
                      </div>
                      <form @submit.prevent="forget()">
                        <div class="form-group">
                          <label for="email">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            placeholder="Enter Email"
                            v-model="email"
                          />
                        </div>

                        <div class="mt-3">
                          <button
                            type="submit"
                            class="btn btn-custom btn-block"
                          >
                            Reset your Password
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="p-3" v-if="emailSend">
                      <div class="alert alert-warning text-center" role="alert">
                        We have sent you an email with a verification code to
                        <strong>{{ this.email }}</strong>
                      </div>
                      <form @submit.prevent="forget()">
                        <div class="form-group">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Enter the verification code"
                            v-model="code"
                          />
                        </div>

                        <div class="mt-3">
                          <button
                            type="submit"
                            class="btn btn-custom btn-block"
                          >
                            Confirm Code
                          </button>
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
  </div>
</template>

<script>
import topBarMessage from "@/components/topBarMessage";
import topBar from "@/components/topBar";
import Header from "@/components/header/";
import Footer from "@/components/footer";
import axios from "axios";

export default {
  name: "password-forgot",
  components: {
    topBarMessage,
    topBar,
    Header,
    Footer,
  },
  data: () => ({
    email: "",
    emailSend: false,
    code: "",
  }),
  methods: {
    forget() {
      axios
        .post(`${process.env.VUE_APP_USER_API_URL}/forgot-password`, {
          email: this.email,
        })
        .then((response) => {
          this.emailSend = true;
        })
        .catch((e) => {
          notify({
            text: e.response.data.msg,
            theme: "red",
          });
        });
    },
  },
};
</script>