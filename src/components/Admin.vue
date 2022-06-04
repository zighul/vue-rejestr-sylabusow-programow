<template>
  <div class="row justify-center">
    <q-card class="my-card text-center" style="width: 80%">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ name }}</div>
      </q-card-section>
      <q-separator />
      <form @submit.prevent="dodajPrzedmiot">
        <q-card-section>
          <h4>Dodawanie materiałów dydaktycznych</h4>
          <p>Pola pojawiają się wraz z dokonywanymi wyborami.</p>
          <div class="row justify-center q-mt-md">
            <div style="max-width: 400px">
              <q-select
                v-model="form.cykl"
                :options="cykle"
                label="Cykl kształcenia"
              />
              <q-select
                v-if="form.cykl"
                v-model="form.wydzial"
                :options="wydzialy"
                label="Wydział"
              />
              <q-select
                v-if="form.wydzial === 'Wydział Lekarski'"
                v-model="form.kierunek"
                :options="lekarski"
                label="Kierunek"
              />
              <q-select
                v-if="form.wydzial === 'Wydział Lekarsko-Stomatologiczny'"
                v-model="form.kierunek"
                :options="lekarskoStomatologiczny"
                label="Kierunek"
              />
              <q-select
                v-if="form.wydzial === 'Wydział Nauk o Zdrowiu'"
                v-model="form.kierunek"
                :options="wnoz"
                label="Kierunek"
              />
              <q-select
                v-if="form.wydzial === 'Wydział Farmaceutyczny'"
                v-model="form.kierunek"
                :options="farmaceutyczny"
                label="Kierunek"
              />
              <q-select
                v-model="form.forma"
                :options="formy"
                label="Forma studiów"
              />
              <q-select
                v-model="form.poziom"
                :options="poziomy"
                label="Poziom kształcenia"
              />
              <q-select
                v-model="form.obowiazkowy"
                :options="obowiazkowy"
                label="Obowiązkowy/Fakultatywny"
              />
              <q-input v-model="form.przedmiot" label="Nazwa przedmiotu" />
              <q-input v-model="form.link" label="Link do pliku" />
              <div class="row justify-center q-mt-md">
                <q-uploader
                  url="http://localhost:4444/upload"
                  style="max-width: 300px"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-btn class="bg-primary text-white q-mb-md" type="submit"
          >Dodaj materiał</q-btn
        >
      </form>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "Rejestr sylabusów i programów studiów",
      form: {
        id: Math.floor(Math.random() * 100),
        cykl: "",
        wydzial: "",
        kierunek: "",
        forma: "",
        poziom: "",
        obowiazkowy: "",
        przedmiot: "",
        link: "",
      },
      obowiazkowy: ["Obowiązkowy", "Fakultatywny"],
      poziomy: ["pierwszego stopnia", "jednolite magisterskie"],
      formy: ["Studia stacjonarne", "Studia niestacjonarne"],
      lekarski: ["Lekarski"],
      lekarskoStomatologiczny: ["Lekarsko-Dentystyczny"],
      wnoz: [
        "Zdrowie publiczne",
        "Ratownictwo medyczne",
        "Fizjoterapia",
        "Pielęgniarstwo",
        "Połoznictwo",
      ],
      farmaceutyczny: ["Farmacja", "Analityka Medyczna", "Dietetyka"],
      wydzialy: [
        "Wydział Lekarski",
        "Wydział Lekarsko-Stomatologiczny",
        "Wydział Nauk o Zdrowiu",
        "Wydział Farmaceutyczny",
      ],
      cykle: ["2017-2022", "2018-2023", "2019-2024", "2020-2025", "2021-2026"],
    };
  },
  methods: {
    dodajPrzedmiot() {
      axios
        .post("http://localhost:3000/forms", this.form)
        .then((res) => {
          console.log(res);
          this.form = {};
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
  },
};
</script>

<style></style>
