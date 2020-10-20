<template>
  <div class="form-container">
      <div class=text-container>
        <h1>Sign In</h1>
      </div>
      <div class="grid-container">
      <input type="text" id="provide-username" v-model="userName" placeholder="UserName" class="text-field">
      <input :type="showInput ? 'text' : 'password' " id="provide-password" v-model="passWord" placeholder="Password" class="text-field">
      <div class="grid-container-button">
        <button v-on:click="loginUser" class="provide-username button-class" >Login</button>
        <button v-on:click="showInput = !showInput" textContent="" class="show-password button-class">{{ showInput ? "Hide Password" : "Show Password" }}</button>
      </div>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import UsersService from '../UsersService';

export default {
  name: 'LoginComponent',
  props: {
    uuid: String
  },
  data() {
    return {
      userName: '',
      passWord: '',
      error: '',
      showInput: false,
      showVerificationMessage: false
    }
  },
  methods: {
    async loginUser() {
      await UsersService.login(this.userName, this.passWord);
      let verified = await UsersService.verified(this.userName);
      if(verified.data === true) {
        this.$router.push({name:'Todos'})
      } else {
        this.showVerificationMessage = true
      }
    },
    async deletePost(id) {
      await TodosService.deleteTodo(id);
      this.todos = await TodosService.getTodos();
    },
    showpassword() {
      this.showInput = false
    }
  }
}
</script>

<style scoped>
button {
  margin: 0 auto,
  bor
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
