<template>
  <!-- CONTACT FORM START-->
  <section class="section" id="contact" data-aos="fade-up">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <h1 class="section-title text-center">{{title ? title : 'Get In Touch'}}</h1>
          <div class="section-title-border margin-t-5"></div>
          <p class="section-subtitle text-muted text-center font-secondary padding-t-15 mb-0">
            {{description ? description : 'We thrive when coming up with innovative ideas but also understand that a smart concept should be supported with measurable results.'}}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="mt-4 pt-4">
            <p class="mt-4">
              <span class="h5">Office Address 1:</span>
              <br />
              <span class="text-muted d-block mt-2">
                {{address ? address : '4461 Cedar Street Moro, AR 72368'}}
              </span>
            </p>
            <p class="mt-4">
              <span class="h5">Working Hours:</span>
              <br />
              <span class="text-muted d-block mt-2">
               {{working_hours ? working_hours : '9:00AM To 6:00PM'}}
              </span>
            </p>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="custom-form mt-4 pt-4">
            <div id="message"></div>
            <form method="post" action="php/contact.php" name="contact-form" id="contact-form">
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group mt-2">
                    <input
                      name="name"
                      id="name"
                      type="text"
                      class="form-control"
                      placeholder="Your name*"
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group mt-2">
                    <input
                      name="email"
                      id="email"
                      type="email"
                      class="form-control"
                      placeholder="Your email*"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-group mt-2">
                    <input
                      type="text"
                      class="form-control"
                      id="subject"
                      placeholder="Your Subject.."
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-group mt-2">
                    <textarea
                      name="comments"
                      id="comments"
                      rows="2"
                      class="form-control"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row">

                <div class="col-lg-12 text-right">
                  <btn
                   id="submit"
                   name="send"
                  class="btn btn-primary">Send Message</btn>
                  <!-- <input
                    type="submit"
                    id="submit"
                    name="send"
                    class="submitBnt btn btn-custom"
                    value="Send Message"
                  /> -->
                  <div id="simple-msg"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: 'Contact',
  data(){
    return{
      title:'',
      description:'',
      address:'',
      working_hours:''
    }
  },
  mounted(){
      axios
        .get(`${process.env.VUE_APP_API_URL}/contactinfo`)
        .then((response) => {
          if (response && response.data && response.data[0]) {
            this.title = response.data[0].title;
            this.description = response.data[0].description;
            this.address = response.data[0].address;
            this.working_hours = response.data[0].working_hours;
          }
        })
        .catch((e) => {});
  }
}
</script>
<style>
.btn-primary {
    color: #fff;
    background-color: #455eaa;
    border-color: #455eaa;
}
.btn-primary:hover {
    color: #fff;
    background-color: #455eaa;
    border-color: #455eaa;
}
</style>

