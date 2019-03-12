import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogs: [],
    loaded: 0,
    highlightedWords: [],
    matchedBlogs: [],
    lastId: ""
  },
  getters: {
    blogsData: state => {
      let rows = state.blogs;
      return rows;
    },
    loadedBlog: state => {
      return state.loaded;
    },
    getId: state => {
      return state.lastId;
    },
    wordsList: state => {
      return state.highlightedWords;
    },
    wordsBlog: state => {
      let rows = state.matchedBlogs;
      return rows;
    }
  },
  mutations: {
    setBlogs(state, json) {
      // Keeping only 20 records
      json.length = 20;
      state.blogs = json;
      state.loaded = 1;
      state.lastId = json[json.length - 1].id;
    },
    addBlogs(state, data) {
      state.lastId = data.id;
      state.blogs.unshift(data);
    },
    editBlogs(state, data) {
      let pos = data.isEdit;
      delete data.isEdit;
      state.blogs[pos] = data;
    },
    deleteBlogs(state, index) {
      state.blogs.splice(index, 1);
    },
    setWordsBlog(state, word) {
      // state.matchedBlogs = state.blogs.filter(function(el) {
      //   return el.body.indexOf(word) > -1;
      // });
      state.matchedBlogs = [];
      let tempBlog;
      for (let i = 0; i < state.blogs.length; i++) {
        let wordIndex = state.blogs[i].body.includes(word);
        if (wordIndex) {
          let snipText = ''
          if(wordIndex > 61)
            snipText = state.blogs[i].body.slice(0,61)+state.blogs[i].body.slice(wordIndex,wordIndex+61)+state.blogs[i].body.slice(wordIndex+61)
          else
          snipText = state.blogs[i].body.slice(wordIndex-1,wordIndex+61)+state.blogs[i].body.slice(wordIndex+61,wordIndex+122)
          tempBlog = state.blogs[i];
          tempBlog.arrInd = i;
          tempBlog.body = snipText;
          state.matchedBlogs.push(tempBlog);
        }
      }
    },
    addWords(state, word) {
      state.highlightedWords.push(word);
    },
    flushWordList(state){
      state.matchedBlogs = [];
    }
  },
  actions: {
    async getAllBlogs({ commit }) {
      await Vue.http
        .get("http://jsonplaceholder.typicode.com/posts")
        .then(response => response.json(), error => console.log(error))
        .then(json => commit("setBlogs", json), error => console.log(error));
    },
    addBlog({ commit }, data) {
      commit("addBlogs", data);
    },
    editBlog({ commit }, data) {
      commit("editBlogs", data);
    },
    deleteBlog({ commit }, index) {
      commit("deleteBlogs", index);
    },
    matchBlog({ commit }, word) {
      commit("setWordsBlog", word);
    },
    addWord({ commit }, word) {
      commit("addWords", word);
    },
    flushWordsList({ commit }) {
       commit("flushWordList");
    }
  }
});
