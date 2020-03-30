<template>
  <div class="posts">
    <h1>POSTS</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div dir="rtl">
        <router-link v-bind:to="{ name: 'addpost' }" class=""><button type="button" class="btn btn-success">Add Post</button></router-link>
      </div>
    <br>
    <div class="card" v-for="post in posts" v-bind:key="post._id">
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <h5 class="card-text">{{ post.content }}</h5>
        <router-link v-bind:to="{ name: 'editpost', params: { id: post._id } }"><button type="button" class="btn btn-primary">EDIT POST</button></router-link> &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="#" @click="deletePost(post._id)"><button type="button" class="btn btn-danger">DELETE</button></a>
      </div>
    </div>
    <br>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'addpost' }" class="add_post_link"><button type="button" class="btn btn-success">Add Post</button></router-link>
    </div>
  </div>
</template>

<script>
import PostsService from '../Warehouse/PostsService';
//import store from '../store';
export default {
  name: 'posts',
  data () {
    return {
      posts: [],
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.myPosts({id: this.$route.params.id})
      this.posts = response.data.posts
    },
    async deletePost (id) {
      PostsService.deletePost(id)
      this.getPosts()
      this.$router.push({ name: 'posts' })
    }
  }
}
</script>
<style type="text/css" scoped>


</style>