<template>
  <q-layout>
    <q-page-container>
      <Header />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      wydzialy: {
        lekarski: "Wydział Lekarski",
        "lekarsko-stomatologiczny": "Wydział Lekarsko-Stomatologiczny",
        farmaceutyczny: "Wydział Farmaceutyczny",
        wnoz: "Wydział Nauk o Zdrowiu",
      },
      kierunki: {
        lekarski: "Lekarski",
        "lekarsko-dentystyczny": "Lekarsko-Dentystyczny",
        farmacja: "Farmacja",
        "analityka-medyczna": "Analityka Medyczna",
        dietetyka: "Dietetyka",
        "zdrowie-publiczne": "Zdrowie Publiczne",
        "ratownictwo-medyczne": "Ratownicztwo Medyczne",
        fizjoterapia: "Fizjoterapia",
        pielegniarstwo: "Pielęgniarstwo",
        poloznictwo: "Połoznictwo",
      },
      poziomy: {
        "I-stopnia": "I stopnia",
        "II-stopnia": "II stopnia",
        magisterskie: "Jednolite magisterskie",
      },
      formy: {
        stacjonarne: "Stacjonarne",
        niestacjonarne: "Niestacjonarne",
      },
      routes: {
        ///Wydziały
        "Wydział Lekarski": "lekarski",
        "Wydział Lekarsko-Stomatologiczny": "lekarsko-stomatologiczny",
        "Wydział Nauk o Zdrowiu": "wnoz",
        "Wydział Farmaceutyczny": "farmaceutyczny",
        //ED
        Medicine: "medicine",
        Dentistry: "dentistry",
        ///Kierunki
        Lekarski: "lekarski",
        "Lekarsko-dentystyczny": "lekarsko-dentystyczny",
        Farmacja: "farmacja",
        "Analityka Medyczna": "analityka-medyczna",
        "Zdrowie Publiczne": "zdrowie-publiczne",
        "Ratownictwo Medyczne": "ratownictwo-medyczne",
        Fizjoterapia: "fiznoterapia",
        Dietetyka: "dietetyka",
        Pielęgniarstwo: "pielegniarstwo",
        Położnictwo: "poloznictwo",
        ///Poziomy
        "I stopnia": "I-stopnia",
        "II stopnia": "II-stopnia",
        "Jednolite magisterskie": "magisterskie",
        ///Formy
        Stacjonarne: "stacjonarne",
        Niestacjonarne: "niestacjonarne",
      },
    };
  },
};
</script>