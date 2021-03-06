import Vue from "vue";
import Router from "vue-router";
import Blog from "./views/Blogs.vue";
import PostDetail from "./components/PostDetail.vue";
import List from "./components/List.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  hash: false,
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    { path: "/", component: Blog },
    { path: "/post/:id", component: PostDetail },
    { path: "/list", component: List },
    { path: '*', redirect: '/' },
  ]
});
