import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../Pages/Home.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: '/bug/:id',
    name: 'Bug',
    // @ts-ignore
    component: () => import(/* webpackChunkName: "Bug" */ '../Pages/BugDetails.vue')
  },
];

const router = new VueRouter({
  routes,
});

export default router;
