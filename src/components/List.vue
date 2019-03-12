<template>
  <div class>
    <div class="col-sm-12" v-for="word in words">
      <a href="#" @click="matchBlog(word)">{{word}}</a>
    </div>
    <br>
    <div v-for="(blog,i) in wordsBlog">
      <section>
        <span class="blog-title">{{ blog.title }}</span>
        <br>
        <div class="text ellipsis">
          <span class="text-concat">{{ blog.body }}</span>
        </div>
        <router-link :to="'/post/' + (blog.id-1)">
          <b-button class="btn btn-info pull-right">Preview</b-button>
        </router-link>
        <hr>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      words: []
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["wordsList", "wordsBlog"])
  },
  async mounted() {
    this.words = this.wordsList;
  },
  methods: {
    ...mapActions(["matchBlog"])
    // fetchData(word){
    // 	this.matchBlog(word)
    // }
  }
};
</script>
<style type="scss">
</style>