<template>
  <div>
    <div v-if="words.length > 0">
      <div class="col-sm-12" v-for="word in words">
        <a href="#" @click="matchBlog(word)">{{word}}</a>
      </div>
    </div>
    <div v-else>
      <span>There are no highlighted words.</span>

      <p class="note">Note:To highlight words open your blog and double click on the words in the content you like to be highlighted.</p>
    </div>

    <br>
    <div v-for="blog in wordsBlog" :key="blog.arrInd">
      <section>
        <div class="row col-md-12">
        <span class="col-md-6 blog-title">{{ blog.title }}</span>
        <p class="col-md-3 text ellipsis">
          <span class="text-concat">{{ blog.body }}</span>
        </p>
        <router-link class="col-md-3" :to="'/post/' + (blog.arrInd)">
          <b-button class="btn btn-info pull-right">Preview</b-button>
        </router-link>
        </div>
        <hr>
      </section>
    </div>
    <b-button class="btn btn-primaryt" @click="$router.go(-1)">Back</b-button>
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
  destroyed(){
    this.flushWordsList();
  },
  methods: {
    ...mapActions(["matchBlog","flushWordsList"])
  }
};
</script>
<style type="scss">
</style>