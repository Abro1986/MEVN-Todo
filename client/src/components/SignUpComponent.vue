<template>
  <div class="form-container">
    <div class=text-container>
      <h1>Sign up</h1>
    </div>
    <div class="grid-container">
      <input class="text-field" type="text" id="create-username" v-model="userName" placeholder="Email">
      <input class="text-field" :type="showInput ? 'text' : 'password' " id="create-password" v-model="passWord" placeholder="Password">
    <div class="grid-container-button">
      <button v-on:click="createUser" class="create-post button-class">Sign Up</button>
      <button v-on:click="showInput = !showInput" textContent="" class="show-password button-class">{{ showInput ? "Hide Password" : "Show Password" }}</button>
    </div>
  </div>
    <p class="error" v-if="error">{{ error }}</p>
    <VerifyComponent v-if="showVerificationMessage"/>
  </div>
</template>

<script>
import UsersService from '../UsersService';
import VerifyComponent from '../components/VerifyComponent.vue'

export default {
  name: 'SignUpComponent',
  components: {
    VerifyComponent
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
    async createUser() {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(this.userName)){
        this.error = "please enter a valid email address";
        this.userName = "";
        this.passWord = "";
        return
      }
      if(!this.passWord) {
        this.error = "please enter a password";
        this.passWord = "";
        return
      }
      await UsersService.signUp(this.userName, this.passWord);
      this.error = "";
      this.userName = "";
      this.passWord = "";
      this.showVerificationMessage = true;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
