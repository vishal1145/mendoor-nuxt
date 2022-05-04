<template>
  <div class="container d-flex justify-content-center chatBox">
    <div
      class=""
      :class="
        this.showChat
          ? 'card mt-5 popup-box popup-box-show'
          : 'card mt-5 popup-box popup-box-hide'
      "
    >
      <div
        @click="toggleMenu()"
        class=" p-3 adiv text-white text-center chatPopupHeader"
      >
      <i class="mdi mdi-circle" style="font-size: 10px; color: green;"></i> Mednoor Live chat
        <!-- <i class="fas fa-chevron-left"></i> -->
        <!-- <span class="pb-3 ">Live chat</span> -->
        <!-- <i class="fas fa-times"></i> -->
      </div>
      <div class="d-flex flex-row p-3">
        <img
          src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
          width="30"
          height="30"
        />
        <div class="chat ml-2 p-3">
          Hello and thankyou for visiting Mednoor. How may I help you?
        </div>
      </div>
      <!-- <div class="d-flex flex-row p-3">
        <div class="bg-white mr-2 p-3">
          <span class="text-muted"
            >Hello and thankyou for visiting birdlynind.</span
          >
        </div>
        <img
          src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
          width="30"
          height="30"
        />
      </div> -->
      <div class="d-flex flex-row p-3">
        <img
          src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
          width="30"
          height="30"
        />
        <div class="myvideo ml-2">
          <img src="https://imgur.com/GOxU1jx.png" width="200" />
        </div>
      </div>
      <div class="d-flex flex-row p-3">
        <img
          src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
          width="30"
          height="30"
        />
        <div class="chat ml-2 p-3">
          <span class="text-muted dot">. . .</span>
        </div>
      </div>
      <div class="px-3">
        <textarea
          class="form-control"
          rows="5"
          placeholder="Type your message"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import "./index.css";

import axios from "axios";

export default {
  data: () => ({
    showChat: false,
  }),
  components: {},
  mounted() {},
  methods: {
    toggleMenu() {
      this.showChat ? (this.showChat = false) : (this.showChat = true);
    },
  },
};
</script>
