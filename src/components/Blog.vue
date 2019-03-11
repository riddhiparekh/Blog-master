<template>
  <div class="col-sm-12">
    <span class="blog-heading">Blogs </span>
    <b-button class="btn btn-success pull-right" v-b-modal.modalPrevent>Add New Blog</b-button>
    <router-link to="/list"><b-button class="btn btn-warning pull-right">Highlighted Words</b-button></router-link>
    <paginate
      name="blogs"
      :list="posts"
      :per="10"
      tag="div"
    >
      <section v-for="(blog,i) in paginated('blogs')">
        <span class="blog-title">{{ blog.title }} </span>
        <b-button class="btn btn-primary pull-right" @click="editPopUp(i)">Edit</b-button>
        <b-button class="btn btn-danger pull-right" @click="deletePopUp(i)">Delete</b-button>
        <!-- <router-link :to="'/post/' + blog.id"><b-button class="btn btn-info pull-right">Read More</b-button></router-link> -->
        <b-button class="btn btn-info pull-right" @click="showDetails(i)">Read More</b-button>
        <hr>
      </section>
    </paginate>

    <paginate-links
      for="blogs"
      :async="true"
      :show-step-links="true"
      :hide-single-page="true"
      :step-links="{
        next: 'Next',
        prev: 'Previous'
      }"
      :classes="{
        'ul': 'pagination',
        'ul > li': 'page-item',
        'ul > li > a': 'page-link',
      }"  
    >
    </paginate-links>
    <!-- Modal Component -->
    <b-modal
      id="modalPrevent"
      ref="modal"
      title="Submit your name"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text" v-validate="'required:true|min:3'" data-vv-as="field" name="title_field" placeholder="Enter blog title" v-model="createPost.title" />
          <span class="error">{{ errors.first('title_field') }}</span>
        <br>
        <b-form-textarea :class="selectClass" @select="updateClass" placeholder="Enter content" v-validate="'required:true|min:10'" data-vv-as="field" name="body_field" v-model="createPost.body" />
          <span class="error">{{ errors.first('body_field') }}</span>
        <br>
        <b-form-input type="text" v-validate="'required:true|alpha|min:3'" data-vv-as="field" name="author_field" placeholder="Enter your name" v-model="createPost.author" />
          <span class="error">{{ errors.first('author_field') }}</span>
      </form>
    </b-modal>
  </div>
</template>

<script>

import { mapGetters,mapActions } from 'vuex'
export default {
  data () {
    return {
      posts: [],
      paginate: ['blogs'],
      createPost: [],
      selectClass:''
    }
  },
  async mounted(){
    if(!this.loadedBlog){
      await this.getAllBlogs();
      this.posts = this.blogsData;
    }
    else{
      this.posts = this.blogsData;
    }
    this.posts = this.reverse(this.posts);
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'blogsData','loadedBlog'
    ]),
    updateBlogs () {
      return this.blogsData;
      // Or return basket.getters.fruitsCount
      // (depends on your design decisions).
    }
  },
  watch: {
    updateBlogs (newCount, oldCount) {
      // Our fancy notification (2).
      this.posts = this.reverse(newCount)
    }
  },
  methods: {
    ...mapActions(['getAllBlogs','addBlog','editBlog','deleteBlog']),
     handleOk(evt) {
        // Prevent modal from closing
        evt.preventDefault()
        this.$validator.validate().then(result => {
        if (result) {
          this.handleSubmit()
        } else {
        }
      });
      },
    handleSubmit() {
          if(this.createPost.isEdit){
            this.editBlog(this.createPost);
          }
          else{
            this.createPost.id = this.blogsData.length > 0 ? this.blogsData[this.blogsData.length-1].id + 1 : 1;
            this.createPost.userId = 1;
            this.addBlog(this.createPost);
          }
          this.$nextTick(() => {
            // Wrapped in $nextTick to ensure DOM is rendered before closing
          this.$refs.modal.hide()
          this.createPost = [];
      });
    },
    editPopUp(index){
      let arrPos = ((this.paginate['blogs'].page) * 10) + (index);
      this.createPost = this.posts[arrPos];
      this.createPost.isEdit = arrPos;
      this.$refs.modal.show()
    },
    reverse: function (array) {
      return array.slice().reverse()
    },
    deletePopUp(index){
      let arrPos = ((this.paginate['blogs'].page) * 10) + (index);
      this.deleteBlog(arrPos);
    },
    showDetails(index){
      let arrPos = ((this.paginate['blogs'].page) * 10) + (index);
      this.$router.push({ path: `/post/${arrPos}` }) // -> /user/123
    },
    get_selection() {
    var txt = '';
    if (window.getSelection) {
        txt = window.getSelection();
    } else if (document.getSelection) {
        txt = document.getSelection();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    }
    return txt;
    },

    updateClass(){
       var t = this.get_selection();
       console.log(t);
      //this.selectClass = 'highlightText'
    }
  }
}
</script>

<style type="scss">
  .blog-title{
    text-transform: capitalize;
  } 
  .blog-heading{
    font-size: 4rem;
  }
  .pull-right{
    float:right;
    margin-right:10px;
  }
  .error{
    color:#FF0000;
    float: left;
  }
  .highlightText {
        background: yellow;
    }
</style>
