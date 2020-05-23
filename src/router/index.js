import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Home",
  },
  {
    path: "/Login",
    component: () => import("../views/Login"),
  },
  {
    path: "/PersonalCenter/:loggingid",
    component: () => import("../views/PersonalCenter"),
  },
  {
    path: "/Home",
    component: () => import("../views/Home"),
    children: [
      {
        path: "Type/:type",
        component: () => import("../views/Type"),
      },
      {
        path: "Shopping/:id",
        component: () => import("../views/Shopping"),
      },
    ],
  },
  {
    path: "/Home",
    component: () => import("../views/Home"),
    children: [
      {
        path: "Type",
        component: () => import("../views/Type"),
      },
    ],
  },
  {
    path: "/ShoppingHistory",
    component: () => import("../views/ShoppingHistory"),
  },
  {
    path: "/ShoppingCart",
    component: () => import("../views/ShoppingCart"),
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
        path: "CarouselManagement",
        component: () => import("../views/CarouselManagement"),
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
        path: "AddCarousel",
        component: () => import("../views/AddCarousel"),
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
        path: "CarouselDetails/:id",
        component: () => import("../views/CarouselDetails"),
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
