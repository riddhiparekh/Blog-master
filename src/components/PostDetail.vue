<template>
  <article class="col-sm-12">
    <h1>{{ post.title }}</h1>
    <p  id="bodyText" @dblclick="highlightWord" class="blog-body">{{post.body}}</p>
    <!-- <input id="bodyText" @dblclick="highlightWord" class="blog-body" :value="post.body" readonly> -->
      <p class="note">Note:To highlight words double click on the words in the content you like to be highlighted.</p>
      <b-button class="btn btn-primaryt" @click="$router.go(-1)">Back</b-button>
      
  </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      post: {},
      selectedWord: ""
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["blogsData", "wordsList"])
  },
  mounted() {
    if(!this.blogsData[this.$route.params.id])
      this.$router.push('/')
    this.post = this.blogsData[this.$route.params.id];
  },
  methods: {
    ...mapActions(["addWord"]),
    // For getting selected text in chrome,IE
    highlightWord() {
      this.selectedWord =
        (document.selection && document.selection.createRange().text) ||
        (window.getSelection && window.getSelection().toString());
      if (this.selectedWord == "") {
        this.selectedWord = this.getSelectionText();
      }
      this.$awn.confirm(
        "Do you want to highlight the selected word?",
        this.callAddWord
      );
    },
    // For getting selected text in firefox
    getSelectionText() {
      if (window.getSelection) {
        try {
          var ta = document.activeElement;
          return ta.value.substring(ta.selectionStart, ta.selectionEnd);
        } catch (e) {
          console.log("Cant get selection text");
        }
      }
    },
    // Push the selected word into the store array
    callAddWord() {
      // Check if word is already in list of highlighted words
      this.selectedWord = this.selectedWord.trim();
      if (this.wordsList.includes(this.selectedWord))
        this.$awn.alert("The selected word is already highlighted");
      else {
        var myRegEx = /^[a-z0-9]+$/i;
        var isValid = myRegEx.test(this.selectedWord);
        if (isValid) this.addWord(this.selectedWord);
        else this.$awn.alert("You can highlight only alphanumeric words");
        this.selectedWord = "";
      }
    }
  }
};
</script>

<style type="scss">
</style>
