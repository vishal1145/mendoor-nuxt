<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="rounded-0 border-0">
      <b-card-header
        header-tag="header"
        class="p-0"
        role="tab"
        style="background-color: var(--top-bar-accordion-header-bg)"
      >
        <b-button
          block
          v-b-toggle.accordion-1
          variant="info"
          class="border-0 text-left container"
          style="border-radius: 0 !important; background-color: var(--top-bar-accordion-header-bg)"
          ><img
            src="@/assets/images/tip1.png"
            style="max-width: 5%"
            alt=""
            srcset=""
          />
          <span class="pl-2">News</span>
        </b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" style="background-color: var(--top-bar-accordion-body-bg)">
        <div class="row container m-auto" >
          <div class="col-md-4 p-0" v-for="question_answer in question_answers" :key="question_answer.id">
            <h3 class="pl-2 text-white" >{{question_answer[0].name}}</h3>
            <b-card-body style="padding:0px" class="pl-0" v-for="question in question_answer" :key="question.id">
              <b-card-text class="container">
                <div class="mb-3 d-flex align-items-center">
                  <!-- <img
                    src="@/assets/images/coronavirus-1.png"
                    style="max-width: 15%"
                    alt=""
                    srcset=""
                  /> -->
                </div>
                <p class="text-white" style="margin-bottom:0px">
                  <strong>{{question.question}}</strong><br />
                </p>
                <div class="text-white" style="margin-bottom:0px" v-html="question.answer"></div>
              </b-card-text>
            </b-card-body>
          </div>
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "topBarMessage",
  data(){
    return {
      question_answers : [],
      un_grouped_question_answers: []
    }
  },
  mounted(){
    this.getMainMenus();
  },
  methods:{
     getMainMenus(){
      axios
        .get(`${process.env.VUE_APP_API_URL}/question-answer/get-active-question-answer-categories`)
        .then((response) => {
          if (response && response.data) {
            this.un_grouped_question_answers = response.data;
            this.grouped();
          } else {
            this.question_answers = [];
          }
        })
        .catch((e) => {});
    },
    grouped() {
    const groups = {};
    this.un_grouped_question_answers.forEach(item => {
      groups[item.news_category_id] = groups[item.news_category_id] || [];
      groups[item.news_category_id].push(item);
    })
    this.question_answers = groups;
  }
  }
};
</script>
