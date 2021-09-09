import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Swap from "@/pages/Swap.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/swap",
    name: "Swap",
    component: Swap,
  },
  {
    path: "/",
    name: "Swap",
    component: Swap,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
