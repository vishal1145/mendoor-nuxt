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
  head: {
    title: 'my website title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
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
