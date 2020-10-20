<template>
  <div class="container">
    <div class="text-container">
      <h1>Your Todos</h1>
      <div class="create-post">
        <label for="create-post"></label>
        <input class="text-field" type="text" id="create-post" v-model="text" placeholder="Create a Todo">
        <button v-on:click="createPost" class="create-post button-class">Create Todo</button>
      </div>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(todo, index) in todos"
        v-bind:item="todo"
        v-bind:index="index"
        v-bind:key="todo.uniqueId"
        v-on:dblclick="deletePost(todo.uniqueId)"
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
      this.text = ''
    },
    async deletePost(id) {
      await TodosService.deleteTodo(id);
      this.todos = await TodosService.getTodos();
    }
  }
}
</script>

<style scoped>
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding:  10px;
  margin-bottom: 15px;
}

div.post {
  margin-left: 10%;
  margin-right: 10%;
  position: relative;
  border: 1px solid #2c3e50;
  background: /* gradient can be an image */
			    linear-gradient(
			      to left, 
			      #f3f3f5,
			      #e1e0e6
			    )
			    left 
			    bottom
			    #fff  
			    no-repeat;
  background-size:100%;/* if linear-gradient, we need to resize it */ 
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
