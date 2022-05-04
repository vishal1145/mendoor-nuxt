<template>
  <div>
    <div>
      <topBarMessage />
    </div>
    <topBar />
    <Header />
    <!-- <div v-scroll-spy>
      <Slider />
      <CallToAction />
      <Resource />
      <Contact />
      <ChatBox/>
      <Footer />
    </div> -->
  </div>
</template>

<style scoped>
::v-deep .modal-content {
  background-color: #000000;
  color: white;
  background: none;
  border: none;
}
::v-deep .modal-header {
  border: none;
}
::v-deep .modal-backdrop {
  opacity: 0.5;
}
</style>
