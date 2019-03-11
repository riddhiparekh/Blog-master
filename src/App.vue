<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/blogs">Blogs</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css";
@import "https://fonts.googleapis.com/css?family=Poppins";
#app {
  font-family: 'Poppins';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
