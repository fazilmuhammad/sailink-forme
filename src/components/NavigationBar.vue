<template>
  <nav>
    <div class="NavbarTop logo_desktop">
      <div class="upperbar" style="margin-right: 12px">
        <div v-if="isLoggedIn" class="upper_icon">
          <div class="upper_icon_icon">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  dark
                  color="#09294F"
                  elevation="0"
                >
                  <v-icon small>mdi-account</v-icon>
                  &nbsp;
                  <v-text>{{ userName }}</v-text>
                  &nbsp;
                  <v-icon small>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn
                    style="text-decoration: none"
                    block
                    plain
                    small
                    @click="toUpProf(userID)"
                    >Edit Profile</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn
                    block
                    plain
                    small
                    style="text-decoration: none"
                    @click="toEditPass(userID)"
                    >Change Password</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn block plain small @click="handleClick">Logout</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>

        <div v-if="isLoggedIn && !isHome" class="upper_icon">
          <div class="upper_icon_icon">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              color="#1F7AD3"
              elevation="0"
              to="/"
              style="text-decoration: none"
            >
              <v-icon small>mdi-home</v-icon>
              &nbsp; <v-text>Home</v-text>
            </v-btn>
          </div>
        </div>

        <div v-if="!isLoggedIn && isLoginView" class="upper_icon">
          <div class="upper_icon_icon">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              color="#1F7AD3"
              elevation="0"
              to="/"
              style="text-decoration: none"
            >
              <v-icon small>mdi-home</v-icon>
              &nbsp; <v-text>Home</v-text>
            </v-btn>
          </div>
        </div>

        <div v-if="isLoggedIn && isHome" class="upper_icon">
          <div class="upper_icon_icon">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              color="#1F7AD3"
              elevation="0"
              to="/navigator+"
              style="text-decoration: none"
            >
              <v-icon small>mdi-ferry</v-icon>
              &nbsp; <v-text>Dashboard</v-text>
            </v-btn>
          </div>
        </div>

        <div v-if="isLoggedIn && isEditProfile" class="upper_icon">
          <div class="upper_icon_icon">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              color="#1F7AD3"
              elevation="0"
              to="/navigator+"
              style="text-decoration: none"
            >
              <v-icon small>mdi-ferry</v-icon>
              &nbsp; <v-text>Dashboard</v-text>
            </v-btn>
          </div>
        </div>

        <div v-if="isLoggedIn && isChangePw" class="upper_icon">
          <div class="upper_icon_icon">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              color="#1F7AD3"
              elevation="0"
              to="/navigator+"
              style="text-decoration: none"
            >
              <v-icon small>mdi-ferry</v-icon>
              &nbsp; <v-text>Dashboard</v-text>
            </v-btn>
          </div>
        </div>

        <div v-if="!isLoggedIn && !isLoginView" class="upper_icon">
          <div class="upper_icon_icon">
            <v-btn
              dark
              v-on="on"
              color="primary"
              elevation="0"
              to="/login"
              style="text-decoration: none"
            >
              Login &nbsp;
              <v-icon small>mdi-login</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <div className="DropDown">
        <input type="checkbox" id="touch" />
        <ul class="slide">
          <li>
            <a href="#"><i class="bx bx-food-menu"></i></a>
          </li>
          <li>
            <a href="#"><i class="bx bx-home-alt-2"></i></a>
          </li>
          <li>
            <a href="#"><i class="bx bx-user-circle"></i></a>
          </li>
        </ul>
      </div>
    </div>

    <div class="NavbarTop logo_mobile">
      <div class="upperbar" style="margin-right: 12px">
        <div v-if="isLoggedIn" class="upper_icon">
          <div class="upper_icon_icon">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  v-bind="attrs"
                  v-on="on"
                  dark
                  color="#09294F"
                  elevation="0"
                >
                  <v-icon small>mdi-account</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn block plain small to="/editprofile"
                    >Edit Profile</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn
                    block
                    plain
                    small
                    style="text-decoration: none"
                    to="/changepassword"
                    >Change Password</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn block plain small @click="handleClick">Logout</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>

        <div v-if="isLoggedIn && !isHome" class="upper_icon">
          <div class="upper_icon_icon">
            <v-btn
              small
              dark
              v-bind="attrs"
              v-on="on"
              color="#1F7AD3"
              elevation="0"
              to="/"
              style="text-decoration: none"
            >
              <v-icon small>mdi-home</v-icon>
            </v-btn>
          </div>
        </div>

        <div v-if="!isLoggedIn && isLoginView" class="upper_icon">
          <div class="upper_icon_icon">
            <v-btn
              small
              dark
              v-bind="attrs"
              v-on="on"
              color="#1F7AD3"
              elevation="0"
              to="/"
              style="text-decoration: none"
            >
              <v-icon small>mdi-home</v-icon>
            </v-btn>
          </div>
        </div>

        <div v-if="isLoggedIn && isHome" class="upper_icon">
          <div class="upper_icon_icon">
            <v-btn
              small
              dark
              v-bind="attrs"
              v-on="on"
              color="#1F7AD3"
              elevation="0"
              to="/navigator+"
              style="text-decoration: none"
            >
              <v-icon small>mdi-ferry</v-icon>
            </v-btn>
          </div>
        </div>

        <div v-if="!isLoggedIn && !isLoginView" class="upper_icon">
          <div class="upper_icon_icon">
            <v-btn
              small
              dark
              v-bind="attrs"
              v-on="on"
              color="primary"
              elevation="0"
              to="/login"
              style="text-decoration: none"
            >
              Login &nbsp;
              <v-icon small>mdi-login</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <div class="NavbarBottom">
      <div class="logo logo-container parallelogram">
        <div v-if="isServices" class="logo_desktop skew-fix">
          <img
            style="max-width: 280px"
            alt="Navplus logo"
            class="logo-navplus"
            :src="image"
          />
        </div>
        <div v-if="!isServices" class="logo_desktop skew-fix">
          <img
            style="max-width: 280px"
            alt="Navplus logo"
            class="logo-sailink"
            :src="imageb"
          />
        </div>
        <div v-if="isServices" class="logo_mobile skew-fix">
          <img
            style="max-width: 50px"
            alt="Navplus logo"
            class="logo-navplus"
            :src="imagec"
          />
        </div>
        <div v-if="!isServices" class="logo_mobile skew-fix">
          <img
            style="max-width: 50px"
            alt="Navplus logo"
            class="logo-navplus"
            :src="imaged"
          />
        </div>
      </div>
      <div class="space"></div>
      <input v-if="isServices" type="radio" name="slider" id="menu-btn" />
      <input v-if="isServices" type="radio" name="slider" id="close-btn" />

      <ul v-if="isServices" class="nav-links">
        <label for="close-btn" class="btn close-btn"
          ><v-icon dark>mdi-close-box</v-icon></label
        >

        <li class="link_nav">
          <div class="parallelogram">
            <router-link
              @click="navigator = true"
              to="/navigator+"
              class="desktop-item"
              ><P class="skew-fix text-navbar">NAVIGATOR+</P></router-link
            >
          </div>
          <div class="parallelogram">
            <router-link
              @click="navigator = true"
              to="/navigator+"
              class="mobile-item"
              ><P class="skew-fix text-navbar">NAVIGATOR+</P></router-link
            >
          </div>
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/mysailink"
              class="desktop-item"
              ><P class="skew-fix text-navbar">MY SAILINK</P></router-link
            >
          </div>
          <div class="parallelogram">
            <router-link
              @click="navigator = true"
              to="/mysailink"
              class="mobile-item"
              ><P class="skew-fix text-navbar">MY SAILINK</P></router-link
            >
          </div>
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/reports"
              class="desktop-item"
              ><P class="skew-fix text-navbar">REPORTS</P></router-link
            >
          </div>
          <div class="parallelogram">
            <router-link
              @click="navigator = true"
              to="/reports"
              class="mobile-item"
              ><P class="skew-fix text-navbar">REPORTS</P></router-link
            >
          </div>
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/snapshot"
              class="desktop-item"
              ><P class="skew-fix text-navbar">SNAPSHOT</P></router-link
            >
          </div>
          <div class="parallelogram">
            <router-link
              @click="navigator = true"
              to="/snapshot"
              class="mobile-item"
              ><P class="skew-fix text-navbar">SNAPSHOT</P></router-link
            >
          </div>
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/mythuraya"
              class="desktop-item"
              ><P class="skew-fix text-navbar">MY THURAYA</P></router-link
            >
          </div>
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/mythuraya"
              class="mobile-item"
              ><P class="skew-fix text-navbar">MY THURAYA</P></router-link
            >
          </div>
        </li>
        <li class="link_nav">
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/manifest"
              class="desktop-item"
              ><P class="skew-fix text-navbar">MANIFEST</P></router-link
            >
          </div>
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/manifest"
              class="mobile-item"
              ><P class="skew-fix text-navbar">MANIFEST</P></router-link
            >
          </div>
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/iot"
              class="desktop-item"
              ><P class="skew-fix text-navbar">IOT</P></router-link
            >
          </div>
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/iot"
              class="mobile-item"
              ><P class="skew-fix text-navbar">IOT</P></router-link
            >
          </div>
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/admin"
              class="desktop-item"
              ><P class="skew-fix text-navbar">ADMIN</P></router-link
            >
          </div>
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/admin"
              class="mobile-item"
              ><P class="skew-fix text-navbar">ADMIN</P></router-link
            >
          </div>
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/crewwatch"
              class="desktop-item"
              ><P class="skew-fix text-navbar">CREWWATCH</P></router-link
            >
          </div>
          <div class="parallelogram">
            <router-link
              @click="navigator = false"
              to="/crewwatch"
              class="mobile-item"
              ><P class="skew-fix text-navbar">CREWWATCH</P></router-link
            >
          </div>
        </li>
      </ul>

      <label
        v-if="isServices"
        for="menu-btn"
        class="btn menu-btn"
        style="margin-top: 43px"
        ><v-icon class="iconmenu" dark>mdi-menu</v-icon></label
      >
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  props: ["user"],
  data() {
    return {
      image: require("@/assets/img/logo.png"),
      imageb: require("@/assets/img/logo-sailink.png"),
      imagec: require("@/assets/img/logo_mobile.svg"),
      imaged: require("@/assets/img/logo_sailink_mobile.svg"),
      services: false,
      home: true,
      account: false,
      ServiceisActive: false,
      HomeisActive: false,
      AccountisActive: false,
      navigator: true,
      mysailink: false,
      reports: false,
      mythuraya: false,
      manifest: false,
      iot: false,
      admin: false,
      userNames: localStorage.getItem("name"),
    };
  },

  methods: {
    toUpProf(user_id) {
      console.log("USER ID ==== " + user_id);
      this.$router.push({
        name: "editprofile",
        params: {
          user_id_bawaan: user_id,
        },
      });
    },
    toEditPass(user_id) {
      console.log("USER ID ==== " + user_id);
      this.$router.push({
        name: "changepassword",
        params: {
          user_id_bawaan: user_id,
        },
      });
    },
    handleClick() {
      localStorage.removeItem("token");
      localStorage.setItem("name", "");
      localStorage.setItem("auth", false);
      this.$router.push("/login");
      window.location.reload();
    },
    serviceClick() {
      this.$router.push("/navplus/navplus");
    },
  },
  computed: {
    ...mapGetters(["userPass"]),

    isHome() {
      return this.$route.name === "home";
    },
    isServices() {
      return this.$route.name === "navigator+";
    },

    isLoginView() {
      return this.$route.name === "login";
    },

    isServicesfirst() {
      return this.$route.path === "/navigator+";
    },

    isEditProfile() {
      return this.$route.path === "/editprofile";
    },

    isChangePw() {
      return this.$route.path === "/changepassword";
    },

    isHomefirst() {
      return this.$route.path !== "/" && "/sailink";
    },
    isLoggedIn() {
      return (
        localStorage.getItem("token") || this.$route.path === "/navigator+"
      );
    },
    userName() {
      return localStorage.getItem("name");
    },
    userID() {
      return localStorage.getItem("iduser");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/navigationBar.scss";
</style>
