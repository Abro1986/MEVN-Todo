<template>
  <div id="app"> 
    <h2>Nav Bar</h2> 
    <div id="nav"> 
      <router-link to="/">Home...</router-link>
      <router-link to="/register">register...</router-link>
      <button v-on:click="signOut" class="create-post">Sign Out</button>
    </div>
    <router-view /> 
    <!-- <TodosComponent msg="Welcome to Your Vue.js App"/>
    <SignupComponent msg="Welcome to Your Vue.js App"/>
    <LoginComponent msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import TodosComponent from './components/TodosComponent.vue';
// import SignupComponent from './components/SignupComponent.vue';
// import LoginComponent from './components/LoginComponent.vue';

export default {
  name: 'App',
  // components: {
  //   // TodosComponent,
  //   // SignupComponent,
  //   // LoginComponent
  // }
  methods: {
    signOut () {
      function eraseCookie(name) {
          createCookie(name,"",-1);
        }
      function createCookie(name,value,days) {
          if (days) {
              var date = new Date();
              date.setTime(date.getTime()+(days*24*60*60*1000));
              var expires = "; expires="+date.toGMTString();
          }
          else var expires = "";
          document.cookie = name+"="+value+expires+"; path=/";
      }        
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++)
        eraseCookie(cookies[i].split("=")[0]);
      this.$router.push({name:'Home'})  
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
