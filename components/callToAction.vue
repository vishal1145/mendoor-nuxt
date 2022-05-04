<template>
  <!--START TESTIMONIAL-->
  <section class="section pt-5 pb-5" id="testi" data-aos="zoom-in">
    <div class="container">
      <!-- <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <h1 class="section-title text-center">What they've said</h1>
          <div class="section-title-border margin-t-20"></div>
          <p
            class="section-subtitle text-muted text-center font-secondary padding-t-30"
          >The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli.</p>
        </div>
      </div> -->
      <div class="row margin-t-0">
        <div class="col-lg-4 p-0">
          <div class="testimonial-box margin-t-0 border-right">
            <div class="testimonial-decsborder-right banner">
              <div v-html="first_banner"></div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 p-0">
          <div class="testimonial-box margin-t-0 border-right">
            <div class="testimonial-decs banner">
              <div v-html="second_banner"></div>
              <!-- <div class="testi-icon">
                <i class="mdi mdi-format-quote-open display-2"></i>
              </div>
              <img
                src="@/assets/images/location.png"
                class="img-fluid mx-auto d-block mb-4"
              />
              <div class="p-1">
                <h3 class="text-center text-uppercase">
                  Locations & Directions
                </h3>
                <h5 class="text-center mb-3">
                  Find maps and more for all locations.
                </h5>
                <div class="button-effect">
                  <a class="effect effect-5" href="#" title="Learn More">
                    Get Directions
                  </a>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="col-lg-4 p-0">
          <div class="testimonial-box margin-t-0">
            <div class="testimonial-decs banner">
              <div v-html="third_banner"></div>
              <!-- <div class="testi-icon">
                <i class="mdi mdi-format-quote-open display-2"></i>
              </div>
              <img
                src="@/assets/images/appointment1.png"
                class="img-fluid mx-auto d-block mb-4"
              />
              <div class="p-1">
                <h3 class="text-center text-uppercase">Appointments</h3>
                <h5 class="text-center mb-3">
                  More ways than ever to get the care you need.
                </h5>
                <div class="button-effect">
                  <a class="effect effect-5" href="#" title="Learn More">
                    APPOINTMENTS & ACCESS
                  </a>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--END TESTIMONIAL-->
</template>
<script>
import axios from "axios";
export default {
  name: "Call-to-action",
  data(){
    return{
      first_banner:'',
      second_banner:'',
      third_banner:'',
    }
  },
  mounted(){
      axios
        .get(`${process.env.VUE_APP_API_URL}/banners`)
        .then((response) => {
          if (response && response.data ) {
            this.first_banner = response.data.first_banner;
            this.second_banner = response.data.second_banner;
            this.third_banner = response.data.third_banner;
          }
        })
        .catch((e) => {});
  }
};
</script>
