<template>
  <div class="hello">
    <div class="container">
      test
    </div>
  </div>
</template>

<script>
import UsersServive from "../UsersService"
export default {
  name: "Hack",
  props: {
    uuid: String
  },
  created: function() {
    UsersServive.verify(this.$route.params.uuid);
    this.$router.replace({ name: "Login" });
  }
};
</script>