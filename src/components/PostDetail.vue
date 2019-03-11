<template>
  <article class="col-sm-12">
		<h1>{{ post.title }}</h1>
		<input class="blog-body" :value='post.body' readonly>
		<router-link :to="'/'"><b-button class="btn btn-primaryt">Back</b-button></router-link>
  </article>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
  data() {
    return {
      post: {},
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'blogsData'
    ])
  },
  mounted(){
    	this.post = this.blogsData[this.$route.params.id]
  },
  methods: {
  	// highlightWord(){
  	// 	console.log('gfhrf')
  	// 	var  t = (document.all) ? document.selection.createRange().text : document.getSelection();

   //  alert(t)
  	// }
  }

}
</script>

<style type="scss">
.blog-body{
	width: 100% !important;
    border: none !important;
    font-size: 1rem !important;
    font-weight: 400 !important;
    line-height: 1.5 !important;
    margin-bottom: 1rem !important;
}
</style>
