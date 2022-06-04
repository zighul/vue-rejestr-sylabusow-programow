import { createRouter, createWebHistory } from 'vue-router'
import Login from "/src/components/Login.vue";
import Admin from "/src/components/Admin.vue";
import Home from "/src/components/Home.vue";
import Sylabusy from "/src/components/Sylabusy.vue";
import Wydzial from "/src/components/Wydzial.vue";
import Kierunek from "/src/components/Kierunek.vue";
import Poziom from "/src/components/Poziom.vue";
import Rok from "/src/components/Rok.vue";
import Forma from "/src/components/Forma.vue";
import Jezyk from "/src/components/Jezyk.vue";

import Przedmioty from "/src/components/Przedmioty.vue";

const routes = [
  {
    path: "/",
    name: "Language",
    component: Jezyk,
  },
  {
    path: "/pl",
    name: "Polski",
    component: Home,
  },
  {
    path: "/en",
    name: "Angielski",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/admin",
    component: Admin,
  },
  {
    path: "/pl/sylabusy",
    component: Sylabusy,
  },
  {
    path: "/pl/sylabusy/:wydzial",
    component: Wydzial,
  },
  {
    path: "/pl/sylabusy/:wydzial/:kierunek",
    component: Kierunek,
  },
  {
    path: "/pl/sylabusy/:wydzial/:kierunek/:poziom",
    component: Poziom,
  },
  {
    path: "/pl/sylabusy/:wydzial/:kierunek/:poziom/:forma",
    component: Forma,
  },
  {
    path: "/pl/sylabusy/:wydzial/:kierunek/:poziom/:forma/:cykl",
    component: Rok,
  },
  {
    path: "/pl/sylabusy/:wydzial/:kierunek/:poziom/:forma/:cykl/:przedmiot",
    component: Przedmioty,
  },
  /// Angielski
  {
    path: "/en/sylabusy",
    component: Sylabusy,
  },
  {
    path: "/en/sylabusy/:wydzial",
    component: Wydzial,
  },
  {
    path: "/en/sylabusy/:wydzial/:kierunek",
    component: Kierunek,
  },
  {
    path: "/en/sylabusy/:wydzial/:kierunek/:poziom",
    component: Poziom,
  },
  {
    path: "/en/sylabusy/:wydzial/:kierunek/:poziom/:forma",
    component: Forma,
  },
  {
    path: "/en/sylabusy/:wydzial/:kierunek/:poziom/:forma/:cykl",
    component: Rok,
  },
  {
    path: "/en/sylabusy/:wydzial/:kierunek/:poziom/:forma/:cykl/:przedmiot",
    component: Przedmioty,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
