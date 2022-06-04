<template>
  <div class="row justify-center">
    <q-card class="my-card text-center">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ name }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <p>Logowanie za pomocą Centralnego Systemu Autoryzacji</p>
        <q-form @submit="validate" class="q-gutter-md">
          <div class="row justify-center">
            <div style="min-width: 200px">
              <q-input
                v-model="loginForm.login.field"
                label="imie.nazwisko"
                :rules="[
                  (val) => (val && val.length > 0) || 'Proszę podać login',
                ]"
              />
              <q-input
                v-model="loginForm.password.field"
                label="hasło"
                type="password"
                :rules="[
                  (val) => (val && val.length > 0) || 'Proszę podać hasło',
                ]"
              />
            </div>
          </div>
          <q-banner v-if="error" inline-actions class="text-white bg-red">
            Błędne dane logowania. Proszę spróbować ponownie.
          </q-banner>
          <q-card-actions align="center">
            <q-btn class="bg-primary text-white" type="submit"
              >Zaloguj się</q-btn
            >
          </q-card-actions>
        </q-form>
      </q-card-section>

      <q-card-section>
        <p>
          Zakładanie konta oraz zmiana hasła odbywa się poprzez elektroniczny
          formularz na stronie
          <a
            href="https://csa.umw.edu.pl/"
            target="_blank"
            style="text-decoration: none"
            >csa.umw.edu.pl</a
          >
        </p>
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
      loginForm: {
        valid: false,
        login: {
          field: "",
        },
        password: {
          field: "",
        },
      },
      error: false,
      errors: [],
    };
  },
  methods: {
    validate() {
      if (
        this.loginForm.login.field === "a" &&
        this.loginForm.password.field === "a"
      ) {
        this.loginForm.valid = true;
        this.$router.push({ path: "/admin" });
      } else {
        this.loginForm.login.field = "";
        this.loginForm.password.field = "";
        this.error = true;
      }
    },
  },
};
</script>
