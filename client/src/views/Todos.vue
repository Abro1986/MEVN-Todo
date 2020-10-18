<template>
  <div class="home">
    <TodosComponent msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import TodosComponent from "@/components/TodosComponent.vue";

export default {
  name: "Todos",
  components: {
    TodosComponent
  }
};
</script>