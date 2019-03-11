import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        blogs: [],
        loaded: 0,
        highlightedWords:['vue','react'],
        matchedBlogs:[]
    },
    getters: {
        blogsData: state => {
            return state.blogs
        },
        loadedBlog:state => { return state.loaded },
        wordsList:state => { return state.highlightedWords },
        wordsBlog:state => { return state.matchedBlogs },
    },
    mutations: {
        setBlogs(state, json) {
            state.blogs = json;
            state.loaded = 1;
        },
        addBlogs(state,data){
        	state.blogs.push(data);
            console.log(state.blogs)
        },
        editBlogs(state,data){
            let pos = data.isEdit;
            delete data.isEdit;
            state.blogs[pos] = data;
            console.log(state.blogs);
        },
        deleteBlogs(state,index){
            state.blogs.splice(index,1);
        },
        setWordsBlog(state,word){
            state.matchedBlogs = state.blogs.filter(function (el) {
              return el.body.indexOf(word) > -1;
            });
            console.log(state.matchedBlogs)
        },
    },
    actions: {
        async getAllBlogs({ commit, state }) {
            await Vue.http.get("http://jsonplaceholder.typicode.com/posts")
                .then(response => response.json(), error => console.log(error))
                .then(json => commit('setBlogs', json), error => console.log(error));
        },
        addBlog({ commit, state },data) {
           commit('addBlogs',data);
        },
        editBlog({ commit, state },data) {
           commit('editBlogs',data);
        },
        deleteBlog({ commit, state },index) {
           commit('deleteBlogs',index);
        },
        matchBlog({ commit, state },word) {
           commit('setWordsBlog',word);
        },
        
    }
})