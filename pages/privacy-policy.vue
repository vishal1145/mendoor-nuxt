
<template>
  <div>
    <TopBarMessage />
    <TopBar />
    <Header />
    <div>
        
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/footer";
import TopBarMessage from "@/components/topBarMessage";
import TopBar from "@/components/topBar/";
import Header from "@/components/header/";

export default {
  components: {
    Footer,
    TopBarMessage,
    TopBar,
    Header,
  },
};
</script>