<template>
  <!-- Style switcher -->
  <div
    id="style-switcher"
    v-bind:style="isVisible ? 'left: 0px' : 'left: -189px'"
  >
    <div>
      <h3>Select your color</h3>
      <ul class="pattern">
        <li>
          <a
            class="color1"
            href="javascript: void(0);"
            v-on:click="setTheme('cyan')"
          ></a>
        </li>
        <li>
          <a
            class="color2"
            href="javascript: void(0);"
            v-on:click="setTheme('red')"
          ></a>
        </li>
        <li>
          <a
            class="color3"
            href="javascript: void(0);"
            v-on:click="setTheme('green')"
          ></a>
        </li>
        <li>
          <a
            class="color4"
            href="javascript: void(0);"
            v-on:click="setTheme('pink')"
          ></a>
        </li>
        <li>
          <a
            class="color5"
            href="javascript: void(0);"
            v-on:click="setTheme('blue')"
          ></a>
        </li>
        <li>
          <a
            class="color6"
            href="javascript: void(0);"
            v-on:click="setTheme('purple')"
          ></a>
        </li>
        <li>
          <a
            class="color7"
            href="javascript: void(0);"
            v-on:click="setTheme('orange')"
          ></a>
        </li>
        <li>
          <a
            class="color8"
            href="javascript: void(0);"
            v-on:click="setTheme('yellow')"
          ></a>
        </li>
      </ul>
    </div>
    <!-- <div class="bottom">
      <a
        href="javascript: void(0);"
        class="settings rounded-right switcher-1"
        @click="toggleSwitcher('en')"
      >
        <img
          src="@/assets/images/us.png"
          alt=""
          srcset=""
        />
      </a>
      <a
        href="javascript: void(0);"
        class="settings rounded-right switcher-2"
        @click="toggleSwitcher('es')"
      >
        <img
          src="@/assets/images/es.png"
          alt=""
          srcset=""
        />
      </a>
    </div> -->
  </div>
  <!-- end Style switcher -->
</template>

<script>
import "./index.css";
/**
 * Switcher component
 */
export default {
  name: "Switcher",
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    setTheme(theme) {
      document
        .getElementById("color-opt")
        .setAttribute("href", "./css/colors/" + theme + ".css");
    },
    // toggleSwitcher(locale) {
    //   // this.isVisible = !this.isVisible;
    //   this.$i18n.locale = locale;
    //   this.$router.push({
    //     params: { lang: locale },
    //   });
    // },
  },
};
</script>
