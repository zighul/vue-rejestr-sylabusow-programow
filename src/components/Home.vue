<template>
  <div class="row justify-center">
    <q-card class="my-card text-center" style="width: 80%; min-height: 300px">
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
        <q-btn
          class="bg-primary text-white q-mr-md"
          :to="this.$route.path + '/sylabusy'"
          >{{ language === "pl" ? "Sylabusy" : "Sylabusy EN" }}</q-btn
        >
        <q-btn
          class="bg-primary text-white q-mr-md"
          :to="this.$route.path + '/programy'"
          >Programy studiów</q-btn
        >
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Rejestr sylabusów i programów studiów",
      language: this.$route.path.split("/")[1],
    };
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
};
</script>
