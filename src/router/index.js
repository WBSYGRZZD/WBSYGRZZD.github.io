import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Home",
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
  path: "/Home", //父路由路径
  component: () => import("../views/Home"), //父路由组件
  children: [
    {
      path: "Type", //子路由路径，会被添加在父路由路径末尾
      component: () => import("../views/Type"), //子路由组件
    }, //当/Home/Type加载成功Type.vue会被渲染在Home.vue的＜router-view＞中
    //其他子路由
  ],
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
