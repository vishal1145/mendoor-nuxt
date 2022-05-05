
<template>
  <div>
    <div>
      <topBarMessage />
    </div>
    <!-- STRAT NAVBAR -->
    <topBar />
    <Header />
    <div v-scroll-spy>
      <section>
        <div class="container pt-5 pb-5">
          <ProfileCard />
        </div>
      </section>
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/footer";
import topBarMessage from "@/components/topBarMessage";
import topBar from "@/components/topBar";
import Header from "@/components/header/";
import ProfileCard from "@/components/profileCard/";

import axios from "axios";

export default {
  name: "profile",
  components: {
    Footer,
    topBarMessage,
    topBar,
    Header,
    ProfileCard,
  },
  data: () => ({}),
  methods: {},
  mounted() {
  },
};
</script>

