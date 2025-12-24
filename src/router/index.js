import { createRouter, createWebHistory } from "vue-router";
import { useHorseStore } from "../stores/use-horseData";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: HomeView,
  },
  {
    name: "Play",
    path: "/play",
    component: () => import("../views/RacePlayView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, __, next) => {
  const horseStore = useHorseStore();
  if (to.name === "Play" && horseStore.currentRound === 0) {
    // Must have a race schedule before going to play
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
