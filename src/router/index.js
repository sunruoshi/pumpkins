import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    components: {
      Main: () => import(/* webpackChunkName: "main" */ "../views/Main.vue"),
      Header: () =>
        import(/* webpackChunkName: "header" */ "../views/Header.vue")
    },
    children: [
      {
        path: "/",
        name: "index",
        component: () =>
          import(/* webpackChunkName: "index" */ "../views/Index.vue")
      },
      {
        path: "trending",
        name: "trending",
        component: () =>
          import(/* webpackChunkName: "trending" */ "../views/Trending.vue")
      },
      {
        path: "product",
        name: "product",
        component: () =>
          import(
            /* webpackChunkName: "product-list" */ "../views/Productlist.vue"
          ),
        props: true
      },
      {
        path: "price",
        name: "price",
        component: () =>
          import(/* webpackChunkName: "price-list" */ "../views/Pricelist.vue"),
        props: true
      },
      {
        path: "starlist",
        name: "starlist",
        component: () =>
          import(/* webpackChunkName: "star-list" */ "../views/Starlist.vue"),
        props: true
      },
      {
        path: "cargo",
        name: "cargo",
        component: () =>
          import(/* webpackChunkName: "cargo" */ "../views/Cargo.vue"),
        props: true
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
