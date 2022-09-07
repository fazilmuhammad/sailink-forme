<template>
  <div>
    <v-container class="login_container">
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline"></h3>
                <v-flex>
                  <v-img
                    alt="platformName"
                    class="ml-3"
                    contain
                    height="40px"
                    position="center"
                    :src="image"
                  ></v-img>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>
                My Account. My personalized experience. sailink.id is your one
                destination which provides 24/7 access to all the services to
                help manage your vessels.
              </p>
              <form style="margin-top: 30px" @submit.prevent="handleSubmit">
                <v-text-field
                  type="text"
                  label="Email or Username"
                  v-model="emailorname"
                  placeholder="Email or Username"
                  outlined
                  solo
                  dense
                  append-icon="mdi-account"
                />

                <v-text-field
                  style="margin-top: -10px"
                  hide-details
                  label="Password"
                  type="password"
                  v-model="password"
                  placeholder="Password"
                  outlined
                  solo
                  dense
                  append-icon="mdi-lock"
                />

                <button class="button_log">
                  <v-btn block color="#0B4281" elevation="6" x-large
                    ><div class="button_login">Login</div></v-btn
                  >
                </button>
                <AlertBox
                  v-if="error"
                  :message="error"
                  :color="color"
                  :icon="icon"
                />
              </form>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
        <v-flex sm12 md6 offset-md3>
          <v-layout align-center justify-space-between>
            <p class="caption my-3">
              <a href="#">Privacy Policy</a>
              |
              <a href="#">Terms of Service</a>
            </p>
            <p class="caption my-3">Powered by <a href="#">PT Skyreach</a></p>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import AlertBox from "@/components/alert/AlertBox.vue";

export default {
  name: "LoginComp",
  components: {
    AlertBox,
  },
  data() {
    return {
      emailorname: "",
      password: "",
      image: require("@/assets/img/logo.png"),
      error: "",
      color: "#FF0000",
      icon: "mdi-alert",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(
          "https://navigatorplus.sailink.id/api/login",
          {
            email: this.emailorname,
            password: this.password,
          }
        );
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("auth", true);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("iduser", response.data.user.id);
        this.$router.push("/navigator+");
      } catch (e) {
        this.error = "Invalid Email/Password";
      }
    },
  },
};
</script>

<style>
@import "@/assets/css/login.css";
</style>
