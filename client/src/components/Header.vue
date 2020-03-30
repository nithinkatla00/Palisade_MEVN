<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="header">
    <router-link class="navbar-brand"  to="/">PALISADE</router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="/profile" class="nav-link">Profile</router-link>
        </li>
         <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link v-bind:to="{ name: 'myposts', params: { id: user._id }}" class="nav-link">MyPosts</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/technologies" class="nav-link">Technologies</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
        <a to="/logout" class="nav-link" @click.prevent="logoutUser"><button>Logout</button></a>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn","user"])
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    }
  }
};
</script>
<style>
</style>

