<template>
 
<div id="app">

    <v-footer dark padless>
      <v-card flat tile width="100%" class=" white--text text-center">
        <v-card-text>
          <v-img  alt="platformName" class="ml-3" contain height="120px" position="center"  :src="logo_skyreach"></v-img>
          <a target="_blank" >
            <v-btn style="font-size: 35px ;" class="mx-4 white--text" icon>
              <i class='bx bxl-facebook-square' ></i>
            </v-btn>
          </a> 
           <a target="_blank" >
            <v-btn style="font-size: 35px ;" class="mx-4 white--text" icon>
             <i class='bx bxl-youtube' ></i>
            </v-btn>
          </a> 
          <a target="_blank" >
            <v-btn class="mx-4 white--text" icon>
              <i style="font-size: 35px ;" class='bx bxl-instagram'></i>
            </v-btn>
          </a> 
           <a target="_blank" >
            <v-btn class="mx-4 white--text" icon>
             <i style="font-size: 35px ;" class='bx bxl-linkedin' ></i>
            </v-btn>
          </a> 
        </v-card-text>

        <!-- <v-card-text class="pt-0 text-left text-md-center">
          <v-expansion-panels accordion v-model="panel" multiple>
           
            <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                   <v-expansion-panel class=" col-md-3 col-12 elevation-0 ">
              <h3 class="d-none d-md-block py-2">Kantor Pusat</h3>
              <v-expansion-panel-header class="d-md-none">Kantor Pusat</v-expansion-panel-header>
              <v-expansion-panel-content>
                <li >
                  <a target="_blank"  class="white--text">Hermina Tower
                Lantai 20, Suite A/B
                Jl. HBR Motik No. 4, Kemayoran
                DKI Jakarta  - 10610</a>
                </li>
              </v-expansion-panel-content>
            </v-expansion-panel>
                </v-flex>

                <v-flex xs12 md4>
                   <v-expansion-panel class=" col-md-3 col-12 elevation-0 ">
              <h3 class="d-none d-md-block py-2">Kantor Cabang
            Batam</h3>
              <v-expansion-panel-header class="d-md-none">Kantor Cabang
            Batam</v-expansion-panel-header>
              <v-expansion-panel-content>
                <li >
                  <a target="_blank"  class="white--text">Jl. Komp. Bumi Indah Blok III No. 06,
                    Nagoya Batam,
                    Kec. Lubuk Baja</a>
                </li>
              </v-expansion-panel-content>
            </v-expansion-panel>
                </v-flex>

                <v-flex xs12 md4>
                   <v-expansion-panel class=" col-md-3 col-12 elevation-0 ">
              <h3 class="d-none d-md-block py-2">Call Center</h3>
              <v-expansion-panel-header class="d-md-none">Call Center</v-expansion-panel-header>
              <v-expansion-panel-content>
                <li >
                  <a target="_blank"  class="white--text">Phone:  +6221 - 3 100 100
Email:  info@skyreach.id</a>
                </li>
              </v-expansion-panel-content>
            </v-expansion-panel>
                </v-flex>

                
              </v-layout>
            </v-container>
          </v-flex>

          


          </v-expansion-panels>
        </v-card-text> -->

        <v-divider></v-divider>

        <v-card-text class="white--text">
          Copyright SAILINK {{ new Date().getFullYear() }} by Skyreach
        </v-card-text>
      </v-card>
    </v-footer>
 
</div>
   
</template>

<script>
    export default {
         data: () => ({
    panel: [],
    logo_skyreach: require("@/assets/img/Logo-Skyreach-White.png"),
    socials: [
      { name:"facebook", icon:"mdi-facebook-box", url:"https://codepen.io/jettaz"},
      {name:"twitter", icon:"mdi-twitter-box", url:"https://codepen.io/jettaz"},
      {name:"google", icon:"mdi-google", url:"https://codepen.io/jettaz"},
      {name:"linkedin", icon:"mdi-linkedin-box", url:"https://codepen.io/jettaz"},
      {name:"instagram", icon:"mdi-instagram", url:"https://codepen.io/jettaz"}
      
    ],
    items: [
      {
        name: "Product",
        tags: [
          {
            urlname: "Create Websites",
            url: "https://codepen.io/jettaz"
          },
          {
            urlname: "Secure Cloud Hosting",
            url: "https://codepen.io/jettaz"
          },
          {
            urlname: "Engage Your Audience",
            url: "https://codepen.io/jettaz"
          },
          {
            urlname: "Website Support",
            url: "https://codepen.io/jettaz"
          }
        ]
      },
      { name: "Company", 
       tags: [
         { urlname: "About", url: "https://codepen.io/jettaz" },
         { urlname: "Careers", url: "https://codepen.io/jettaz"},
         { urlname: "Support", url: "https://codepen.io/jettaz"},
         { urlname: "Pricing", url: "https://codepen.io/jettaz"},
         { urlname: "FAQ", url: "https://codepen.io/jettaz"}
       ] 
      },
      { name: "Resources", 
       tags: [
         { urlname: "Blog", url: "https://codepen.io/jettaz" },
         { urlname: "eBooks", url: "https://codepen.io/jettaz" },
         { urlname: "Whitepapers", url: "https://codepen.io/jettaz" },
         { urlname: "Comparison Guide", url: "https://codepen.io/jettaz" },
         { urlname: "Website Grader", url: "https://codepen.io/jettaz" }
       ] 
      },
      { name: "Get Help", 
       tags: [
         { urlname: "Help Center", url: "https://codepen.io/jettaz" },
         { urlname: "Contact Us", url: "https://codepen.io/jettaz" },
         { urlname: "Privacy Policy", url: "https://codepen.io/jettaz" },
         { urlname: "Terms", url: "https://codepen.io/jettaz" },
         { urlname: "Login", url: "https://codepen.io/jettaz" }
       ]
      }
    ]
  }),

  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      if (window.innerWidth >= 960) {
        this.panel = [...Array(4).keys()].map((k, i) => i);
      } else {
        this.panel = [];
      }
    }
  }
    }
</script>

<style lang="scss" scoped>




@media (min-width:960px) {
    .v-expansion-panel:before {
        box-shadow: none !important;
    }
    .v-expansion-panel:not(:first-child)::after {
        border-top: none;
    }
}
.resize {
  text-align: center;
}
.resize {
  margin-top: 3rem;
  font-size: 1.25rem;
}
/*RESIZESCREEN ANIMATION*/
.right {
  animation: rightanime 1s linear infinite;
}

.left {
  animation: leftanime 1s linear infinite;
}
@keyframes rightanime {
  50% {
    transform: translateX(10px);
    opacity: 0.5;
  }
  100% {
    transform: translateX(10px);
    opacity: 0;
  }
}
@keyframes leftanime {
  50% {
    transform: translateX(-10px);
    opacity: 0.5;
  }
  100% {
    transform: translateX(-10px);
    opacity: 0;
  }
}

</style>