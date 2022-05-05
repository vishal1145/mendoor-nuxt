<template>
    <div v-html="page">
    </div>
</template>
<script>
import axios from "axios";
export default {
    name:'dynamicPage',
    data(){
        return {
            page:''
        }
    },
    mounted(){
        this.getPageDetail();
    },
    methods:{
        getPageDetail(){
        if(this.$route.query.slug){
        axios
            .get(`${process.env.VUE_APP_API_URL}/page/slug/${this.$route.query.slug}`)
            .then((response) => {
            if (response && response.data && response.data.result.data) {
                this.page = response.data.result.data.page_content;
            } else {
                this.page = '';
            }
            })
            .catch((e) => {});
        }else {
            this.$toast.show("Slug not found");
        }
        }
    }
}
</script>
