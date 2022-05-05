
<template>
  <div class="bg-account-pages">
    <topBarMessage />
    <topBar />
    <Header />
    <MessengerChat />
    <Footer />
  </div>
</template>

<script>
import topBarMessage from "@/components/topBarMessage";
import topBar from "@/components/topBar";
import Header from "@/components/header/";
import MessengerChat from "@/components/messenger-chat";
import Footer from "@/components/footer";

import axios from "axios";

export default {
  name:"Messenge-Main",
  data: () => ({}),
  components: {
    topBarMessage,
    topBar,
    Header,
    MessengerChat,
    Footer,
  },
  mounted() {},
  methods: {},
};
</script>



