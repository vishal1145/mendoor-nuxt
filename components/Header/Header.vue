<template>
  <div>
    <header class="sticky-top bg-white">
      <div class="container-fluid">
        <router-link tag="a" to="/" class="navbar-brand logo text-uppercase d-block w-100">
          <!-- <a
          class="navbar-brand logo text-uppercase d-block w-100"
          href="/"
        > -->
          <img class="d-block m-auto" alt="Logo" src="@/assets/images/logo.png" style="max-width: 8%">

          <!-- <i class="mdi mdi-alien"></i>Mednoor -->
          <!-- </a> -->
        </router-link>
      </div>
      <nav
        id="navbar"
        class="
          navbar navbar-expand-lg navbar-white navbar-custom
          sticky sticky-dark
          shadow-none
        "
      >
        <div class="container-fluid">
          <!-- LOGO -->
          <!-- <a class="navbar-brand logo text-uppercase" href="/">
          <i class="mdi mdi-alien"></i>Mednoor
        </a> -->

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="toggleMenu()"
          >
            <i class="mdi mdi-menu" />
          </button>
          <div
            id="navbarCollapse"
            style="overflow: visible"
            class="collapse navbar-collapse w-100 justify-content-center"
            :class="showMenu"
          >
            <ul id="mySidenav" v-scroll-spy-active="{ class: 'active' }" class="navbar-nav navbar-center m-0">
              <li class="nav-item text-nowrap">
                <router-link class="nav-link text-nowrap" to="/">
                  Home
                </router-link>
              </li>
              <li v-for="submenu in menus" :key="submenu.id" class="nav-item">
                <router-link tag="a" :to="`/${$i18n.locale}/${submenu.url_end_point}`" class="nav-link text-nowrap">
                  {{ submenu.name }}
                </router-link>
              </li>
              <!-- <li class="nav-item text-nowrap">
                <a
                  v-scroll-to="{ el: '#features', offset: -5 }"
                  class="nav-link"
                  data-scroll-spy-id="features"
                  href="javascript: void(0);"
                  >Locations & Directions</a
                >
              </li>
              <li class="nav-item text-nowrap">
                <a
                  v-scroll-to="{ el: '#services', offset: -5 }"
                  class="nav-link"
                  data-scroll-spy-id="services"
                  href="javascript: void(0);"
                  >Patients & Visitors</a
                >
              </li>
              <li class="nav-item text-nowrap">
                <a
                  v-scroll-to="{ el: '#about', offset: -5 }"
                  class="nav-link"
                  data-scroll-spy-id="about"
                  href="javascript: void(0);"
                  >Health Library</a
                >
              </li>
              <li class="nav-item text-nowrap">
                <a
                  v-scroll-to="{ el: '#pricing', offset: -5 }"
                  class="nav-link"
                  data-scroll-spy-id="pricing"
                  href="javascript: void(0);"
                  >Institutes & Departments</a
                >
              </li>
               -->
              <li class="nav-item text-nowrap">
                <a
                  v-scroll-to="{ el: '#contact' }"
                  class="nav-link"
                  data-scroll-spy-id="contact"
                  href="javascript: void(0);"
                >Contact</a>
              </li>
            </ul>
            <!-- <div class="nav-button ml-auto">
            <ul class="nav navbar-nav navbar-right">
              <li>
                <button
                  type="button"
                  class="btn btn-custom navbar-btn btn-rounded"
                >
                  Try it Free
                </button>
              </li>
            </ul>
          </div> -->
          </div>
        </div>
      </nav>
    </header>

    <!-- END NAVBAR -->
    <Loader v-if="$store.loader" />
  </div>
</template>

<script>
import axios from 'axios'
import './index.css'
export default {
  data: () => ({
    showMenu: '',
    menus: []
  }),
  mounted () {
    this.getSubMenus()
  },
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu () {
      // document.getElementById("navbarCollapse").classList.toggle("show");
      this.showMenu == 'show' ? '' : 'show'
    },
    getSubMenus () {
      axios
        .get(`${process.env.VUE_APP_API_URL}/submenu/get-active-submenu`)
        .then((response) => {
          if (response && response.data) {
            this.menus = response.data
          } else {
            this.menus = []
          }
        })
        .catch((e) => { })
    }
  }
}
</script>
