<template>
  <div class="container">
    <h1>Sign Up</h1>
    <div class="create-post">
      <label for="create-post">username...</label>
      <input type="text" id="create-username" v-model="userName" placeholder="User Name">
      <label for="create-password">password...</label>
      <input type="password" id="create-password" v-model="passWord" placeholder="Password">
      <button v-on:click="createUser" class="create-post">SEND IT!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import UsersService from '../UsersService';

export default {
  name: 'SignUpComponent',
  // props: {
  //   msg: String
  // }
  data() {
    return {
      userName: '',
      passWord: '',
      error: ''
    }
  },
  // async created() {
  //   try {
  //     this.todos =  await TodosService.getTodos();
  //   } catch (err) {
  //     this.err = err.message;
  //   }
  // },
  methods: {
    async createUser() {
      await UsersService.signUp(this.userName, this.passWord);
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
