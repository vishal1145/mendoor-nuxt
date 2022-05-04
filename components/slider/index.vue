//App.vue

<template>
  <div v-if="sliders && sliders.length">
    <VueSlickCarousel v-bind="settings" ref="carousel">
      <div class="slider-item" v-for="slider in sliders" :key="slider.slid_id">
        <div
          class="slider-bg"
          :style="{
            'background-image': 'url(' + slider.slid_image + ')',
          }"
        >
          <div class="slider-content">
            <h1>{{ slider.slid_title }}</h1>
            <p>
              {{ slider.slid_description }}
            </p>
          </div>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import "./index.css";
import axios from "axios";
export default {
  name: "Slider",
  components: { VueSlickCarousel },
  methods: {
    Prev() {
      this.$refs.carousel.prev();
    },
    showNext() {
      this.$refs.carousel.next();
    },
  },

  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_URL}/slider`)
      .then((response) => {
        if (response && response.data) {
          this.sliders = response.data.map((x) => {
            return {
              ...x,
              slid_image:
                process.env.VUE_APP_API_URL + "/slider/" + x.slid_image,
            };
          });
      
          this.sliders = this.sliders.filter(x=>x.slid_active);
              // console.log( this.sliders)
        } else {
          this.sliders = [
            // {
            //   slid_id: 1,
            //   slid_image: "https://mednoor.com/img/s1.bef93977.png",
            //   slid_title: "Our Commitment to Safe Care",
            //   slid_description:
            //     "We're here when you need us. For everyday care or life-changing care, you can count on us to keep you and your loved ones safe and healthy.",
            // },
          ];
        }
        //  console.log(response);
      })
      .catch((e) => {});
  },
  data() {
    return {
      homePageImageList: [
        {
          imageURL: "@/assets/images/slide_1.jpg",
        },
        {
          imageURL: "@/assets/images/slide_2.jpg",
        },
        {
          imageURL: "@/assets/images/slide_3.png",
        },
      ],
      sliders: [],
      settings: {
        dots: false,
        dotsClass: "slick-dots custom-dot-class",
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: "ondemand",
        fade: true,
      },
    };
  },
};
</script>
