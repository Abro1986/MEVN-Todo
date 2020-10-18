<template>
  <div class="home">
    <SignupComponent msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import SignupComponent from "@/components/SignupComponent.vue";

export default {
  name: "Register",
  components: {
    SignupComponent
  }
};
</script>