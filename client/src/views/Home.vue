<template>
  <div class="home">
    <h1 class="app-title">ToDo App</h1>
    <LoginComponent />
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
