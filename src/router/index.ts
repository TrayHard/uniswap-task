import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Swapper from "../views/Swapper.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/swap",
    name: "Swap",
    component: Swapper,
  },
  {
    path: "/",
    name: "Swap",
    component: Swapper,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
