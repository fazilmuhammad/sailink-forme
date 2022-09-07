<template>
  <v-app class="appny" >
    <v-content>
      <section >
        <v-carousel v-model="model" hide-delimiters height="fitcontent">
          <v-carousel-item v-for="item in items" :key="item">
            <v-img :src="item.src" class="imgCarousel"></v-img>
          </v-carousel-item>
        </v-carousel>
      </section>
      <section>
        <v-layout column wrap class="my-5" align-center>
          <v-flex xs12 >
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card
                    class="mx-auto"
                    max-width="344"
                    color="#FFFF"
                    hover
                    link
                    href=""
                  >
                  <v-img
                      src="https://sailink.id/img/produk/skyway1.jpg"
                      height="200px"
                    ></v-img>
                    <v-card-text>
                      <v-card-title style="text-align: left">
                        SKYWAY<br />(Land Fixed VSAT)
                      </v-card-title>
                      <v-card-subtitle>
                        <p style="text-align: left">
                          Internet Frekuensi C-Band atau Ku-Band
                        </p>
                      </v-card-subtitle>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn icon @click="show = !show">
                        <v-icon>{{
                          show ? "mdi-chevron-up" : "mdi-chevron-down"
                        }}</v-icon>
                      </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                      <div v-show="show">
                        <v-divider></v-divider>

                        <v-card-text>
                          SKYWAY (Land Fixed VSAT), pengalaman Skyreach dalam
                          instalasi & operasional Fixed VSAT di darat telah
                          terbukti pada banyak proyek sejak awal Skyreach
                          didirikan, baik itu pada pemerintahan, lembaga,
                          berbagai perusahaan, dan proyek lainnya. Menggunakan
                          SCPC atau TDMA pada jaringan terbaik C-Band atau
                          Ku-Band yang kami berikan, Skyreach mampu melakukan
                          instalasi & mempertahankan layanan prima di mana saja
                          hingga daerah terpencil sekalipun di seluruh cakupan
                          wilayah Indonesia.
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row>
                            <v-col>
                              <v-btn color="green" dark block
                                ><img
                                  style="
                                    max-height: 15px;
                                    image-rendering: -webkit-optimize-contrast;
                                  "
                                  src="https://sailink.id/img/tokped.png"
                                  alt="tokopedia"
                                />&nbsp;&nbsp;Tokopedia</v-btn
                              >
                            </v-col>
                            <v-col>
                              <v-btn color="primary" dark block
                                >Contact Us</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </div>
                    </v-expand-transition>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card
                    class="mx-auto"
                    max-width="344"
                    color="#FFF"
                    hover
                    link
                    href=""
                  >
                    <v-img
                      src="https://sailink.id/img/produk/discovery2.jpg"
                      height="200px"
                    ></v-img>
                    <v-card-text>
                      <v-card-title style="text-align: left">
                        Discovery<br />(Land Mobility VSAT)
                      </v-card-title>
                      <v-card-subtitle>
                        <p style="text-align: left">
                          Internet Satellite News Gathering (SNG)
                        </p>
                      </v-card-subtitle>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn icon @click="showdisc = !showdisc">
                        <v-icon>{{
                          showdisc ? "mdi-chevron-up" : "mdi-chevron-down"
                        }}</v-icon>
                      </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                      <div v-show="showdisc">
                        <v-divider></v-divider>

                        <v-card-text>
                          Discovery (Land Mobility VSAT), Skyreach telah diakui
                          secara internasional untuk pengiriman teknologi Satcom
                          On The Move (SOTM) terbaru dalam proyek pemerintah &
                          militer. Layanan mobilitas darat harus memberikan
                          kemudahan bagi pengguna untuk ditempatkan di mana saja
                          & kapan saja dengan mudah.
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row>
                            <v-col>
                              <v-btn color="green" dark block
                                ><img
                                  style="
                                    max-height: 15px;
                                    image-rendering: -webkit-optimize-contrast;
                                  "
                                  src="https://sailink.id/img/tokped.png"
                                  alt="tokopedia"
                                />&nbsp;&nbsp;Tokopedia</v-btn
                              >
                            </v-col>
                            <v-col>
                              <v-btn
                                color="primary"
                                dark
                                block
                                href="https://skyreach.id/kontak/"
                                >Contact Us</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </div>
                    </v-expand-transition>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card
                    class="mx-auto"
                    max-width="344"
                    color="#FFF"
                    hover
                    link
                    href=""
                  >
                    <v-img
                      src="https://sailink.id/img/produk/vsat2.jpg"
                      height="200px"
                    ></v-img>
                    <v-card-text>
                      <v-card-title style="text-align: left">
                        Antena VSAT <br />Gyro SAILINK by Skyreach
                      </v-card-title>

                      <v-card-subtitle>
                        <p style="text-align: left">
                          Internet on Ship | CCTV VOIP Kapal
                        </p>
                      </v-card-subtitle>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn icon @click="showant = !showant">
                        <v-icon>{{
                          showant ? "mdi-chevron-up" : "mdi-chevron-down"
                        }}</v-icon>
                      </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                      <div v-show="showant">
                        <v-divider></v-divider>
                        <v-card-text>
                          SAILINK® (Maritime Connectivity) by Skyreach telah
                          berhasil menetapkan standar layanan konektivitas
                          maritim untuk pasar Indonesia hingga internasional dan
                          dipercayai langsung oleh beberapa perusahaan kapal
                          laut terbesar di Indonesia. Skyreach menyediakan
                          solusi L-Band sebagai pelengkap konektivitas maritim
                          SAILINK® dan berkomitmen untuk menjadi mitra utama
                          produk Thuraya MarineStar.
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row>
                            <v-col>
                              <v-btn color="green" dark block
                                ><img
                                  style="
                                    max-height: 15px;
                                    image-rendering: -webkit-optimize-contrast;
                                  "
                                  src="https://sailink.id/img/tokped.png"
                                  alt="tokopedia"
                                />&nbsp;&nbsp;Tokopedia</v-btn
                              >
                            </v-col>
                            <v-col>
                              <v-btn color="primary" dark block
                                >Contact Us</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </div>
                    </v-expand-transition>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      <v-footer class="darken-2" style="background-color: #1e1e1e">
        <FooterCompVue />
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import FooterCompVue from "@/components/FooterComp.vue";
export default {
  name: "App",
  components: {
    FooterCompVue,
  },
  data: function () {
    return {
      model: 0,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      items: [
        {
          src: "https://sailink.id/img/thuraya/slider2.jpg",
        },
        {
          src: "https://sailink.id/img/thuraya/slider3.jpg",
        },
      ],
      show: false,
      showdisc: false,
      showant: false,
      title: "Endorfine",
      imageLink: {
        main: "https://sailink.id/img/bg3-slim.jpg",
        sub_main: "https://techbiz.id/wp-content/uploads/2019/09/SAILINK.jpg",
        logo: "https://sailink.id/img/sailink-only.png",
        social_cover:
          "https://www.skyreach.co.id/assets/img/carousel/41_teleporthosting/teleport_1_800x533.jpg",
      },
      email: "",
      emailRules: [
        (v) => {
          return !!v || "E-mail is required";
        },
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      subscribed: false,
    };
  },
  methods: {
    subscribe: function () {
      this.subscribed = !this.subscribed;
    },
  },

  computed: {
    imgHeight: function () {
      var offset = 320;
      console.log("new image height is " + (this.pageHeight - offset));
      return this.pageHeight - offset;
    },
  },

  mounted: function () {
    this.calculateHeight();
  },
};
</script>

<style scoped>
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}

.appny{
  top: 13vh;
}

.imgCarousel{
 height: 625px
}

@media screen and (max-width: 2560px) {
.appny{
  top: 5.5vh;
  height: 94.5vh;
}

.carousel{
  height: 70vh;
}

.imgCarousel{
   height:70vh
}

}


@media screen and (max-width: 414px) {
.appny{
  top: 8vh;
  
}
}

@media screen and (max-width: 412px) {
.appny{
  top: 8vh;
}
}

@media screen and (max-width: 393px) {
.appny{
  top: 7vh;
}
}

@media screen and (max-width: 390px) {
.appny{
  top: 8vh;
}
}


@media screen and (max-width: 375px) {
.appny{
  top: 10vh;
}
}

@media screen and (max-width: 360px) {
.appny{
  top: 9vh;
}
}
</style>
