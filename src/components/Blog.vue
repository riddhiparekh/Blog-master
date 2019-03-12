<template>
  <div class="col-sm-12 blog">
    <span class="blog-heading">Blogs</span>
    <b-button class="btn btn-success pull-right" v-b-modal.modalPrevent>Add New Blog</b-button>
    <router-link to="/list">
      <b-button class="btn btn-warning pull-right">Highlighted Words</b-button>
    </router-link>
    <paginate name="blogs" :list="posts" :per="10" tag="div">
      <section :key="blog.id" v-for="(blog,i) in paginated('blogs')">
        <a href="#" @click="showDetails(i)">
          <span class="blog-title">{{ blog.title }}</span>
        </a>
        <b-button class="btn btn-primary pull-right" @click="editPopUp(i)">
          <i class="fa fa-edit"></i>Edit
        </b-button>
        <b-button class="btn btn-danger pull-right" @click="deletePopUp(i)">
          <i class="fa fa-trash"></i>Delete
        </b-button>
        <!-- <router-link :to="'/post/' + blog.id"><b-button class="btn btn-info pull-right">Read More</b-button></router-link> -->
        <b-button class="btn btn-info pull-right" @click="showDetails(i)">
          <i class="fa fa-info"></i> More
        </b-button>
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
    ></paginate-links>
    <!-- Modal Component -->
    <b-modal
      id="modalPrevent"
      @hidden="handleCancel"
      ref="modal"
      title="Submit your name"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input
          type="text"
          v-validate.disable="'required:true|min:3'"
          data-vv-as="field"
          name="title_field"
          placeholder="Enter blog title"
          v-model="createPost.title"
        />
        <span class="error">{{ errors.first('title_field') }}</span>
        <br>
        <b-form-textarea
          placeholder="Enter content"
          v-validate.disable="'required:true|min:10'"
          data-vv-as="field"
          name="body_field"
          v-model="createPost.body"
        />
        <span class="error">{{ errors.first('body_field') }}</span>
        <br>
        <b-form-input
          type="text"
          v-validate.disable="'required:true|alpha|min:3'"
          data-vv-as="field"
          name="author_field"
          placeholder="Enter your name"
          v-model="createPost.author"
        />
        <span class="error">{{ errors.first('author_field') }}</span>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      posts: [],
      paginate: ["blogs"],
      createPost: {},
      selectClass: ""
    };
  },
  async beforeMount() {
    if (!this.loadedBlog) {
      await this.getAllBlogs().then(() => {
        this.posts = this.blogsData;
      });
    } else {
      this.posts = this.blogsData;
    }
    console.log(this.posts);
    //this.posts = this.reverse(this.posts);
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["blogsData", "loadedBlog", "getId"])
    // updateBlogs() {
    //   return this.blogsData;
    // }
  },
  // watch: {
  //   updateBlogs(newCount, oldCount) {
  //     // this.posts = this.reverse(newCount);
  //     this.posts = Object.assign({}, newCount);
  //     console.log(this.posts);
  //   }
  // },
  methods: {
    ...mapActions(["getAllBlogs", "addBlog", "editBlog", "deleteBlog"]),
    // Modal Ok button click, validates if input are correct than calls the add blog method.
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      this.$validator.validate().then(result => {
        if (result) {
          this.handleSubmit();
        }
      });
    },
    handleCancel() {
      this.createPost = [];
      this.errors.clear();
      console.log(this.errors);
    },
    handleSubmit() {
      if (this.createPost.isEdit >= 0) {
        this.editBlog(this.createPost);
      } else {
        this.createPost.id = this.getId + 1;
        this.createPost.userId = 1;
        this.addBlog(this.createPost);
      }
      this.$nextTick(() => {
        // Wrapped in $nextTick to ensure DOM is rendered before closing
        this.$refs.modal.hide();
        this.createPost = [];
        this.errors.clear();
      });
    },
    editPopUp(index) {
      let arrPos = this.paginate["blogs"].page * 10 + index;
      this.createPost = this.posts[arrPos];
      this.createPost.isEdit = arrPos;
      this.$refs.modal.show();
    },
    // reverse: function(array) {
    //   return array.slice().reverse();
    // },
    deletePopUp(index) {
      let arrPos = this.paginate["blogs"].page * 10 + index;
      console.log(arrPos);
      this.deleteBlog(arrPos);
    },
    showDetails(index) {
      let arrPos = this.paginate["blogs"].page * 10 + index;
      this.$router.push({ path: `/post/${arrPos}` }); // -> /user/123
    }
    // get_selection() {
    //   var txt = "";
    //   if (window.getSelection) {
    //     txt = window.getSelection();
    //   } else if (document.getSelection) {
    //     txt = document.getSelection();
    //   } else if (document.selection) {
    //     txt = document.selection.createRange().text;
    //   }
    //   return txt;
    // },

    // updateClass() {
    //   var t = this.get_selection();
    //   console.log(t);
    //   //this.selectClass = 'highlightText'
    // }
  }
};
</script>

<style type="scss">
</style>
