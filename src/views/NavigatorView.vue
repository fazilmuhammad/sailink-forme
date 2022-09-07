<template>
  <div>
    <div class="overlayRight">
      <v-card elevation="0" style="display: flex">
        <v-text-field
          light
          dense
          v-model="search"
          hide-details
          prepend-inner-icon="mdi-magnify"
          placeholder="Search Vessel"
          solo
          @click="expand = !expand"
        ></v-text-field>
        <v-btn color="#0B4281" icon @click="expand = !expand">
          <v-icon>{{ expand ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card>
    </div>
    <v-expand-transition>
      <div v-show="expand" class="overlayBottomRight">
        <v-card style="height: 71vh; width: 40vh; overflow: auto">
          <v-container v-if="!sidebarVessel" fluid>
            <v-row align="center" justify="center">
              <v-col></v-col>
              <v-col
                ><img
                  alt="Navplus logo"
                  width="100px"
                  :src="loadernavplus"
                  class="justify-center"
              /></v-col>
              <v-col></v-col>
            </v-row>
          </v-container>
          <v-data-table
            v-if="sidebarVessel"
            :items="sidebarVessel"
            :headers="headers"
            hide-default-header
            :items-per-page="10"
            class="elevation-1"
            :search="search"
            sort-by="none"
          >
            <template v-slot:item="row">
              <tr>
                <td
                  style="white-space: nowrap; padding: 0em; padding-left: 1em"
                >
                  <v-img
                    :src="'https://navigatorplus.sailink.id/' + row.item.photo"
                    style="width: 4rem; height: 4rem"
                  ></v-img>
                </td>
                <td style="white-space: nowrap; padding: 0em">
                  <v-card-subtitle style="text-align: left">
                    <b>{{ row.item.name }}</b>
                    <br />
                    {{ row.item.pt_name }}
                    <br />

                    <v-btn
                      dark
                      color="primary"
                      x-small
                      @click="showinfosideSailink(row.item)"
                      v-if="row.item.identifier != null"
                    >
                      Sailink
                    </v-btn>
                    &nbsp;
                    <v-btn
                      v-if="row.item.thuraya_number != null"
                      dark
                      color="primary"
                      x-small
                      @click="showinfosideThuraya(row.item)"
                    >
                      Thuraya
                    </v-btn>
                  </v-card-subtitle>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-expand-transition>

    <GoogleMapNavigator style="height: 100vh" :mapConfig="mapConfig">
      <template slot-scope="{ google, map }">
        <MapMarker
          v-for="marker in sailinkLocation"
          :id="marker.name"
          :key="'sailink' + marker.id"
          :marker="marker"
          :google="google"
          :map="map"
          :info="info_sail"
          :ref="'sailinkMarker' + marker.name"
        />

        <MapFleetLabel
          v-for="marker in sailinkLocation"
          :key="'sailinklabel' + marker.id"
          :marker="marker"
          :google="google"
          :map="map"
        />

        <MapMarker
          v-for="marker in thurayaLocation"
          :key="'thuraya' + marker.id"
          :marker="marker"
          :google="google"
          :map="map"
          :info="info_thur"
          :ref="'thurayaMarker' + marker.name"
        />

        <MapFleetLabel
          v-for="marker in thurayaLocation"
          :key="'thurayalabel' + marker.id"
          :marker="marker"
          :google="google"
          :map="map"
        />

        <SkyReach1
          :key="sky1"
          v-for="(m, sky1) in paths_cns11"
          :paths="m"
          :clickable="true"
          :options="c11options"
          :google="google"
          :map="map"
        />

        <SkyReach2
          :key="sky2"
          v-for="(m, sky2) in paths_apstar5"
          :paths="m"
          :clickable="true"
          :options="c11options"
          :google="google"
          :map="map"
        />

        <ApStar9
          :key="apstar9"
          v-for="(m, apstar9) in paths_apstar9"
          :paths="m"
          :clickable="true"
          :options="c11options"
          :google="google"
          :map="map"
        />

        <Abs2A
          :key="abs2A"
          v-for="(m, abs2A) in paths_abs"
          :paths="m"
          :clickable="true"
          :options="c11options"
          :google="google"
          :map="map"
        />

        <OceanBeam
          :key="ocnb"
          v-for="(m, ocnb) in paths_ocn"
          :paths="m"
          :clickable="true"
          :options="c11options"
          :google="google"
          :map="map"
        />

        <SkyReach1Gnt
          :key="sky1gnt"
          v-for="(m, sky1gnt) in paths_cns11gnt"
          :paths="m"
          :clickable="true"
          :options="c11options"
          :google="google"
          :map="map"
        />

        <SkyReach2Gnt
          :key="sky2gnt"
          v-for="(m, sky2gnt) in paths_apstar5gnt"
          :paths="m"
          :clickable="true"
          :options="c11options"
          :google="google"
          :map="map"
        />

        <ApStar9Gnt
          :key="apstar9gnt"
          v-for="(m, apstar9gnt) in paths_apstar9gnt"
          :paths="m"
          :clickable="true"
          :options="c11options"
          :google="google"
          :map="map"
        />

        <Abs2AGnt
          :key="abs2agnt"
          v-for="(m, abs2agnt) in paths_absgnt"
          :paths="m"
          :clickable="true"
          :options="c11options"
          :google="google"
          :map="map"
        />

        <OceanBeamGnt
          :key="ocngnt"
          v-for="(m, ocngnt) in paths_ocngnt"
          :paths="m"
          :clickable="true"
          :options="c11options"
          :google="google"
          :map="map"
        />
      </template>
    </GoogleMapNavigator>

    <v-card :class="{ active: active }" v-if="datainfo">
      <v-card
        v-if="datainfo"
        class="WrapperInfoWindow"
        style="overflow: auto; background-color: #0b4281"
      >
        <v-card class="InfoWindow" style="background-color: #0b4281">
          <div class="infowin_desktop">
            <v-toolbar color="#0B4281" dark elevation="4" dense height="40px">
              <v-toolbar-title class="subtitle-2">{{
                datainfo.name
              }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="(active = null), centerMarkerDel()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-toolbar dark color="#1976D2" dense height="25px">
              <v-toolbar-title v-if="!datainfo">
                <div class="loader-line"></div>
              </v-toolbar-title>
              <v-toolbar-title class="caption" v-if="datainfo">{{
                datainfo.pt
              }}</v-toolbar-title>
            </v-toolbar>
            <v-toolbar dark dense height="30px" color="#00BCD4">
              <v-toolbar-title
                class="caption"
                v-if="datainfo && kondisi == 'sailink'"
              >
                [Last Updated : {{ datainfo.last_up }}]
              </v-toolbar-title>
              <v-progress-linear
                v-if="!datainfo"
                indeterminate
                color="teal"
                height="7"
              ></v-progress-linear>
              <v-toolbar-title
                v-if="datainfo && kondisi == 'thuraya'"
                class="caption"
              >
                [Last Updated : {{ datainfo.updated }}]
              </v-toolbar-title>
            </v-toolbar>
            <v-container v-if="!datainfo" fluid>
              <v-row align="center" justify="center">
                <v-col></v-col>
                <v-col
                  ><img
                    alt="Navplus logo"
                    width="100px"
                    :src="loadernavplus"
                    class="justify-center"
                /></v-col>
                <v-col></v-col>
              </v-row>
            </v-container>
            <v-simple-table dense v-if="datainfo" style="overflow: auto">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>
                      <p
                        class="caption font-weight-bold"
                        style="margin-bottom: 0"
                      >
                        Lat,Lon
                      </p>
                      {{ datainfo.lat }},{{ datainfo.lon }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p
                        class="caption font-weight-bold"
                        style="margin-bottom: 0"
                      >
                        DMS
                      </p>
                      {{ datainfo.dms }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p
                        class="caption font-weight-bold"
                        style="margin-bottom: 0"
                      >
                        Speed
                      </p>
                      {{ datainfo.speed }} Knots
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p
                        class="caption font-weight-bold"
                        style="margin-bottom: 0"
                      >
                        Heading
                      </p>
                      {{ datainfo.heading }}°
                    </td>
                  </tr>
                  <tr v-if="kondisi_after == 'sailink'">
                    <td>
                      <p
                        class="caption font-weight-bold"
                        style="margin-bottom: 0"
                      >
                        SatNet
                      </p>
                      {{ datainfo.satnet }}
                    </td>
                  </tr>
                  <tr v-if="kondisi_after == 'sailink'">
                    <td>
                      <p
                        class="caption font-weight-bold"
                        style="margin-bottom: 0"
                      >
                        EIRP
                      </p>
                      {{ satNet.eirp }}
                    </td>
                  </tr>
                  <tr v-if="kondisi_after == 'sailink'">
                    <td>
                      <p
                        class="caption font-weight-bold"
                        style="margin-bottom: 0"
                      >
                        G/T
                      </p>
                      {{ satNet.gnt }}
                    </td>
                  </tr>
                  <tr v-if="weaTher">
                    <td>
                      <p
                        class="caption font-weight-bold"
                        style="margin-bottom: 0"
                      >
                        Weather
                      </p>
                      {{ weaTher.weather }}
                    </td>
                  </tr>
                  <tr v-if="weaTher">
                    <td>
                      <p
                        class="caption font-weight-bold"
                        style="margin-bottom: 0"
                      >
                        Wind
                      </p>
                      {{ weaTher.windSpeed }}
                    </td>
                  </tr>
                  <tr v-if="weaTher">
                    <td>
                      <p
                        class="caption font-weight-bold"
                        style="margin-bottom: 0"
                      >
                        Waves
                      </p>
                      {{ weaTher.waveHeight }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-card-text style="margin-top: -8px">
              <v-btn
                small
                block
                @click="moreDetail(kondisi, datainfo)"
                color="primary"
              >
                More Detail
              </v-btn>
            </v-card-text>
          </div>
          <div class="infowin_mobile">
            <v-toolbar dark dense color="#0B4281" elevation="0">
              <v-toolbar-subtitle
                >{{ datainfo.name }} | {{ datainfo.pt }}</v-toolbar-subtitle
              >
              <v-spacer></v-spacer>
              <v-btn icon dark @click="active = null">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card height="calc(100vh - 34rem)" class="overflow-y-auto">
              <v-row v-if="!satNet" align="center" justify="center">
                <v-col></v-col>
                <v-col
                  ><img
                    alt="Navplus logo"
                    width="60px"
                    :src="loadernavplus"
                    class="justify-center"
                    style="margin-top: 3rem; margin-left: 2rem"
                /></v-col>
                <v-col></v-col>
              </v-row>

              <v-simple-table
                dense
                v-if="datainfo && satNet && weaTher"
                scrollable
              >
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td>Lat,Lon</td>
                      <td>:</td>
                      <td>{{ datainfo.lat }},{{ datainfo.lon }}</td>
                    </tr>
                    <tr>
                      <td>DMS</td>
                      <td>:</td>
                      <td>{{ datainfo.dms }}</td>
                    </tr>
                    <tr>
                      <td>Speed</td>
                      <td>:</td>
                      <td>{{ datainfo.speed }}</td>
                    </tr>
                    <tr>
                      <td>Heading</td>
                      <td>:</td>
                      <td>{{ datainfo.heading }}</td>
                    </tr>

                    <tr v-if="kondisi_after == 'sailink'">
                      <td>satNet</td>
                      <td>:</td>
                      <td>{{ datainfo.satNet }}</td>
                    </tr>
                    <tr v-if="kondisi_after == 'sailink'">
                      <td>EIRP</td>
                      <td>:</td>
                      <td>{{ satNet.eirp }}</td>
                    </tr>
                    <tr v-if="kondisi_after == 'sailink'">
                      <td>G/T+</td>
                      <td>:</td>
                      <td>{{ satNet.gnt }}</td>
                    </tr>

                    <tr>
                      <td>Weather</td>
                      <td>:</td>
                      <td>{{ weaTher.weather }}</td>
                    </tr>
                    <tr>
                      <td>Wind</td>
                      <td>:</td>
                      <td>{{ weaTher.windSpeed }}</td>
                    </tr>
                    <tr>
                      <td>Waves</td>
                      <td>:</td>
                      <td>{{ weaTher.waveHeight }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>

            <v-toolbar style="padding: 5px" color="#0B4281" dark elevation="0">
              <v-card-text style="margin-top: 1rem">
                <row>
                  <v-chip
                    color="#325D9E"
                    style="width: 100vw; margin-bottom: 5px"
                    block
                    v-if="datainfo && satNet && weaTher && kondisi == 'sailink'"
                    label
                    small
                    dark
                    >[Last Updated : {{ datainfo.last_up }}]</v-chip
                  >
                  <v-chip
                    color="#325D9E"
                    style="margin-bottom: 5px"
                    block
                    v-if="datainfo && satNet && weaTher && kondisi == 'thuraya'"
                    label
                    small
                    dark
                    >[Last Updated : {{ datainfo.updated }}]</v-chip
                  >
                  <v-btn
                    small
                    block
                    @click="moreDetail(kondisi, datainfo)"
                    color="primary"
                  >
                    More Detail
                  </v-btn>
                </row>
              </v-card-text>
            </v-toolbar>
          </div>
        </v-card>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import mapstyle from "@/assets/json/mapstyle.json";
import GoogleMapNavigator from "@/components/gmaps/GoogleMapNavigator";
import MapMarker from "@/components/gmaps/MapMarker";
import MapFleetLabel from "@/components/gmaps/MapFleetLabel.vue";
import SkyReach1 from "@/components/polygon/SkyReach1.vue";
import SkyReach2 from "@/components/polygon/SkyReach2.vue";
import ApStar9 from "@/components/polygon/ApStar9.vue";
import Abs2A from "@/components/polygon/Abs2A.vue";
import OceanBeam from "@/components/polygon/OceanBeam.vue";
import SkyReach1Gnt from "@/components/polygon/SkyReach1Gnt.vue";
import SkyReach2Gnt from "@/components/polygon/SkyReach2Gnt.vue";
import ApStar9Gnt from "@/components/polygon/ApStar9Gnt.vue";
import Abs2AGnt from "@/components/polygon/Abs2AGnt.vue";
import OceanBeamGnt from "@/components/polygon/OceanBeamGnt.vue";
import { mapSettings } from "@/constants/mapSettings";
import {
  cns11,
  cns11gain, //data gain onclkick
  cns11_gnt, // skyreach1 gnt
  cns11_gntgain, //skyreach 1 gnt gain info
} from "@/assets/js/cns11.js";

import {
  apstar5,
  apstar5gain,
  apstar5_gnt,
  apstar5_gntgain,
} from "@/assets/js/apstar5.js";

import {
  apstar92,
  apstar92gain,
  apstar92_gnt,
  apstar92_gntgain,
} from "@/assets/js/apstar9.js";

import { abs, absgain, abs_gnt, abs_gntgain } from "@/assets/js/abs.js";

import { ocn, ocngain, ocn_gnt, ocn_gntgain } from "@/assets/js/oceanbeam.js";

console.log(cns11gain);
console.log(cns11_gntgain);

console.log(apstar5gain);
console.log(apstar5_gntgain);

console.log(apstar92gain);
console.log(apstar92_gntgain);

console.log(absgain);
console.log(abs_gntgain);

console.log(ocngain);
console.log(ocn_gntgain);

export default {
  name: "GMapComp",
  props: ["user"],
  components: {
    GoogleMapNavigator,
    MapMarker,
    MapFleetLabel,
    SkyReach1,
    SkyReach2,
    ApStar9,
    Abs2A,
    OceanBeam,
    SkyReach1Gnt,
    SkyReach2Gnt,
    ApStar9Gnt,
    Abs2AGnt,
    OceanBeamGnt,
  },

  data() {
    return {
      toggle: false,
      search: "",
      expand: false,
      onkan: null,
      headers: [
        {
          text: "",
          value: "id",
          width: "1%",
        },
        { text: "", value: "name", align: "start", width: "1%" },
      ],

      loadernavplus: require("@/assets/img/load100new.gif"),
      kondisi: "",
      kondisi_after: "",
      info_sail: "sailink",
      info_thur: "thuraya",
      weather: "",
      lines: [
        {
          id: "1",
          path: [
            { lat: 3, lng: 101 },
            { lat: 5, lng: 99 },
          ],
        },
        {
          id: "2",
          path: [
            { lat: 5, lng: 99 },
            { lat: 6, lng: 97 },
          ],
        },
      ],
      active: null,
      datainfo: null,
      options: {
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: mapstyle,
      },
      c11options: {
        fillColor: "#60B482",
        strokeColor: "#008000",
      },
      paths_cns11: cns11,
      paths_cns11gnt: cns11_gnt,
      paths_apstar5: apstar5,
      paths_apstar5gnt: apstar5_gnt,
      paths_apstar9: apstar92,
      paths_apstar9gnt: apstar92_gnt,
      paths_abs: abs,
      paths_absgnt: abs_gnt,
      paths_ocn: ocn,
      paths_ocngnt: ocn_gnt,
    };
  },

  mounted() {
    this.$root.$on("showInfoComp", (m, i) => {
      this.showinfo(m, i);
    });
    var vm = this;



    window.BMKGOn= function (bmkg) {
      if(bmkg.checked){
        document.getElementById("bmkgDate-container").style.display = "block";
        document.getElementById("bmkgLayer-container").style.display = "block";
      }else{
        document.getElementById("bmkgDate-container").style.display = "none";
        document.getElementById("bmkgLayer-container").style.display = "none";
      }
      
    },

    window.eirpOn = function (eirp) {
      if (eirp.checked) {
        vm.eirpOn(true);
      }

      //Skyreach1
      if (vm.Skyreach1Con && eirp.checked) {
        vm.eirpOn(true);
        vm.addSkyreach1();
      }

      if (!vm.Skyreach1Con && eirp.checked) {
        vm.removeSkyreach1();
      }

      if (vm.Skyreach1Con && !eirp.checked) {
        vm.eirpOn(null);
        vm.removeSkyreach1();
      }

      //Skyreach2
      if (vm.Skyreach2Con && eirp.checked) {
        vm.eirpOn(true);
        vm.addSkyreach2();
      }

      if (!vm.Skyreach2Con && eirp.checked) {
        vm.removeSkyreach2();
      }

      if (vm.Skyreach2Con && !eirp.checked) {
        vm.eirpOn(null);
        vm.removeSkyreach2();
      }

      //Apstar9
      if (vm.Apstar9Con && eirp.checked) {
        vm.eirpOn(true);
        vm.addApstar9();
      }

      if (!vm.Apstar9Con && eirp.checked) {
        vm.removeApstar9();
      }

      if (vm.Apstar9Con && !eirp.checked) {
        vm.eirpOn(null);
        vm.removeApstar9();
      }

      //Abs2
      if (vm.Abs2Con && eirp.checked) {
        vm.eirpOn(true);
        vm.addAbs2();
      }

      if (!vm.Abs2Con && eirp.checked) {
        vm.removeAbs2();
      }

      if (vm.Abs2Con && !eirp.checked) {
        vm.eirpOn(null);
        vm.removeAbs2();
      }

      //OceanBeam
      if (vm.OceanBeamCon && eirp.checked) {
        vm.eirpOn(true);
        vm.addOceanBeam();
      }

      if (!vm.OceanBeamCon && eirp.checked) {
        vm.removeOceanBeam();
      }

      if (vm.OceanBeamCon && !eirp.checked) {
        vm.eirpOn(null);
        vm.removeOceanBeam();
      }

      //==============================

      if (!eirp.checked & !vm.gnt) {
        vm.eirpOn(null);
        vm.addSkyreach1Con(null);
        vm.addSkyreach2Con(null);
        vm.addApstar9Con(null);
        vm.addAbs2Con(null);
        vm.addOceanBeamCon(null);
      }

      if (!eirp.checked & vm.gnt) {
        vm.eirpOn(null);
      }
    };

    window.labelOn = function (label) {
      if (label.checked) {
        vm.addFleetLabel();
      } else {
        vm.removeFleetLabel();
      }
    };

    window.gntOn = function (gnt) {
      if (gnt.checked) {
        vm.gntOn(true);
      }

      //Skyreach1
      if (vm.Skyreach1Con && vm.gnt) {
        vm.gntOn(true);
        vm.addSkyreach1Gnt();
      }

      if (vm.Skyreach1Con && gnt.checked) {
        vm.gntOn(true);
        vm.addSkyreach1Gnt();
      }

      if (!vm.Skyreach1Con && gnt.checked) {
        vm.removeSkyreach1Gnt();
      }

      if (vm.Skyreach1Con && !gnt.checked) {
        vm.gntOn(null);
        vm.removeSkyreach1Gnt();
      }

      //Skyreach2
      if (vm.Skyreach2Con && gnt.checked) {
        vm.gntOn(true);
        vm.addSkyreach2Gnt();
      }

      if (!vm.Skyreach2Con && gnt.checked) {
        vm.removeSkyreach2Gnt();
      }

      if (vm.Skyreach2Con && !gnt.checked) {
        vm.gntOn(null);
        vm.removeSkyreach2Gnt();
      }

      //Apstar9
      if (vm.Apstar9Con && gnt.checked) {
        vm.gntOn(true);
        vm.addApstar9Gnt();
      }

      if (!vm.Apstar9Con && gnt.checked) {
        vm.removeApstar9Gnt();
      }

      if (vm.Apstar9Con && !gnt.checked) {
        vm.gntOn(null);
        vm.removeApstar9Gnt();
      }

      //Abs2A
      if (vm.Abs2Con && gnt.checked) {
        vm.gntOn(true);
        vm.addAbs2Gnt();
      }

      if (!vm.Abs2Con && gnt.checked) {
        vm.removeAbs2Gnt();
      }

      if (vm.Abs2Con && !gnt.checked) {
        vm.gntOn(null);
        vm.removeAbs2Gnt();
      }

      //OceanBeam
      if (vm.OceanBeamCon && gnt.checked) {
        vm.gntOn(true);
        vm.addOceanBeamGnt();
      }

      if (!vm.OceanBeamCon && gnt.checked) {
        vm.removeOceanBeamGnt();
      }

      if (vm.OceanBeamCon && !gnt.checked) {
        vm.gntOn(null);
        vm.removeOceanBeamGnt();
      }

      //==============================

      if (!gnt.checked && !vm.eirp) {
        vm.gntOn(null);
        vm.addSkyreach1Con(null);
        vm.addSkyreach2Con(null);
        // vm.addApstar9Con(null);
        // vm.addAbs2Con(null);
        // vm.addOceanBeamCon(null);
      }

      if (!gnt.checked && vm.eirp) {
        vm.gntOn(null);
      }
    };

    window.Skyreach1On = function (skyreach1) {
      if (skyreach1.checked) {
        vm.addSkyreach1Con(true);
      }

      //EIRP
      if (vm.eirp && skyreach1.checked) {
        vm.addSkyreach1();
      }
      if (skyreach1.checked && !vm.eirp && !vm.gnt) {
        vm.removeSkyreach1();
        document.getElementById("checkbox").checked = true;
        window.eirpOn(skyreach1);
        vm.addSkyreach1Con(true);
        // vm.eirpOn(null);
      }
      if (!skyreach1.checked && vm.eirp) {
        vm.removeSkyreach1();
        vm.addSkyreach1Con(null);
      }
      if (!skyreach1.checked) {
        vm.addSkyreach1Con(null);
        vm.removeSkyreach1();
      }

      //GNT
      if (vm.gnt && skyreach1.checked) {
        vm.addSkyreach1Gnt();
      }
      if (skyreach1.checked && !vm.gnt) {
        vm.removeSkyreach1Gnt();
        vm.gntOn(null);
      }
      if (!skyreach1.checked && vm.gnt) {
        vm.removeSkyreach1Gnt();
        vm.addSkyreach1Con(null);
      }

      //======================================
      if (!skyreach1.checked) {
        vm.addSkyreach1Con(null);
        vm.removeSkyreach1();
        vm.removeSkyreach1Gnt();
      }
    };

    window.Skyreach2On = function (skyreach2) {
      if (skyreach2.checked) {
        vm.addSkyreach2Con(true);
      }

      //EIRP
      if (vm.eirp && skyreach2.checked) {
        vm.addSkyreach2();
      }
      if (skyreach2.checked && !vm.eirp && !vm.gnt) {
        vm.removeSkyreach2();
        document.getElementById("checkbox").checked = true;
        window.eirpOn(skyreach2);
      }
      if (!skyreach2.checked && vm.eirp) {
        vm.removeSkyreach2();
        vm.addSkyreach2Con(null);
      }

      //GNT
      if (vm.gnt && skyreach2.checked) {
        vm.addSkyreach2Gnt();
      }
      if (skyreach2.checked && !vm.gnt) {
        vm.removeSkyreach2Gnt();
        vm.gntOn(null);
      }
      if (!skyreach2.checked && vm.gnt) {
        vm.removeSkyreach2Gnt();
        vm.addSkyreach2Con(null);
      }

      if (!skyreach2.checked) {
        vm.addSkyreach2Con(null);
        vm.removeSkyreach2();
      }
    };

    window.Apstar9On = function (apstar9) {
      if (apstar9.checked) {
        vm.addApstar9Con(true);
      }

      //EIRP
      if (vm.eirp && apstar9.checked) {
        vm.addApstar9();
      }
      if (apstar9.checked && !vm.eirp && !vm.gnt) {
        vm.removeApstar9();
        document.getElementById("checkbox").checked = true;
        window.eirpOn(apstar9);
        // vm.eirpOn(null);
      }
      if (!apstar9.checked && vm.eirp) {
        vm.removeApstar9();
        vm.addApstar9Con(null);
      }
      if (!apstar9.checked) {
        vm.addApstar9Con(null);
        vm.removeApstar9();
      }

      //GNT
      if (vm.gnt && apstar9.checked) {
        vm.addApstar9Gnt();
      }
      if (apstar9.checked && !vm.gnt) {
        vm.removeApstar9Gnt();
        vm.gntOn(null);
      }
      if (!apstar9.checked && vm.gnt) {
        vm.removeApstar9Gnt();
        vm.addApstar9Con(null);
      }
    };

    window.Abs2On = function (abs2) {
      if (abs2.checked) {
        vm.addAbs2Con(true);
      }

      //EIRP
      if (vm.eirp && abs2.checked) {
        vm.addAbs2();
      }
      if (abs2.checked && !vm.eirp && !vm.gnt) {
        vm.removeAbs2();
        document.getElementById("checkbox").checked = true;
        window.eirpOn(abs2);
        // vm.eirpOn(null);
      }
      if (!abs2.checked && vm.eirp) {
        vm.removeAbs2();
        vm.addAbs2Con(null);
      }

      //GNT
      if (vm.gnt && abs2.checked) {
        vm.addAbs2Gnt();
      }
      if (abs2.checked && !vm.gnt) {
        vm.removeAbs2Gnt();
        vm.gntOn(null);
      }
      if (!abs2.checked && vm.gnt) {
        vm.removeAbs2Gnt();
        vm.addAbs2Con(null);
      }

      if (!abs2.checked) {
        vm.addAbs2Con(null);
        vm.removeAbs2();
      }
    };

    window.OcnOn = function (ocn) {
      if (ocn.checked) {
        vm.addOceanBeamCon(true);
      }

      //EIRP
      if (vm.eirp && ocn.checked) {
        vm.addOceanBeam();
      }
      if (ocn.checked && !vm.eirp && !vm.gnt) {
        vm.removeOceanBeam();
        document.getElementById("checkbox").checked = true;
        window.eirpOn(ocn);
        // vm.eirpOn(null);
      }
      if (!ocn.checked && vm.eirp) {
        vm.removeOceanBeam();
        vm.addOceanBeamCon(null);
      }

      //GNT
      if (vm.gnt && ocn.checked) {
        vm.addOceanBeamGnt();
      }
      if (ocn.checked && !vm.gnt) {
        vm.removeOceanBeamGnt();
        vm.gntOn(null);
      }
      if (!ocn.checked && vm.gnt) {
        vm.removeOceanBeamGnt();
        vm.addOceanBeamCon(null);
      }

      if (!ocn.checked) {
        vm.addOceanBeamCon(null);
        vm.removeOceanBeam();
      }
    };
  },

  methods: {
    ...mapActions([
      "fetchVessel",
      "fetchSatNet",
      "fetchWeather",
      "searchVesselInput",
      "searchVesselID_Input",
      "searchIDThuraya_Input",
      "searchThurayaInput",
      "trylah",
      "eirpOn",
      "gntOn",
      "addSkyreach1Con",
      "addSkyreach2Con",
      "addApstar9Con",
      "addAbs2Con",
      "addOceanBeamCon",
    ]),

    removeSkyreach1: function () {
      this.$root.$emit("removeSkyreach1");
    },

    addSkyreach1: function () {
      this.$root.$emit("addSkyreach1");
    },

    removeFleetLabel: function () {
      this.$root.$emit("removeFleetLabel");
    },

    addFleetLabel: function () {
      this.$root.$emit("addFleetLabel");
    },

    removeSkyreach1Gnt: function () {
      this.$root.$emit("removeSkyreach1Gnt");
    },

    addSkyreach2Gnt: function () {
      this.$root.$emit("addSkyreach2Gnt");
    },

    removeSkyreach2Gnt: function () {
      this.$root.$emit("removeSkyreach2Gnt");
    },

    addSkyreach1Gnt: function () {
      this.$root.$emit("addSkyreach1Gnt");
    },

    removeSkyreach2: function () {
      this.$root.$emit("removeSkyreach2");
    },

    addAbs2: function () {
      this.$root.$emit("addAbs2");
    },

    removeAbs2: function () {
      this.$root.$emit("removeAbs2");
    },

    addAbs2Gnt: function () {
      this.$root.$emit("addAbs2Gnt");
    },

    removeAbs2Gnt: function () {
      this.$root.$emit("removeAbs2Gnt");
    },

    addApstar9: function () {
      this.$root.$emit("addApstar9");
    },

    removeApstar9: function () {
      this.$root.$emit("removeApstar9");
    },

    addApstar9Gnt: function () {
      this.$root.$emit("addApstar9Gnt");
    },

    removeApstar9Gnt: function () {
      this.$root.$emit("removeApstar9Gnt");
    },

    addOceanBeam: function () {
      this.$root.$emit("addOceanBeam");
    },

    removeOceanBeam: function () {
      this.$root.$emit("removeOceanBeam");
    },

    addOceanBeamGnt: function () {
      this.$root.$emit("addOceanBeamGnt");
    },

    removeOceanBeamGnt: function () {
      this.$root.$emit("removeOceanBeamGnt");
    },

    addSkyreach2: function () {
      this.$root.$emit("addSkyreach2");
    },

    centerPeta: function (lat, lon) {
      this.$root.$emit("centerMap", lat, lon);
    },

    centerMarker: function (lat, lon) {
      this.$root.$emit("centerMarker", lat, lon);
    },

    centerMarkerDel: function () {
      this.$root.$emit("centerMarkerDel");
    },

    async fetchweather(m) {
      const data = {
        lat: m.lat,
        lon: m.lon,
        satnet: m.satnet,
      };
      this.fetchWeather(data);
    },

    async fetchsatnet(m) {
      const data = {
        lat: m.lat,
        lon: m.lon,
        satnet: m.satnet,
      };
      this.fetchSatNet(data);
    },

    showinfo(m, i) {
      this.active = true;
      this.satnet = null;
      this.weather = null;
      this.datainfo = null;
      this.fetchsatnet(m);
      this.fetchweather(m);

      if (i == "sailink") {
        this.datainfo = m;
        console.log(this.datainfo);
        this.kondisi = "sailink";
        this.kondisi_after = i;
        this.centerMarker(this.datainfo.lat, this.datainfo.lon);
      }
      if (i == "thuraya") {
        this.datainfo = m;
        console.log(this.datainfo);
        this.kondisi = "thuraya";
        this.kondisi_after = i;
        this.centerMarker(this.datainfo.lat, this.datainfo.lon);
      }
    },

    showinfosideThuraya(m) {
      let mName = m.name;
      let mmName = mName.toUpperCase();
      console.log(mmName);
      let refMarkerThuraya = this.$refs["thurayaMarker" + mmName][0].marker;
      let ref = this.$refs;

      console.log(ref);
      console.log(refMarkerThuraya);
      this.centerPeta(refMarkerThuraya.lat, refMarkerThuraya.lon);

      this.active = true;
      this.satnet = null;
      this.weather = null;
      this.datainfo = null;

      this.datainfo = refMarkerThuraya;
      this.kondisi = "thuraya";
      this.kondisi_after = "thuraya";
      this.fetchsatnet(refMarkerThuraya);
      this.fetchweather(refMarkerThuraya);
    },

    showinfosideSailink(m) {
      let mName = m.name;
      let mmName = mName.toUpperCase();
      let refMarker = this.$refs["sailinkMarker" + mmName][0].marker;
      this.centerPeta(refMarker.lat, refMarker.lon);

      this.active = true;
      this.satnet = null;
      this.weather = null;
      this.datainfo = null;

      this.datainfo = refMarker;
      this.kondisi = "sailink";
      this.kondisi_after = "sailink";
      this.fetchsatnet(refMarker);
      this.fetchweather(refMarker);
    },

    moreDetail(kondisi, item) {
      if (kondisi == "sailink") {
        this.searchVesselID_Input(item.id);
        this.searchVesselInput(item.name);
        this.$router.push("/mysailink");
      }
      if (kondisi == "thuraya") {
        this.searchIDThuraya_Input(item.id);
        this.searchThurayaInput(item.name);
        this.$router.push("/mythuraya");
      }
    },
  },

  created() {
    this.fetchVessel(localStorage.getItem("token"));
  },

  computed: {
    ...mapGetters([
      "Skyreach1Con",
      "Skyreach2Con",
      "Apstar9Con",
      "Abs2Con",
      "OceanBeamCon",
      "sailinkLocation",
      "thurayaLocation",
      "sidebarVessel",
      "satNet",
      "weaTher",
      "isAuth",
      "userToken",
      "userData",
      "eirp",
      "gnt",
    ]),
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter,
      };
    },

    mapCenter() {
      return { lat: 1.724404925138275, lng: 116.20014587484876 };
    },

    toggleclick() {
      return this.toggle;
    },
  },
};
</script>

<style>
@import "@/assets/css/navigator.css";
.title_legend{
  text-align:center;
  font-size:12px;
  margin-top:5px
}

.list_legend{
  margin-top:-2px;
  margin-left:-20px;
}

.hr_legend{
  margin-top:-10px;
  margin-bottom:10px
}

.vs_image{
  width: 8px;
  margin-right: 8px;
}

.listlist_legend{
  margin-bottom: 10px;
  
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  padding: 5px;
  text-align: left;
  background-color: #fff;
  margin-top: 15px;
  margin-left: 10px;
  border-radius: 3px;
}



/* CSS */
.bmkgDate-btn{
  appearance: button;
  backface-visibility: hidden;
  background-color:#1F7AD3;
  border-radius: 3px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
  font-size: 100%;
  height: 25px;
  line-height: 1.15;
  margin: 5px;
  width:130px;
  outline: none;
  overflow: hidden;
  padding: 0 5px;
  position: relative;
  text-align: center;
  text-transform: none;
  transform: translateZ(0);
  transition: all .2s,box-shadow .08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-9:disabled {
  cursor: default;
}

.button-9:focus {
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
}

.buttons_bmkgdat{
  display:flex
}


</style>
