<template>
  <div>
    <div>
      <topBarMessage />
    </div>
    <topBar />
    <Header />
    <div ScrollSpy>
      <Slider />
      <CallToAction />
      <Resource />
      <Contact />
      <ChatPopup/>
      <Footer/>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
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
