import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Todos from "../views/Todos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/todos",
    name: "Todos",
    component: Todos
  }
];

const router = new VueRouter({
  routes
});

export default router;
