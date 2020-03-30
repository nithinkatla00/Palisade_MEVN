import Api from './Api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },
  myPosts (params){
    return Api().get('myposts/'+params.id)
  },
  addPost (params) {
    return Api().post('add_post', params)
  },

  updatePost (params) {
    return Api().post('updateposts/'+params.id, params)
  },

  getPost (params) {
    return Api().get('post/'+params.id)
  },

  deletePost (id) {
    return Api().delete('posts/'+id)
  }
}