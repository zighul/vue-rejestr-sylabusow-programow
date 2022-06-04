<template>
  <div class="row justify-center">
    <q-card class="my-card text-center" style="width: 80%">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ name }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el
              :label="
                language === 'pl' ? 'Sylabusy/Programy' : 'Sylabus/Programs'
              "
              :to="'/' + lastPartt[1]"
            />
            <q-breadcrumbs-el
              :label="language === 'pl' ? 'Sylabusy' : 'Sylabus'"
              :to="'/' + lastPartt[1] + '/' + lastPartt[2]"
            />
            <q-breadcrumbs-el
              :label="
                language === 'pl'
                  ? wydzialy[lastPartt[3]]
                  : wydzialyED[lastPartt[3]]
              "
            />
          </q-breadcrumbs>
        </div>
        <div class="q-pa-md" align="right">
          <q-btn-toggle
            v-model="language"
            toggle-color="primary"
            :options="[
              { label: 'Pl', value: 'pl' },
              { label: 'En', value: 'en' },
            ]"
          />
        </div>
        <h6>
          {{
            language === "pl"
              ? "Proszę wybrać kierunek studiów"
              : "Please choose division"
          }}
        </h6>
        <div v-if="options" class="row justify-center">
          <div style="min-width: 200px">
            <q-select
              style="max-width: 200px"
              v-model="kierunek"
              :options="options"
              :label="language === 'pl' ? 'Wydział' : 'Faculty'"
              class="q-mb-md"
            />
          </div>
        </div>
        <q-spinner v-if="!options" color="primary" size="5em" :thickness="10" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "Rejestr sylabusów i programów studiów",
      lastPartt: this.$route.path.split("/"),
      kierunek: "",
      lastPart: this.$route.path.split("/").pop(),
      language: this.$route.path.split("/")[1],
      options: [],
      routes: [],
      errors: [],
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
      ///ED
      wydzialyED: {
        lekarski: "Medicine",
        "lekarsko-stomatologiczny": "Dentistry",
      },
      kierunkiED: {
        lekarski: "Medicine",
        "lekarsko-dentystyczny": "Dentistry",
        farmacja: "Pharmacy",
        "analityka-medyczna": "Medical Analytics",
        // dietetyka: "Dietetyka",
        "zdrowie-publiczne": "Public Health",
        // "ratownictwo-medyczne": "Ratownicztwo Medyczne",
        fizjoterapia: "Physiotherapy",
        pielegniarstwo: "Nursing",
        poloznictwo: "Obstetricks",
      },
      poziomyED: {
        "I-stopnia": "1st degree",
        "II-stopnia": "2nd degree",
        magisterskie: "Master's degree",
      },
      formyED: {
        stacjonarne: "Stationary",
        niestacjonarne: "Part-time",
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
  watch: {
    kierunek: function () {
      if (this.kierunek) {
        this.$router.push({
          path: this.$route.path + "/" + this.routes[this.kierunek],
        });
      }
    },
    language: function () {
      if (this.language) {
        let url = this.$route.path.split("/");
        let newUrl = url.map((element) => {
          if (element === "pl") {
            return "en";
          } else if (element === "en") {
            return "pl";
          }
          return element;
        });
        this.$router.push(newUrl.toString().replaceAll(",", "/"));
      }
    },
  },
  mounted() {
    axios
      .get(`http://localhost:3000/` + this.lastPart)
      .then((response) => {
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          this.options.push(data[i]);
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<style></style>
