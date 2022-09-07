<template>
  <v-app>
    <v-container
      id="map_sailink"
      v-if="!showmapthuraya && showthurayaclick"
      fill-height
      fluid
      style="height: 500px"
    >
      <v-row align="center" justify="center">
        <v-col
          ><img
            alt="Navplus logo"
            width="100px"
            :src="loadernavplus"
            class="justify-center"
        /></v-col>
      </v-row>
    </v-container>
    <div id="mapa" v-if="showmapthuraya">
      <v-toolbar color="#1976D2" dark>
        <v-toolbar-title class="desktop_showmap"
          ><v-icon>mdi-map-marker-radius</v-icon>&nbsp;&nbsp;{{
            showmapthuraya.vessel_pt
          }}</v-toolbar-title
        >
        <v-toolbar-subtitle class="mobile_showmap"
          ><v-icon>mdi-map-marker-radius</v-icon>&nbsp;&nbsp;{{
            showmapthuraya.vessel_pt
          }}</v-toolbar-subtitle
        >
        <v-spacer></v-spacer>
        <v-btn class="mx-2" fab small dark color="#0B4281" @click="removeShowThuraya()">
          <v-icon dark> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card class="flexposisi">
        <v-card class="datacard">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Thuraya Number</td>
                  <td>:&nbsp;{{ showmapthuraya.number }}</td>
                </tr>
                <tr>
                  <td>Service Plan</td>
                  <td>:&nbsp;{{ showmapthuraya.rateplan }}</td>
                </tr>
                <tr>
                  <td>Latitude, Longtitude</td>
                  <td>
                    :&nbsp;{{ showmapthuraya.message.lat }},{{
                      showmapthuraya.message.lng
                    }}
                  </td>
                </tr>
                <tr>
                  <td>DMS</td>
                  <td>:&nbsp;{{ showmapthuraya.message.dms }}</td>
                </tr>
                <tr>
                  <td>Last Updated</td>
                  <td>:&nbsp;{{ showmapthuraya.message.lastUp }}</td>
                </tr>
                <tr class="images_td">
                  <td :colspan="2" style="padding: 20px">
                    <v-container
                      @click="showDetails()"
                      style="margin-top: -15px"
                    >
                      <v-row class="fill-width">
                        <v-col v-for="p in showmapthuraya.images" :key="p">
                          <v-img
                            :src="p[0]"
                            style="height: 100px; width: 100px; margin: -10px"
                            @click="
                              (imageOpen = true),
                                (imageData = showmapthuraya.images)
                            "
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>

        <v-card class="mapcard"> 
          <v-toolbar color="#B8CCE2" dense elevation="0">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" x-small>
                  <v-icon small>mdi-update</v-icon>
                  &nbsp;
                  <div v-if="!showmaptracking">Loading...</div>
                  <div v-if="showmaptracking">
                    {{ showmaptracking.range.label }}
                  </div>
                  &nbsp;
                  <v-icon small>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn
                    block
                    plain
                    small
                    @click="showondate(showmapthuraya, '24', 'Last 24 Hour')"
                    >Last 24 Hour</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn
                    block
                    plain
                    small
                    @click="showondate(showmapthuraya, '7', 'Last 7 Days')"
                    >Last 7 Day</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn
                    block
                    plain
                    small
                    @click="showondate(showmapthuraya, '30', 'Last 30 Days')"
                    >Last 30 Day</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <v-toolbar-title v-if="!showmaptracking" style="width: 220px">
              <div class="loader-line"></div>
            </v-toolbar-title>
            <v-chip color="#fff" v-if="showmaptracking" label small>
              <v-icon small>mdi-calendar</v-icon>&nbsp;{{
                showmaptracking.range.actual
              }}</v-chip
            >
          </v-toolbar>
          <v-card-text v-if="!showmaptracking">
            <v-container
              id="map_sailink"
              fill-height
              fluid
              style="height: 220px"
            >
              <v-row align="center" justify="center">
                <v-col
                  ><img
                    alt="Navplus logo"
                    width="100px"
                    :src="loadernavplus"
                    class="justify-center"
                /></v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-text v-if="showmaptracking">
            <GMapShow :mapConfig="mapConfig">
              <template slot-scope="{ google, map }">
                <GMapMarkerShowMap
                  :marker="showmaptracking"
                  :google="google"
                  :map="map"
                />
                <GoogleMapLine
                  v-for="line in showmaptracking.tracking"
                  :key="line.id"
                  :path="showmaptracking.tracking"
                  :google="google"
                  :map="map"
                />

                <GoogleMapCircle
                  v-for="circle in showmaptracking.tracking"
                  :key="circle.id"
                  :center="{
                    lat: parseFloat(circle.lat),
                    lng: parseFloat(circle.lng),
                  }"
                  :google="google"
                  :map="map"
                />
              </template>
            </GMapShow>
          </v-card-text>
        </v-card>
      </v-card>

      <v-layout column wrap class="my-5 mobile_showmap" align-center>
        <v-container grid-list-xl style="margin-top: -10px">
          <v-layout row wrap align-center>
            <v-flex xs12 md4>
              <v-card class="mx-auto"  color="#FFF">
                <v-toolbar color="#B8CCE2" dense elevation="0" >
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" x-small>
                        <i class="bx bx-time"></i>
                        &nbsp;
                        <div v-if="!showmaptracking">Loading...</div>
                        <div v-if="showmaptracking">
                          {{ showmaptracking.range.label }}
                        </div>
                        &nbsp;
                        <i class="bx bxs-chevron-down"></i>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-btn
                          block
                          plain
                          small
                          @click="
                            showondate(showmapthuraya, '24', 'Last 24 Hour')
                          "
                          >Last 24 Hour</v-btn
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-btn
                          block
                          plain
                          small
                          @click="
                            showondate(showmapthuraya, '7', 'Last 7 Days')
                          "
                          >Last 7 Day</v-btn
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-btn
                          block
                          plain
                          small
                          @click="
                            showondate(showmapthuraya, '30', 'Last 30 Days')
                          "
                          >Last 30 Day</v-btn
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-spacer></v-spacer>
                  <v-toolbar-title v-if="!showmaptracking" style="width: 220px">
                    <div class="loader-line"></div>
                  </v-toolbar-title>
                  <v-chip color="#fff" v-if="showmaptracking" label small>{{
                    showmaptracking.range.actual
                  }}</v-chip>
                </v-toolbar>
                <v-card-text v-if="!showmaptracking">
                  <v-container
                    id="map_sailink"
                    fill-height
                    fluid
                    style="height: 220px"
                  >
                    <v-row align="center" justify="center">
                      <v-col
                        ><img
                          alt="Navplus logo"
                          width="100px"
                          :src="loadernavplus"
                          class="justify-center"
                      /></v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-text v-if="showmaptracking">
                  <GMapShow :mapConfig="mapConfig" >
                    <template slot-scope="{ google, map }">
                      <GMapMarkerShowMap
                        :marker="showmaptracking"
                        :google="google"
                        :map="map"
                      />
                      <GoogleMapLine
                        v-for="line in showmaptracking.tracking"
                        :key="line.id"
                        :path="showmaptracking.tracking"
                        :google="google"
                        :map="map"
                      />

                      <GoogleMapCircle
                        v-for="circle in showmaptracking.tracking"
                        :key="circle.id"
                        :center="{
                          lat: parseFloat(circle.lat),
                          lng: parseFloat(circle.lng),
                        }"
                        :google="google"
                        :map="map"
                      />
                    </template>
                  </GMapShow>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 md4>
              <v-card class="mx-auto"  color="#FFFF">
                <v-simple-table dense>
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>Thuraya Number</td>
                        <td>:&nbsp;{{ showmapthuraya.number }}</td>
                      </tr>
                      <tr>
                        <td>Service Plan</td>
                        <td>:&nbsp;{{ showmapthuraya.rateplan }}</td>
                      </tr>
                      <tr>
                        <td>Latitude, Longtitude</td>
                        <td>
                          :&nbsp;{{ showmapthuraya.message.lat }},{{
                            showmapthuraya.message.lng
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td>DMS</td>
                        <td>:&nbsp;{{ showmapthuraya.message.dms }}</td>
                      </tr>
                      <tr>
                        <td>Last Updated</td>
                        <td>:&nbsp;{{ showmapthuraya.message.lastUp }}</td>
                      </tr>
                       <tr class="images_td">
                  <td :colspan="2" style="padding: 20px">
                    <v-container
                      @click="showDetails()"
                      style="margin-top: -15px"
                    >
                      <v-row class="fill-width">
                        <v-col v-for="p in showmapthuraya.images" :key="p">
                          <v-img
                            :src="p[0]"
                            style="height: 100px; width: 100px; margin: -10px"
                            @click="
                              (imageOpen = true),
                                (imageData = showmapthuraya.images)
                            "
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>

      <v-card class="datatabledetail">
        <v-toolbar
          v-if="showmapthuraya"
          elevation="4"
          style="max-height: 70px"
          color="#B8CCE2"
          fixed
        >
          <v-btn color="primary" style="cursor: not-allowed; margin: 5px" small
            ><v-icon small>mdi-file-move</v-icon> &nbsp;Export CSV</v-btn
          >
          <v-btn color="primary" style="cursor: not-allowed; margin: 5px" small
            ><v-icon small>mdi-file-move</v-icon> &nbsp;Export PDF</v-btn
          >

          <v-spacer></v-spacer>

          <v-card-text class="searchbar">
            <v-text-field
              dense
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              solo
              hide-details
            ></v-text-field>
          </v-card-text>
          <v-card-text class="itempage">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  dense
                  :value="itemsPerPage"
                  label="Items per page"
                  type="number"
                  min="-1"
                  max="15"
                  solo
                  hide-details
                  v-bind="attrs"
                  v-on="on"
                  @input="itemsPerPage = parseInt($event, 10)"
                ></v-text-field>
              </template>
              <v-list>
                <v-list-item @click="itemsPerPage = 5"
                  ><v-list-item-title>5</v-list-item-title></v-list-item
                >
                <v-list-item @click="itemsPerPage = 10"
                  ><v-list-item-title>10</v-list-item-title></v-list-item
                >
                <v-list-item @click="itemsPerPage = 15"
                  ><v-list-item-title>15</v-list-item-title></v-list-item
                >
                <v-list-item @click="itemsPerPage = 20"
                  ><v-list-item-title>20</v-list-item-title></v-list-item
                >
              </v-list>
            </v-menu>
          </v-card-text>
        </v-toolbar>
        <v-layout v-resize="onResize" column style="">
          <v-container
            id="map_sailink"
            v-if="!showmaptracking"
            fill-height
            fluid
            style="height: 250px"
          >
            <v-row align="center" justify="center">
              <v-col
                ><img
                  alt="Navplus logo"
                  width="100px"
                  :src="loadernavplus"
                  class="justify-center"
              /></v-col>
            </v-row>
          </v-container>
          <v-data-table
            :search="search"
            style="margin-top: 0px"
            v-if="showmaptracking && showmapthuraya.weather == null"
            :headers="headersData"
            :items="tableTracking"
            hide-default-footer
            :page.sync="page"
            :items-per-page="itemsPerPage"
            class="elevation-1"
            @page-count="pageCount = $event"
          >
            <template v-slot:item="row">
              <tr>
                <td style="white-space: nowrap; padding: 1em">
                  {{ row.item.index + 1 }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ row.item.lat }} , {{ row.item.lng }}<br />({{
                    row.item.dms
                  }})
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ row.item.heading }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ row.item.speed }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ row.item.distance }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ row.item.rx_snr }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ row.item.modcod }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ row.item.tx }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ row.item.satnet }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ row.item.dateTime }}
                </td>
              </tr>
            </template>
          </v-data-table>
          <v-data-table
            :search="search"
            style="margin-top: 0px"
            v-if="showmaptracking && showmapthuraya.weather != null"
            :headers="headers"
            :items="thurayadataTable"
            multi-sort
            hide-default-footer
            :page.sync="page"
            :items-per-page="itemsPerPage"
            class="elevation-1"
            @page-count="pageCount = $event"
            item-key="msg_id"
            :expanded.sync="expanded"
            :single-expand="singleExpand"
          >
            <template v-slot:item="{ item, expand, isExpanded }">
              <tr>
                <td>
                  <v-btn
                    x-small
                    class="mx-2"
                    fab
                    dark
                    color="primary"
                    @click="
                      expand(!isExpanded),
                        showwth(showmapthuraya.id, item.msg_id, 'sailink')
                    "
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </td>
                <td>{{ item.index + 1 }}</td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.lat }} , {{ item.lng }}<br />({{ item.dms }})
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.dms }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.altitude }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.speed }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.heading }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.distance }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.dateTime }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.dateTime_local }}
                </td>
              </tr>
            </template>

            <template v-slot:expanded-item="{ headers }">
              <td :colspan="headers.length" style="background-color: #b8cce2">
                <v-toolbar dense color="#B8CCE2" elevation="2">
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  Weather & Wave
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer
                ></v-toolbar>
                <v-progress-linear
                  v-if="!weather_data"
                  indeterminate
                  color="#0B4281"
                  height="7"
                  striped
                ></v-progress-linear>
                <v-row v-if="weather_data" no-gutters style="flex-wrap: nowrap">
                  <v-col
                    cols="1"
                    style="min-width: 100px; max-width: 100%; margin: 5px"
                    class="flex-grow-1 flex-shrink-0"
                  >
                    <v-card class="pa-2" outlined tile>
                      <v-card-text>
                        <v-simple-table>
                          <template v-slot:default>
                            <tr>
                              <td style="padding: 6px">Weather</td>
                              <td style="padding: 6px">
                                {{ weather_data.weather }}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 6px">Wind Direction</td>
                              <td style="padding: 6px">
                                {{ weather_data.windDirection }}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 6px">Wind Speed</td>
                              <td style="padding: 6px">
                                {{ weather_data.windSpeed }}
                              </td>
                            </tr>
                          </template>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="1"
                    style="min-width: 100px; max-width: 100%; margin: 5px"
                    class="flex-grow-1 flex-shrink-0"
                  >
                    <v-card class="pa-2" outlined tile>
                      <v-card-text>
                        <v-simple-table>
                          <template v-slot:default>
                            <tr>
                              <td style="padding: 6px">Temperature</td>
                              <td style="padding: 6px">
                                {{ weather_data.temperature }}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 6px">Humidity</td>
                              <td style="padding: 6px">
                                {{ weather_data.humidity }}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 6px">Dew Point</td>
                              <td style="padding: 6px">
                                {{ weather_data.dewPoint }}
                              </td>
                            </tr>
                          </template>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="1"
                    style="min-width: 100px; max-width: 100%; margin: 5px"
                    class="flex-grow-1 flex-shrink-0"
                  >
                    <v-card class="pa-2" outlined tile>
                      <v-card-text>
                        <v-simple-table>
                          <template v-slot:default>
                            <tr>
                              <td style="padding: 6px">Wave Height</td>
                              <td style="padding: 6px">
                                {{ weather_data.waveSignificantHeight }}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 6px">Wave From Direction</td>
                              <td style="padding: 6px">
                                {{ weather_data.waveFromDirection }}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 6px">
                                <p style="height: 2px"></p>
                              </td>
                              <td style="padding: 6px">
                                <p style="height: 2px"></p>
                              </td>
                            </tr>
                          </template>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </td>
            </template>
          </v-data-table>
          <div
            class="pt-2"
            style="background-color: #b8cce2; padding: 20px; height: 4rem"
          >
            <v-pagination
              v-if="showmapthuraya"
              v-model="page"
              :length="pageCount"
              :total-visible="7"
            ></v-pagination>
          </div>
        </v-layout>

        <div id="app">
          <v-app id="inspire"> </v-app>
        </div>
      </v-card>

      <!--Modal Image-->
      <v-dialog v-model="imageOpen" width="600px">
        <v-carousel v-model="model" style="width: 650px; height: 450px">
          <v-carousel-item
            @click="(imageOpen = true), (imageData = showmapthuraya.images)"
            v-for="image in showmapthuraya.images"
            :key="image"
          >
            <v-img :src="image[0]" style="width: 650px; height: 450px"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-dialog>
      <!--Modal Notif End-->
    </div>
  </v-app>
