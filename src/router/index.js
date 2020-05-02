import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Home"),
  },
  {
    path: "/Backstage",
    component: () => import("../views/Backstage"),
    children: [
      {
        path: "CargoManagement",
        component: () => import("../views/CargoManagement"),
      },
      {
        path: "TypeManagement",
        component: () => import("../views/TypeManagement"),
      },
      {
        path: "OrderManagement",
        component: () => import("../views/OrderManagement"),
      },
      {
        path: "UserManagement",
        component: () => import("../views/UserManagement"),
      },
      {
        path: "AddCargo",
        component: () => import("../views/AddCargo"),
      },
      {
        path: "AddType",
        component: () => import("../views/AddType"),
      },
      {
        path: "AddUser",
        component: () => import("../views/AddUser"),
      },
      {
        path: "CargoDetails/:id",
        component: () => import("../views/CargoDetails"),
      },
      {
        path: "TypeDetails/:id",
        component: () => import("../views/TypeDetails"),
      },
      {
        path: "UserDetails/:id",
        component: () => import("../views/UserDetails"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
