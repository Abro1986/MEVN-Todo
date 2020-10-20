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
      > 
        <div class="util-container" style="float: right"

        >
          <div class="icon-trash item-1" >
            <div class="trash-lid" style="background-color: #ff5b5f"></div>
            <div class="trash-container" style="background-color: #ff5b5f"
              v-for="(todo, index) in todos"
              v-bind:item="todo"
              v-bind:index="index"
              v-bind:key="todo.uniqueId"
              v-on:click="deletePost(todo.uniqueId)"
            ></div>
            <div class="trash-line-1"></div>
            <div class="trash-line-2"></div>
            <div class="trash-line-3"></div>
          </div>
          <div class="checkbox item-2">
            <input type="checkbox" class="check-box-button" 
              v-bind:item="todo"
              v-bind:index="index"
              v-bind:key="todo.uniqueId"
              v-bind:checked="todo.checked"
            >
          </div>
        </div>
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
  padding: 0px 10px 30px 10px;
  margin-bottom: 15px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

.util-container {
  display: grid;
  grid-template-rows: 30px 50px;
  overflow: hidden;
  grid-template-columns: 100%;
}

.item-1 {
  justify-self: center;
  grid-column-start: 0;
  grid-row-end: 0;
}

.item-2 {
  justify-self: end;
  grid-column-start: 0;
  grid-row-start: 1;
  grid-row-end: 1;
}

.check-box-button {
  width: 20px; 
  height: 20px; 
}

.check-box-button:checked {
  background-color:red
}

.trash-lid, .trash-container, .trash-line-1, .trash-line-2, .trash-line-3:hover{
  cursor: pointer;
}

.icon-trash {
  width: 48px;
  height: 48px;
  position: relative;
  overflow: hidden;
  margin-left: 25px;
  margin-bottom: 25px;
}

.icon-trash .trash-lid {
  width: 62%;
  height: 10%;
  position: absolute;
  left: 50%;
  margin-left: -31%;
  top: 10.5%;
  background-color: #000;
  border-top-left-radius: 80%;
  border-top-right-radius: 80%;
  -webkit-transform: rotate(-5deg);
  -moz-transform: rotate(-5deg);
  -ms-transform: rotate(-5deg);
  transform: rotate(-5deg); 
}

.icon-trash .trash-lid:after {
  content: "";
  width: 26%;
  height: 100%;
  position: absolute;
  left: 50%;
  margin-left: -13%;
  margin-top: -10%;
  background-color: inherit;
  border-top-left-radius: 30%;
  border-top-right-radius: 30%;
  -webkit-transform: rotate(-1deg);
  -moz-transform: rotate(-1deg);
  -ms-transform: rotate(-1deg);
  transform: rotate(-1deg); 
}

.icon-trash .trash-container {
  width: 56%;
  height: 65%;
  position: absolute;
  left: 50%;
  margin-left: -28%;
  bottom: 10%;
  background-color: #000;
  border-bottom-left-radius: 15%;
  border-bottom-right-radius: 15%;
}

.icon-trash .trash-container:after {
  content: "";
  width: 110%;
  height: 12%;
  position: absolute;
  left: 50%;
  margin-left: -55%;
  top: 0;
  background-color: inherit;
  border-bottom-left-radius: 45%;
  border-bottom-right-radius: 45%;
}

.icon-trash .trash-line-1 {
  width: 4%;
  height: 50%;
  position: absolute;
  left: 38%;
  margin-left: -2%;
  bottom: 17%;
  background-color: #252527;
}

.icon-trash .trash-line-2 {
  width: 4%;
  height: 50%;
  position: absolute;
  left: 50%;
  margin-left: -2%;
  bottom: 17%;
  background-color: #252527;
}

.icon-trash .trash-line-3 {
  width: 4%;
  height: 50%;
  position: absolute;
  left: 62%;
  margin-left: -2%;
  bottom: 17%;
  background-color: #252527;
}

a {
  position: absolute;
  bottom: 12px;
  right: 20px;
}
</style>
