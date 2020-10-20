import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Todos from "../views/Todos.vue";
import Hack from "../views/Hack.vue";
import Verify from "../components/VerifyComponent"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Home
  },
  {
    path: "/todos",
    name: "Todos",
    component: Todos
  },
  {
    path: "/verify/:uuid",
    name: "Hack",
    component: Hack
  },
  {
    path: "/patience",
    name: "Verified",
    component: Verify
  }
];

const router = new VueRouter({
  routes
});

export default router;
