<template>
  <div class="home">
    <TodosComponent />
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