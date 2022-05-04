<template>
  <!--START GET STARTED-->
  <section class="bg-get-start resource-section">
    <div class="patient_provider_section">
      <div class="row">
        <div class="col-lg-6 text-center custom-bg-1 p-5" data-aos="fade-up">
          <!-- <i
            class="mdi mdi-account-multiple"
            style="font-size: 100px; color: white"
          ></i>
          <h1 class="get-started-title text-white">FOR PATIENTS</h1>
          <div class="section-title-border margin-t-20 bg-white"></div>
          <p class=" section-subtitle font-secondary text-white text-center padding-t-30">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
          <a href="#" class="btn btn-bg-white margin-t-20" style="border-radius: 100px">
            View All Patient Resources
            <i class="mdi mdi-arrow-right"></i>
          </a>
          <div class="pb-4"></div> -->
           <div v-html="main_menu_text.mate_text"></div>
        </div>
        <div class="col-lg-6 text-center custom-bg-2 p-5" data-aos="fade-up">
         <div v-html="main_menu_text.mate_text_b"></div>
          <!-- <i class="mdi mdi-account-plus" style="font-size: 100px; color: white"></i>
          <h1 class="get-started-title text-white">FOR PROVIDERS</h1>
          <div class="section-title-border margin-t-20 bg-white"></div>
          <p class="section-subtitle font-secondary text-white text-center padding-t-30">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
          <a href="#" class="btn btn-bg-white margin-t-20" style="border-radius: 100px">
            View All Provider Resources
            <i class="mdi mdi-arrow-right"></i>
          </a>
          <div class="pb-4"></div> -->

        </div>
      </div>
    </div>
  </section>
  <!--END GET STARTED-->
</template>
<script>
import axios from "axios";
import "./index.css";
export default {
  name: "Resource",
  data(){
    return {
      main_menu_text :''
    }
  },
   mounted(){
    this.getMainSectionText();
  },
  methods:{
     getMainSectionText(){
      axios
        .get(`${process.env.VUE_APP_API_URL}/main-text`)
        .then((response) => {
          if (response && response.data) {
            this.main_menu_text = response.data;
          } else {
            this.main_menu_text = '';
          }
        })
        .catch((e) => {});
    }
  }
}
</script>
<style>
 .patient_provider_section img{
   max-width: 300px !important;
   max-height: 200px !important;
 }
</style>