import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogs: [],
    loaded: 0,
    highlightedWords: ["vue", "react"],
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
      console.log(state.lastId);
    },
    addBlogs(state, data) {
      state.lastId = data.id;
      state.blogs.unshift(data);
    },
    editBlogs(state, data) {
      console.log(data);
      let pos = data.isEdit;
      delete data.isEdit;
      state.blogs[pos] = data;
    },
    deleteBlogs(state, index) {
      state.blogs.splice(index, 1);
    },
    setWordsBlog(state, word) {
      state.matchedBlogs = state.blogs.filter(function(el) {
        return el.body.indexOf(word) > -1;
      });
    },
    addWords(state, word) {
      state.highlightedWords.push(word);
      console.log('in mutation')
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
    }
  }
});
