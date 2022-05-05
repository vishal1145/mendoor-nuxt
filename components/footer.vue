<template>
  <div>
    <!--START FOOTER-->
    <footer
      class="footer"
      :style="{
        backgroundImage:
          'url(' +
          require('@/assets/images/footer-bg.png') +
          ') ',
      }"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 margin-t-20">
            <h4>Support</h4>
            <div class="text-muted margin-t-20">
              <ul class="list-unstyled footer-list">
                <!-- <li>
                  <a href>FAQ</a>
                </li>
                <li>
                  <a href>Contact</a>
                </li>
                <li>
                  <a href>Disscusion</a>
                </li> -->
                <li v-for="footermenu in footer_support_menu" :key="footermenu.id">
                  <nuxt-link :to="`/${$i18n.locale}/dynamic-page?slug=${footermenu.url_end_point}`">
                    {{footermenu.name}}
                  </nuxt-link>
                  <!-- Aryan -->
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 margin-t-20">
            <h4>QUICK LINKS</h4>
            <div class="text-muted margin-t-20">
              <ul class="list-unstyled footer-list">
                <li v-for="footermenu in footer_quick_menu" :key="footermenu.id">
                  <nuxt-link :to="`/${$i18n.locale}/dynamic-page?slug=${footermenu.url_end_point}`">
                    {{footermenu.name}}
                  </nuxt-link>
                  <!-- Aryan -->
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 margin-t-20">
            <h4>Information</h4>
            <div class="text-muted margin-t-20">
              <ul class="list-unstyled footer-list">
                <li>
                  <nuxt-link
                    tag="a"
                    :to="`/${$i18n.locale}/terms-and-conditions`"
                  >
                    <span>{{ $t("terms_cond") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link tag="a" :to="`/${$i18n.locale}/privacy-policy`">
                     <span>{{ $t("privacy_p") }}</span>
                  </nuxt-link>
                  <!-- Aryan -->
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!--END FOOTER-->

    <!--START FOOTER ALTER-->
    <div class="footer-alt">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="float-left pull-none">
              <p class="copy-rights text-white mb-3 mb-sm-0">
                {{ new Date().getFullYear() }} © Mednoor
              </p>
            </div>
            <div class="float-right pull-none">
              <ul class="list-inline social m-0">
                <li class="list-inline-item">
                  <a href class="social-icon">
                    <i class="mdi mdi-facebook"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href class="social-icon">
                    <i class="mdi mdi-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href class="social-icon">
                    <i class="mdi mdi-linkedin"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href class="social-icon">
                    <i class="mdi mdi-google-plus"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href class="social-icon">
                    <i class="mdi mdi-dribbble"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
    <!--START FOOTER ALTER-->
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Footer",
  data(){
    return{
      footer_quick_menu:[],
      footer_info_menu:[],
      footer_support_menu:[]
    }
  },
  mounted(){
    this.getFooterMenu();
  },
  methods:{
      getFooterMenu(){
        axios
          .get(`${process.env.VUE_APP_API_URL}/submenu/get-active-footermenu`)
          .then((response) => {
            if (response && response.data) {
             const footer_menu = response.data;
             this.footer_quick_menu = footer_menu.filter(menu => menu.type.includes('footer_quick_menu'));
             this.footer_support_menu = footer_menu.filter(menu => menu.type.includes('footer_support_menu'));
             this.footer_info_menu = footer_menu.filter(menu => menu.type.includes('footer_info_menu'))
            } else {
              this.footer_menu = [];
            }
          })
          .catch((e) => {});
      }
  }
};
</script>
