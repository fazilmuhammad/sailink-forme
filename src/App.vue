<template>
  <v-app>
    <NavigationBar  />
    <router-view :user="user" />
  </v-app>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
// import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
  watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'Some Default Title';
                // const link = document.querySelector("[rel='icon']")
                // link.setAttribute('href',to.meta.icon)
            }
        },
    }
  // created() {
  //   this.fetchUserPass();
  // },
  // methods: {
  //   ...mapActions(["fetchVessel","fetchUserPass"]),
  // },
 
};
</script>

<style>
@import "@/assets/css/main.css";
</style>
