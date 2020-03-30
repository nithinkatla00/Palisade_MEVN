<template>
<div id='app'>
  <Header/>
 <br><br>
    <div class="container">
      <Errors v-if="error" :msg="error"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from './components/Header.vue'
import Errors from "./components/Errors.vue";
export default {
  name:'app',
components: {
    Header,
    Errors
  },
  computed: {
    ...mapGetters(["error"])
  }
};
</script>

<style>

</style>
