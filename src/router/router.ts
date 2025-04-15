import { createRouter, createWebHistory } from "vue-router";
import Callback from "../view/Callback.vue";
import Home from "../view/Home.vue";
import ScrollSelector from "@/view/ScrollSelector.vue";
import Transfer from "@/view/Transfer.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/transfer", component: Transfer },
  { path: "/callback", component: Callback },
  { path: "/test-scroll", component: ScrollSelector },
];

const router = createRouter({
  history: createWebHistory("/Spotify2YTmusic/"),
  routes,
});

export default router;
