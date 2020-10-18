<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <TodosComponent msg="Welcome to Your Vue.js App"/>
    <LoginComponent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import TodosComponent from './components/TodosComponent.vue'
import LoginComponent from './components/LoginComponent.vue'

export default {
  name: 'App',
  components: {
    TodosComponent,
    LoginComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
