<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <LoginComponent msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "Home",
  components: {
    LoginComponent
  }
};
</script>
