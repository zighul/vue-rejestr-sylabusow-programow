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
              :to="'/' + lastPart[1]"
            />
            <q-breadcrumbs-el
              :label="language === 'pl' ? 'Sylabusy' : 'Sylabus'"
              :to="'/' + lastPart[1] + '/' + lastPart[2]"
            />
            <q-breadcrumbs-el
              :label="
                language === 'pl'
                  ? wydzialy[lastPart[3]]
                  : wydzialyED[lastPart[3]]
              "
              :to="'/' + lastPart[1] + '/' + lastPart[2] + '/' + lastPart[3]"
            />
            <q-breadcrumbs-el
              :label="
                language === 'pl'
                  ? kierunki[lastPart[4]]
                  : kierunkiED[lastPart[4]]
              "
              :to="
                '/' +
                lastPart[1] +
                '/' +
                lastPart[2] +
                '/' +
                lastPart[3] +
                '/' +
                lastPart[4]
              "
            />
            <q-breadcrumbs-el
              :label="
                language === 'pl'
                  ? poziomy[lastPart[5]]
                  : poziomyED[lastPart[5]]
              "
              :to="
                '/' +
                lastPart[1] +
                '/' +
                lastPart[2] +
                '/' +
                lastPart[3] +
                '/' +
                lastPart[4] +
                '/' +
                lastPart[5]
              "
            />
            <q-breadcrumbs-el
              :label="
                language === 'pl' ? formy[lastPart[6]] : formyED[lastPart[6]]
              "
              :to="
                '/' +
                lastPart[1] +
                '/' +
                lastPart[2] +
                '/' +
                lastPart[3] +
                '/' +
                lastPart[4] +
                '/' +
                lastPart[5] +
                '/' +
                lastPart[6]
              "
            />
            <q-breadcrumbs-el
              :label="lastPart[7]"
              :to="
                '/' +
                lastPart[1] +
                '/' +
                lastPart[2] +
                '/' +
                lastPart[3] +
                '/' +
                lastPart[4] +
                '/' +
                lastPart[5] +
                '/' +
                lastPart[6] +
                '/' +
                lastPart[7]
              "
            />
            <q-breadcrumbs-el :label="lastPart[8]" />
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
        <div class="q-pa-md">
          <q-table
            title="Lista przedmiotów"
            :rows="przedmioty"
            :columns="columns"
            :filter="filter"
            row-key="name"
          >
            <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Wyszukaj"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body-cell-przedmiot="props">
              <q-td :props="props">
                <a :href="props.row.link" target="_blank">{{
                  props.row.przedmiot
                }}</a>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
        Lekarski: "lekarski",
        "Lekarsko-Stomatologiczny": "lekarsko-stomatologiczny",
        "Nauk o Zdrowiu": "wnoz",
        Farmaceutyczny: "farmaceutyczny",
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
      name: "Rejestr sylabusów i programów studiów",
      api: "",
      lastPart: this.$route.path.split("/"),
      language: this.$route.path.split("/")[1],
      przedmioty: [],
      filter: "",
      columns: [
        {
          name: "przedmiot",
          required: true,
          label: "Przedmiot",
          align: "left",
          field: (row) => row.przedmiot,
          sortable: true,
        },
        {
          name: "link",
          required: true,
          label: "Obowiązkowy/Fakultatywny",
          align: "center",
          field: (row) => row.obowiazkowy,
          sortable: true,
        },
      ],
      errors: [],
    };
  },
  methods: {
    checkLanguage() {
      if (this.language === "pl") {
        this.api = "http://localhost:3000/forms";
      } else {
        this.api = "http://localhost:3000/en/forms";
      }
    },
  },

  watch: {
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
    this.checkLanguage();
    axios
      .get(this.api)
      .then((response) => {
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          if (
            this.lastPart[4] === data[i].kierunek &&
            this.lastPart[3] === data[i].wydzial &&
            this.lastPart[5] === data[i].poziom &&
            this.lastPart[6] === data[i].forma &&
            this.lastPart[7] === data[i].cykl &&
            this.lastPart[8] === data[i].rok
          ) {
            this.przedmioty.push(data[i]);
          }
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>
<style>
a {
  text-decoration: none;
}
</style>
