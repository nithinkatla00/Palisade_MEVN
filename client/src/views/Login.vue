<template>
<div class="container">
    <br><br>
    <form @submit.prevent="loginUser">
    <div class="form-group">
        <label for="Username">Username</label>
        <input type="text" class="form-control" id="username" name="username" v-model="username">
        <small id="username" class="form-text text-muted">We'll never share your details with anyone else.</small>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="Password1" name="password" v-model="password">
    </div>
   
    <button type="submit" class="btn btn-primary">Login</button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/register" class="card-link">Not Registered?</router-link>
</form>
</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let user = {
        username: this.username,
        password: this.password
      };
      this.login(user)
        .then(res => {
          if (res.data.success) {
            this.$router.push("/profile");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>




