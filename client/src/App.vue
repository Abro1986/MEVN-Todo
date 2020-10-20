<template>
  <div id="app"> 
    <div id="nav"> 
      <router-link class="router-element item-1 button-class nav-bar-button" to="/">Register</router-link>
      <router-link class="router-element item-2 button-class nav-bar-button" to="/register">Login</router-link>
      <button v-on:click="signOut" class="router-element item-3 button-class nav-bar-button" id="sign-out">Sign Out</button>
    </div>
    <router-view /> 
  </div>
</template>

<script>

export default {
  name: 'App',
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
html {
   margin: 0px;
   height: 100%;
   width: 100%;
}

body , .home {
  margin: 0 ;
  padding: 0;
  height: 100%
}

#nav {
  background-color: #a9a9a9;
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  padding: 1rem 4rem;
  background: /* gradient can be an image */
			    linear-gradient(
			      to left, 
			      #8f8fc8,
			      #4b08e7
			    )
			    left 
			    bottom
			    #fff  
			    no-repeat;
  background-size:100% 5px ;/* if linear-gradient, we need to resize it */ 
}

#app {
  margin: 0px;
  height: 40%;
  width: 100%;
}

#nav {
  height: 10%;
  font-weight: bold;
  background-color: #2c3e50;
  opacity: 0.9;
}

.router-element {
  all: unset;
}

.item-3 {
  justify-self: end;
}

.item-2 {
  justify-self: start;
}

button {
  all: unset;
}

.button-class, .text-field {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #a9a9a9;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Robot', sans-serif;
  font-weight: 300;
  text-align: center;
  transition: all 0.2s;
  font-weight: bold;
  color: #2c3e50;
}

.nav-bar-button {
  box-shadow: 0 0 10px #719ECE;
  background-color: #fbfdff;
}

.text-field {
  width: 80%;
  font-size: 20px
}

.button-class:hover {
  color: #000000;
  background-color:#8f8fc8;
  cursor: pointer;
}

.button-class:focus {
  outline: 0;
  background-color:#8f8fc8;
}

.text-container {
  padding: 60px;
  align-content: center;
  display: grid;
  grid-template-rows: 50%;
  grid-row: auto;
  justify-items: center;
  align-items: center;
}

.text-field:focus {
  outline: none !important;
  border-color:1px solid red;
  box-shadow: 0 0 10px #4b08e7;
}

.form-container {
  min-width: 300px;
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 10%;
  border-radius: 0.12em;
  border: 0.1em solid #a9a9a9;
  box-shadow: 0 0 10px #a2a4a7;
}

.grid-container {
  align-content: center;
  display: grid;
  grid-template-rows: 50% 50% 50% 50%;
  justify-items: center;
  align-items: center;
}

</style>
