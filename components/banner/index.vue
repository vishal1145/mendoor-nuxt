//App.vue

<template>
  <div class="hero-image"
   :style="{
            'background-image':
              'url(' + require('@/assets/images/s1.png') + ')',
          }"
          >
    <div class="hero-text">
      <h1 style="font-size: 50px">I am Noor</h1>
      <p>And I'm a Doctor</p>
      <!-- <button>Hire me</button> -->
    </div>
  </div>
</template>

<script>
import "./index.css";
export default {
  name: "Banner",
};
</script>
