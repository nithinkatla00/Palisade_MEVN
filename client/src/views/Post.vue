<template>
  <div class="posts">
    <h1>POSTS</h1>
    <div v-if="posts.length > 0" class="table-wrap">
    <br>
    <div class="card" style="width: ;" v-for="post in posts" v-bind:key="post._id">
      <div class="card-body">
        <h2 class="card-title">title:  {{ post.title }}</h2>
        <h5 class="card-text">Description:  {{ post.content }}</h5>
        <h5 url>{{post.urls}}</h5>
      </div>
    </div>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'addpost' }" class="add_post_link">Add Post</router-link>
    </div>
  </div>
</template>

<script>
import PostsService from '../Warehouse/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data.posts
    }
  }
}
</script>
<style type="text/css" scoped>


</style>