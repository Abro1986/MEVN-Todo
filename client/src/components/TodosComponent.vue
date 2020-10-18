<template>
  <div class="container">
    <h1>Your Todos</h1>
    <div class="create-post">
      <label for="create-post">Talk to me Goose</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a Todo">
      <button v-on:click="createPost" class="create-post">SEND IT!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(todo, index) in todos"
        v-bind:item="todo"
        v-bind:index="index"
        v-bind:key="todo._id"
        v-on:dblclick="deletePost(todo._id)"
      > 
        {{ `${todo.createdAt.getDate()}/${todo.createdAt.getMonth()}/${todo.createdAt.getFullYear()}` }}
        <p class="text">{{ todo.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import TodosService from '../TodosService';

export default {
  name: 'TodoComponent',
  // props: {
  //   msg: String
  // }
  data() {
    return {
      todos: [],
      error: '',
      text: '',

    }
  },
  async created() {
    try {
      this.todos =  await TodosService.getTodos();
    } catch (err) {
      this.err = err.message;
    }
  },
  methods: {
    async createPost() {
      await TodosService.insertTodo(this.text);
      this.todos = await TodosService.getTodos();
    },
    async deletePost(id) {
      await TodosService.deleteTodo(id);
      this.todos = await TodosService.getTodos();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding:  10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color:  #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
