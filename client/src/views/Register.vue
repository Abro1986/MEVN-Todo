<template>
  <div class="home">
    <h1 class="app-title">ToDo App</h1>
    <SignupComponent />
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