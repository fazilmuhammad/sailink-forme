<template>
<div>
<v-card-text v-if="!rpmData && rpmshowclick">
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
    <div v-if="rpmData">
       
       <v-card>
        <v-toolbar dark color="primary">
        <v-toolbar-title >
            RPM Report
        </v-toolbar-title>
       
        </v-toolbar>
        <v-toolbar  dense>
              {{rpmData.vessel_number}}
              <v-spacer></v-spacer>
              {{rpmData.range.range_actual}}
              &nbsp;
               <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" small>
                  <i class="bx bx-time"></i>
                  &nbsp; &nbsp;
                  <v-text v-if="rpmData">{{ rpmData.range.range }}</v-text>
                  <v-card-text v-if="!rpmData">
                    <div class="snippet" data-title=".dot-pulse">
                      <div class="stage">
                        <div class="dot-pulse"></div>
                      </div>
                    </div>
                  </v-card-text>
                  &nbsp; &nbsp;
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
                      sendDataRPM(rpmID, 'today'),
                        delmodaldest()
                    "
                    >Today</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn
                    block
                    plain
                    small
                    @click="
                      sendDataRPM(rpmID, 'week'),
                        delmodaldest()
                    "
                    >This Week</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn
                    block
                    plain
                    small
                     @click="
                      sendDataRPM(rpmID, 'month'),
                        delmodaldest()
                    "
                    >This Month</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn
                    block
                    plain
                    small
                     @click="
                      sendDataRPM(rpmID, 'lmonth'),
                        delmodaldest()
                    "
                    >Last Month</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
        </v-toolbar>   
        <v-card-text>
            <RpmChartVue
              v-if="rpmData"
              v-bind:datachart="rpmData.chart"
              v-bind:modalapp="rpmData"
            />
        </v-card-text>
         <v-card-text v-if="rpmData">
                  <GMapShow
                    :mapConfig="mapConfig"
                    apiKey="AIzaSyBQjzq4sjWEQWvUrwDo8b7d-ggJn0JnunA"
                  >
                    <template slot-scope="{ google, map }">
                      <GMapMarkerShowMap
                        :marker="showmaptracking"
                        :google="google"
                        :map="map"
                      />
                      <GoogleMapLine
                        v-for="line in rpmData.tracking"
                        :key="line.id"
                        :path="rpmData.tracking"
                        :google="google"
                        :map="map"
                      />

                      <GoogleMapCircle
                        v-for="circle in rpmData.tracking"
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
        <v-card-text>
             <v-data-table
             v-if="rpmOutput"
                :headers="headers"
                :items="rpmOutput"
                :items-per-page="5"
                class="elevation-1 margintab"
              >
                <template v-slot:item="row">
                  <tr>
                    <td>{{row.item.index+1}}</td>
                    <td>{{ row.item.current }}</td>
                    <td>{{ row.item.avg }}</td>
                    <td>{{ row.item.min }}</td>
                    <td>{{ row.item.max }}</td>
                    <td>{{ row.item.interval }}</td>
                    <td>{{ row.item.uptime }}</td>
                    <td>{{ row.item.latitude }},{{row.item.longitude}}</td>
                    <td>{{row.item.heading}}</td>
                    <td>{{row.item.speed}}</td>
                    <td>{{row.item.distance}}</td>
                    <td>{{row.item.dateTime_local}}</td>
                  </tr>
                </template>
              </v-data-table>
        </v-card-text>   
       </v-card>
    </div>
</div>
 
</template>

<script>
import RpmChartVue from './charts/RpmChart.vue';
import GMapShow from "@/components/maps/GMapShow.vue";
import GMapMarkerShowMap from "@/components/maps/GMapMarkerShowMap.vue";
import GoogleMapLine from "./GoogleMapLine";
import GoogleMapCircle from "./GoogleMapCircle.vue";
import { mapSettingsShow } from "@/constants/mapSettings";

    export default {
    props:['rpmData','rpmOutput','rpmID','rpmshowclick'],
         components: {
    GMapShow,
    GMapMarkerShowMap,
    GoogleMapLine,
    GoogleMapCircle,
    RpmChartVue
  },

  data() {
    return {
          loadernavplus: require("@/assets/img/load100new.gif"),
          headers: [
        {
        text: '#',
        align: 'start',
        sortable: false,
        value: 'id',
        },
        { text: "Current (RPM)", value: "name" },
        { text: "Average (RPM)", value: "pt_name" },
        { text: "Min (RPM)", value: "pt_name" },
        { text: "Max (RPM)", value: "pt_name" },
        { text: "Interval (Minutes)", value: "pt_name" },
        { text: "Uptime (Minutes)", value: "pt_name" },
        { text: "Latitude, Longtitude", value: "pt_name" },
        { text: "Heading (Degree)", value: "pt_name" },
        { text: "Speed (Knots)", value: "pt_name" },
        { text: "Distance (Nmi)", value: "pt_name" },
        { text: "dateTime (GMT+7)", value: "pt_name" },
      ],
    }
  },
  methods: {
    sendDataRPM: function (id, range) {
      this.$root.$emit("sendDataRPM", id, range);
    },
  },
    computed: {
    mapConfig() {
      return {
        ...mapSettingsShow,
        center: this.mapCenter,
      };
    },

    mapCenter() {
      return {
        lat: parseFloat(this.rpmData.maptop.lat),
        lng: parseFloat(this.rpmData.maptop.lon),
      };
    },
  },
    }
</script>

<style lang="scss" scoped>

</style>