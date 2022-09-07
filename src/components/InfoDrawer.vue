<template>
 <div id="app">
  <v-app>
    <v-navigation-drawer ref="drawer" app left hide-overlay :width="navigation.width" v-show="shown" style="margin-top:14vh">
      <v-toolbar color="primary">
        <v-toolbar-title>
          info drawer
        </v-toolbar-title>
      </v-toolbar>
      
    </v-navigation-drawer>
    <!-- <v-container>
      <v-layout justify-center>
        <v-btn @click="shown = !shown">Toggle {{ direction }}</v-btn>
      </v-layout>
      <v-layout justify-center>
        <p>Once the navigation drawer is opened, drag it's border to resize (highlited in red)</p>
      </v-layout>
    </v-container> -->
  </v-app>
</div>
</template>

<script>
export default {
    props:['shown'],
 data: () => {
    return {
      navigation: {
        width: 200,
        borderSize: 3
      }
    };
  },
  computed: {
    direction() {
      return this.shown === false ? "Open" : "Closed";
    }
  },
  methods: {
    setBorderWidth() {
      let i = this.$refs.drawer.$el.querySelector(
        ".v-navigation-drawer__border"
      );
      i.style.width = this.navigation.borderSize + "px";
      i.style.cursor = "ew-resize";
      i.style.backgroundColor = "red";
    },
    setEvents() {
      const minSize = this.navigation.borderSize;
      const el = this.$refs.drawer.$el;
      const drawerBorder = el.querySelector(".v-navigation-drawer__border");
      const direction = el.classList.contains("v-navigation-drawer--left")
        ? "left"
        : "right";

      function resize(e) {
        document.body.style.cursor = "ew-resize";
        let f =
          direction === "left"
            ? document.body.scrollWidth - e.clientX
            : e.clientX;
        el.style.width = f + "px";
      }

      drawerBorder.addEventListener(
        "mousedown",
        (e) => {
          if (e.offsetX < minSize) {
            el.style.transition = "initial";
            document.addEventListener("mousemove", resize, false);
          }
        },
        false
      );

      document.addEventListener(
        "mouseup",
        () => {
          el.style.transition = "";
          this.navigation.width = el.style.width;
          document.body.style.cursor = "";
          document.removeEventListener("mousemove", resize, false);
        },
        false
      );
    }
  },
  mounted() {
    this.setBorderWidth();
    this.setEvents();
  }
}
  
 


</script>

<style lang="scss" scoped>

</style>