</template>

<script>
import mapstyle from "@/assets/json/mapstyle.json";
import GMapShow from "@/components/maps/GMapShow.vue";
import GMapMarkerShowMap from "@/components/maps/GMapMarkerShowMap.vue";
import GoogleMapLine from "./GoogleMapLine";
import GoogleMapCircle from "./GoogleMapCircle.vue";
import { mapSettingsShow } from "@/constants/mapSettings";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    GMapShow,
    GMapMarkerShowMap,
    GoogleMapLine,
    GoogleMapCircle,
  },
  data() {
    return {
      
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      loadernavplus: require("@/assets/img/load100new.gif"),
      headers: [
        {
          text: " ",
          align: "start",
        },
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Latitude, Longtitude ", value: "name" },
        { text: "DMS", value: "pt_name" },
        { text: "Altitude", value: "pt_name" },
        { text: "Speed (Knots)", value: "pt_group" },
        { text: "Heading (Degree)", value: "pt_name" },
        { text: "Distance(Nmi)", value: "serial_number" },
        { text: "dateTime (UTC)", value: "good" },
        { text: "dateTime (GMT+7)", value: "good" },
      ],
      options: {
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: mapstyle,
      },
      imageOpen: null,
      imageData: null,
      msg_id_after: null,
      weather_data: null,
    };
  },
  created() {
    const el = this.$el.querySelector("#mapa");
    el.scrollIntoView();
  },

  methods: {
    ...mapActions(["showonMapThuraya", "showdateThuraya","removeShowThuraya"]),

    async showweather(vid, msgid, type) {
      this.msg_id_after = msgid;
      this.weather_data = null;
      const data = {
        id: vid,
        msg_id: msgid,
        type: type,
      };
      const response = await axios.post("v1/navplus/weather/fetchRow", data, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      });
      console.log(response);
      this.weather_data = response.data.data;
    },
  },

  computed: {
    ...mapGetters([
      "showmapthuraya",
      "showmaptracking",
      "showthurayaclick",
      "thurayadataTable",
    ]),
    mapConfig() {
      return {
        ...mapSettingsShow,
        center: this.mapCenter,
      };
    },

    mapCenter() {
      return {
        lat: parseFloat(this.showmapthuraya.maptop.lat),
        lng: parseFloat(this.showmapthuraya.maptop.lon),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.posisi {
    float: right;
    height: 450px;
  }
  
  .track_txt {
    font-size: 15px;
    margin-top: 17px;
    margin-right: 15px;
  }
  
  .flexposisi {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    padding: 25px;
  }
  
  .list-group {
    text-align: left;
    width: 500px;
  }
  
  ul {
    list-style-type: none;
  }
  
  .btnlinkstatus {
    background-color: #a0f59d;
    border-radius: 3px;
    border: 1px solid #033301;
    box-shadow: rgba(146, 241, 162, 0.7) 0 1px 0 0 inset;
    box-sizing: border-box;
    color: #033301;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
      sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.15385;
    margin: 0;
    outline: none;
    padding: 8px 0.8em;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    white-space: nowrap;
  }
  
  .btnlinkstatus,
  .btnlinkstatus {
    background-color: #a0f59d;
    color: #033301;
  }
  
  .btnlinkstatus {
    box-shadow: 0 0 0 4px rgba(4, 59, 104, 0.15);
  }
  
  .btnlinkstatus {
    background-color: #a0f59d;
    box-shadow: none;
    color: #033301;
  }
  
  .txt_showmap {
    color: #2c2c2c;
    margin-top: 15px;
  }
  
  .images_td {
    background-color: #e8ebef;
  }
  
  .fill-width {
    overflow-y: auto;
    height: 15rem;
    width:100%;
    margin-top: 5px;
  }
  
  .mobile_showmap {
    display: none;
  }
  
  .desktop_showmap {
    display: block;
  }
  
  
  /* x-Small Mobile Devices */
  @media (max-width: 280px) {
      .flexposisi {
      display: none;
    }
  
    .mobile_showmap {
      display: block;
    }
  
    .desktop_showmap {
      display: none;
    }
  }
  
  /* Small Mobile Devices */
  @media (min-width: 280px) and (max-width: 319px) {
      .flexposisi {
      display: none;
    }
  
    .mobile_showmap {
      display: block;
    }
  
    .desktop_showmap {
      display: none;
    }
  }
  
  
  /* Mobile Devices */
  @media (min-width: 320px) and (max-width: 480px) {
    .flexposisi {
      display: none;
    }
  
    .mobile_showmap {
      display: block;
    }
  
    .desktop_showmap {
      display: none;
    }
  }
  
  /* iPads, Tablets */
  @media (min-width: 481px) and (max-width: 768px) {
    .flexposisi {
      display: none;
    }
  
    .mobile_showmap {
      display: block;
    }
  
    .desktop_showmap {
      display: none;
    }
  }
  
  /* Small screens, laptops */
  @media (min-width: 769px) and (max-width: 1024px) {
    .flexposisi {
      display: flex;
    }
    .datacard{
      width: 47%
    }
     .mapcard {
      width: 52%;
    }
  
    .mobile_showmap {
      display: none;
    }
  
    .desktop_showmap {
      display: block;
    }
  }
  
  /* Desktops, large screens */
  @media (min-width: 1025px) and (max-width: 1200px) {
    .flexposisi {
      display: flex;
    }

    .datacard{
      width: 42%
    }
     .mapcard {
      width: 50%;
    }
  
    .mapcard {
      width: 35rem;
    }
    .mobile_showmap {
      display: none;
    }
  }
  
  /* Extra large screens / TV */
  @media screen and (min-width: 1201px) {
    .flexposisi {
      display: flex;
    }
  
    .datacard {
      width: 40%;
    }
    .mapcard {
      width: 59%;
    }
    .mobile_showmap {
      display: none;
    }
  }

</style>
