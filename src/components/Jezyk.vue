<template>
  <div class="row justify-center">
    <q-card class="my-card text-center" style="width: 80%; min-height: 300px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ name }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <h5>Proszę wybrać język/Please choose language</h5>
        <q-btn class="bg-primary text-white q-mr-md" to="/pl">Polski</q-btn>
        <q-btn class="bg-primary text-white q-mr-md" to="/en">English</q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Rejestr sylabusów i programów studiów",
    };
  },
};
</script>
