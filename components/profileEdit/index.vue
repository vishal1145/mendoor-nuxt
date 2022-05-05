<template>
  <div class="container">
    <h1 class="text-center pt-3 pb-5 pb-5">EDIT PROFILE</h1>
    <div class="row">
      <div class="col-lg-4 pb-5">
        <div class="profile-card-4 z-depth-3">
          <div class="card">
            <div class="card-body text-center bg-custome rounded-top">
              <div class="user-box">
                <img
                  v-if="this.user_picture"
                  :src="
                    'https://api.text.mednoor.com/profile/' + this.user_picture
                  "
                  alt="user avatar"
                  style="max-width: 104px"
                />
                <img
                  v-else
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="user avatar"
                />
              </div>
              <h5 class="mb-1 text-white">
                {{ this.first_name }} {{ this.last_name }}
              </h5>
              <!-- <h6 class="text-light">{{ this.user.user_first_name }}</h6> -->
            </div>
            <div class="card-body">
              <ul class="list-group shadow-none">
                <!-- <li class="list-group-item">
                  <div class="list-icon">
                    <i class="fa fa-phone-square"></i>
                  </div>
                  <div class="list-details">
                    <span>9910XXXXXX</span>
                    <small>Mobile Number</small>
                  </div>
                </li> -->
                <li class="list-group-item">
                  <div class="list-icon">
                    <i class="fa fa-envelope"></i>
                  </div>
                  <div class="list-details">
                    <span> {{ this.email }}</span>
                    <!-- <small>Email Address</small> -->
                  </div>
                </li>
                <!-- <li class="list-group-item">
                  <div class="list-icon">
                    <i class="fa fa-globe"></i>
                  </div>
                  <div class="list-details">
                    <span>www.example.com</span>
                    <small>Website Address</small>
                  </div>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card z-depth-3">
          <div class="card-body">
            <ul class="nav nav-pills nav-pills-primary nav-justified">
              <li class="nav-item">
                <a
                  href="javascript:void();"
                  data-target="#personal-details"
                  data-toggle="pill"
                  class="nav-link active show"
                  ><i class="icon-note"></i>
                  <span class="hidden-xs text-nowrap">PERSONAL DETAILS</span></a
                >
              </li>
              <!-- <li class="nav-item">
                <a
                  href="javascript:void();"
                  data-target="#profile"
                  data-toggle="pill"
                  class="nav-link"
                  ><i class="icon-user"></i>
                  <span class="hidden-xs text-nowrap">PROFILE PICTURE</span></a
                >
              </li> -->
              <li class="nav-item">
                <a
                  href="javascript:void();"
                  data-target="#security"
                  data-toggle="pill"
                  class="nav-link"
                  ><i class="icon-user"></i>
                  <span class="hidden-xs">SECURITY</span></a
                >
              </li>
              <li class="nav-item" v-if="this.usro_role == 'Professional'">
                <a
                  href="javascript:void();"
                  data-target="#other-details"
                  data-toggle="pill"
                  class="nav-link"
                  ><i class="icon-envelope-open"></i>
                  <span class="hidden-xs text-nowrap"
                    >PROFESSIONAL DETAILS</span
                  ></a
                >
              </li>
            </ul>
            <div class="tab-content p-3">
              <div class="tab-pane active show" id="personal-details">
                <form @submit.prevent="updatePersonalDetails()">
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >{{ $t("fn") }}</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="text"
                        v-model="first_name"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >{{ $t("ln") }}</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="text"
                        v-model="last_name"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Email</label
                    >
                    <div class="col-lg-9">
                      <input
                        disabled
                        class="form-control"
                        type="email"
                        v-model="email"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Phone</label
                    >
                    <div class="col-lg-3">
                      <input
                        class="form-control"
                        type="number"
                        placeholder="Country Code"
                        v-model="country_code"
                      />
                    </div>
                    <div class="col-lg-6">
                      <input
                        class="form-control"
                        type="number"
                        placeholder="Phone Number"
                        v-model="phone"
                      />
                    </div>
                  </div>
                  <div class="form-group row" v-if="this.usro_role == 'User'">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Address</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        placeholder="Street"
                        v-model="address"
                      />
                    </div>
                  </div>
                  <div class="form-group row" v-if="this.usro_role == 'User'">
                    <label
                      class="col-lg-3 col-form-label form-control-label"
                    ></label>
                    <div class="col-lg-3">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        placeholder="City"
                        v-model="city"
                      />
                    </div>
                    <div class="col-lg-3">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        placeholder="State"
                        v-model="state"
                      />
                    </div>
                    <div class="col-lg-3">
                      <input
                        class="form-control"
                        type="number"
                        value=""
                        placeholder="Zip"
                        v-model="zip"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">
                      Change profile
                    </label>
                    <div class="col-lg-9">
                      <input
                        @change="onFileUpload"
                        class="form-control"
                        type="file"
                        id="profile-picture"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      class="col-lg-3 col-form-label form-control-label"
                    ></label>
                    <div class="col-lg-9">
                      <button
                        type="submit"
                        class="btn btn-custom btn-block"
                        :disabled="personalDetailLoader"
                      >
                        <div
                          v-if="personalDetailLoader"
                          class="d-flex justify-content-center"
                        >
                          <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                        <span v-else>{{ $t("save_changes") }}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div
                class="tab-pane"
                id="other-details"
                v-if="this.usro_role == 'Professional'"
              >
                <form @submit.prevent="updateProfessionalDetail()">
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Category</label
                    >
                    <div class="col-lg-9">
                      <select
                        class="form-control"
                        name=""
                        id=""
                        @change="setCategory"
                      >
                        <option
                          v-for="category in categories"
                          :key="category.cate_id"
                          :value="category.cate_id"
                           :selected="
                            professionalDetail.category == category.cate_id
                              ? true
                              : false
                          "
                        >
                          {{ category.cate_category }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Specialty</label
                    >
                    <div class="col-lg-9">
                      <select
                        class="form-control"
                        name=""
                        id=""
                        @change="setSpecialty"
                      >
                        <option
                          v-for="specialty in specialties"
                          :key="specialty.spec_id"
                          :value="specialty.spec_id"
                          :selected="
                            professionalDetail.specialty == specialty.spec_id
                              ? true
                              : false
                          "
                        >
                          {{ specialty.spec_specialty }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >NPI</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        v-model="professionalDetail.npi"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Practice Name</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        v-model="professionalDetail.practice_name"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Medical License</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        v-model="professionalDetail.medical_license"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >License State</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        v-model="professionalDetail.license_state"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Credentials</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        v-model="professionalDetail.credentials"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <h2>Practice Address</h2>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Line 1</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        placeholder="Street"
                        v-model="professionalDetail.line1"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      class="col-lg-3 col-form-label form-control-label"
                    ></label>
                    <div class="col-lg-3">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        placeholder="City"
                        v-model="professionalDetail.city"
                      />
                    </div>
                    <div class="col-lg-3">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        placeholder="State"
                        v-model="professionalDetail.state"
                      />
                    </div>
                    <div class="col-lg-3">
                      <input
                        class="form-control"
                        type="text"
                        value=""
                        placeholder="Zip"
                        v-model="professionalDetail.zip"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      class="col-lg-3 col-form-label form-control-label"
                    ></label>
                    <div class="col-lg-9">
                      <button type="submit" class="btn btn-custome w-100">{{ $t("save_changes") }}</button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="tab-pane" id="security">
                <form @submit.prevent="updateSecurity()">
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Old Password</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="password"
                        value="11111122333"
                        v-model="security.old_password"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Password</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="password"
                        value="11111122333"
                        v-model="security.password"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                      >Confirm password</label
                    >
                    <div class="col-lg-9">
                      <input
                        class="form-control"
                        type="password"
                        value="11111122333"
                        v-model="security.confirm_password"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      class="col-lg-3 col-form-label form-control-label"
                    ></label>
                    <div class="col-lg-9">
                      <button
                        type="submit"
                        class="btn btn-custom btn-block"
                        :disabled="securityLoader"
                      >
                        <div
                          v-if="securityLoader"
                          class="d-flex justify-content-center"
                        >
                          <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                        <span v-else>{{ $t("save_changes") }}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <!-- <div class="tab-pane" id="profile">
                <form
                  @submit.prevent="updateProfilePicture()"
                  enctype="multipart/form-data"
                >
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">
                      Change profile
                    </label>
                    <div class="col-lg-9">
                      <input
                        @change="onFileUpload"
                        class="form-control"
                        type="file"
                        id="profile-picture"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      class="col-lg-3 col-form-label form-control-label"
                    ></label>
                    <div class="col-lg-9">
                      <input
                        type="submit"
                        class="btn btn-custome"
                        value="Save Changes"
                      />
                    </div>
                  </div>
                </form>
              </div> -->
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
    first_name: "",
    last_name: "",
    country_code: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    user_picture: "",
    usro_role: "",
    security: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
    professionalDetail: {
      category: 0,
      city: "",
      credentials: "",
      license_state: "",
      line1: "",
      medical_license: "",
      npi: "",
      practice_name: "",
      specialty: 0,
      state: "",
      zip: "",
    },
    file: "",
    personalDetailLoader: false,
    securityLoader: false,
    categories: [],
    specialties: [],
  }),
  components: {},
  async mounted() {
    this.$store.loader = true;
    this.authUser();
    this.getCategory();
    this.getSpeciality(1);
    this.getProfessionalAddress();
  },
  methods: {
    onFileUpload(event) {
      this.file = event.target.files[0];
    },
    updateProfilePicture() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        let formData = new FormData();
        formData.append("file", this.file);
        if (formData.get("file")) {
          if (authData) {
            const headers = {
              Authorization: "Bearer " + authData.token,
              "Content-Type": "multipart/form-data",
            };

            axios
              .post(`${process.env.VUE_APP_USER_API_URL}/picture`, formData, {
                headers,
              })
              .then((response) => {
                this.authUser();
                notify({
                  text: "Profile Successfull Updated",
                  theme: "green",
                });
                this.personalDetailLoader = false;
              })
              .catch((e) => {
                notify({
                  text: e.response.data.msg,
                  theme: "red",
                });
              });
          }
        } else {
          this.personalDetailLoader = false;
        }
      } catch (e) {
        this.personalDetailLoader = false;
      }
    },
    updatePersonalDetails() {
      try {
        this.personalDetailLoader = true;

        let authData = JSON.parse(localStorage.getItem("auth"));
        const authUpdate = {
          city: this.city,
          country_code: this.country_code,
          first_name: this.first_name,
          is_patient: true,
          last_name: this.last_name,
          line1: this.address,
          phone_no: this.phone,
          state: this.state,
          zip: this.zip,
        };
        if (authData) {
          const headers = {
            Authorization: "Bearer " + authData.token,
          };
          axios
            .put(`${process.env.VUE_APP_USER_API_URL}`, authUpdate, {
              headers,
            })
            .then(async (response) => {
              await this.updateProfilePicture();
              notify({
                text: "Personal Details Successfull Updated",
                theme: "green",
              });
            })
            .catch((e) => {
              notify({
                text: e.response.data.msg,
                theme: "red",
              });
              this.personalDetailLoader = false;
            });
        }
      } catch (e) {
        this.personalDetailLoader = false;
      }
    },
    updateSecurity() {
      try {
        this.securityLoader = true;
        let authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
          const headers = {
            Authorization: "Bearer " + authData.token,
          };
          axios
            .post(
              `${process.env.VUE_APP_USER_API_URL}/change-password`,
              this.security,
              {
                headers,
              }
            )
            .then((response) => {
              notify({
                text: "Now you can sign in using your new password.",
                theme: "green",
              });
              this.securityLoader = false;
            })
            .catch((e) => {
              notify({
                text: e.response.data.msg,
                theme: "red",
              });
              this.securityLoader = false;
            });
        }
      } catch (e) {}
    },
    updateProfessionalDetail() {
      try {
        // this.securityLoader = true;
        let authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
          const headers = {
            Authorization: "Bearer " + authData.token,
          };
          axios
            .put(
              `${process.env.VUE_APP_API_URL}/professional`,
              this.professionalDetail,
              {
                headers,
              }
            )
            .then((response) => {
              notify({
                text: "Professional Detail Updated",
                theme: "green",
              });
              this.securityLoader = false;
            })
            .catch((e) => {
              notify({
                text: e.response.data.msg,
                theme: "red",
              });
              this.securityLoader = false;
            });
        }
      } catch (e) {}
    },
    setUserData(id) {
      try {
        axios
          .get(`${process.env.VUE_APP_USER_API_URL}/${id}`)
          .then((response) => {
            this.city = response.data.addr_city;
            this.country_code = response.data.user_country_code;
            this.first_name = response.data.user_first_name;
            this.last_name = response.data.user_last_name;
            this.address = response.data.addr_line1;
            this.phone = response.data.user_phone_no;
            this.state = response.data.addr_state;
            this.zip = response.data.addr_zip;
            this.email = response.data.user_email;
            this.usro_role = response.data.usro_role;
            this.user_picture = response.data.user_picture;

            this.professionalDetail.category = response.data.profe_cate_id;
            this.professionalDetail.credentials =
              response.data.profe_credentials;
            this.professionalDetail.license_state =
              response.data.profe_license_state;
            this.professionalDetail.medical_license =
              response.data.profe_medical_license;
            this.professionalDetail.npi = response.data.profe_npi;
            this.professionalDetail.practice_name =
              response.data.profe_practice_name;
            this.professionalDetail.specialty = response.data.profe_spec_id;
            this.$store.loader = false;
          })
          .catch((e) => {});
      } catch (e) {}
    },
    authUser() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
          const headers = {
            Authorization: "Bearer " + authData.token,
          };
          axios
            .get(`${process.env.VUE_APP_API_URL}/me`, { headers })
            .then((response) => {
              this.setUserData(response.data.user.uuid);
            })
            .catch((e) => {});
        }
      } catch (e) {}
    },
    getCategory() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
          const headers = {
            Authorization: "Bearer " + authData.token,
          };
          axios
            .get(`${process.env.VUE_APP_API_URL}/category`, { headers })
            .then((response) => {
              this.categories = response.data;
            })
            .catch((e) => {});
        }
      } catch (e) {}
    },
    getSpeciality(id) {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
          const headers = {
            Authorization: "Bearer " + authData.token,
          };
          axios
            .get(`${process.env.VUE_APP_API_URL}/specialty/${id}`, { headers })
            .then((response) => {
              this.specialties =
                response.data.length > 0
                  ? response.data
                  : [{ spec_id: 0, spec_specialty: "No Data Available" }];
            })
            .catch((e) => {});
        }
      } catch (e) {}
    },
    getProfessionalAddress() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
          const headers = {
            Authorization: "Bearer " + authData.token,
          };
          axios
            .get(
              `${process.env.VUE_APP_API_URL}/address?is_patient=${
                this.$store.auth.user.role == "USER"
              }`,
              {
                headers,
              }
            )
            .then((response) => {
              this.professionalDetail.line1 = response.data.addr_line1;
              this.professionalDetail.state = response.data.addr_state;
              this.professionalDetail.city = response.data.addr_city;
              this.professionalDetail.zip = response.data.addr_zip;
            })
            .catch((e) => {});
        }
      } catch (e) {}
    },
    setCategory(e) {
      this.professionalDetail.category = Number(e.target.value);
      this.getSpeciality(e.target.value);
    },
    setSpecialty(e) {
      this.professionalDetail.specialty = Number(e.target.value);
    },
  },
};
</script>
