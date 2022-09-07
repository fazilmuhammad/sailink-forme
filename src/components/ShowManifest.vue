<template>
    <div>
        <v-card>
          <v-container v-if="!showmanifest && showmanifestclick" fill-height fluid>
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
             <v-toolbar v-if="showmanifest" color="#1976D2" dark>
             <v-row style="text-align:left;">
                 <v-toolbar-title class="desktop_showmap"
          >Manifest Report</v-toolbar-title
        >
        <v-toolbar-subtitle class="mobile_showmap"
          >{{
            showmanifest.vessel_name
          }}</v-toolbar-subtitle
        >
             </v-row>
       
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>
        <v-toolbar-items> </v-toolbar-items>
      </v-toolbar>
          <v-card-text v-if="showmanifest">
            <!-- <p v-if="!showmanifest.graph.data">
              <v-container fill-height fluid>
                <v-row align="center" justify="center">
                  <v-col
                    ><img
                      alt="Navplus logo"
                      width="100px"
                      :src="noway"
                      class="justify-center"
                  /></v-col>
                </v-row>
              </v-container>
              <br />
              <v-text> NO DATA AVAILABLE ON {{ labeldur }} </v-text>
              <br />
              <v-text> PLEASE SELECT ANOTHER TIME FRAME </v-text>
            </p> -->
            <ManifestChart
              v-if="showmanifest.graph.data"
              v-bind:datachart="showmanifest.graph"
              v-bind:modalapp="shomanifest"
            />
            <br />
            <br />
            <br />
            <v-data-table
              :headers="headersecond"
              :items="showmanifest.output"
              :items-per-page="10"
              class="elevation-1 margintab"
            >
              <template v-slot:item="row">
                <tr>
                  <!-- <td>{{row.index}}</td> -->
                  <td>{{ row.item.Name }}</td>
                  <td>{{ row.item.volume }}</td>
                  <td>{{ row.item.traffic }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>

          <v-card-actions class="justify-end"> </v-card-actions>
        </v-card>
   
    </div>
</template>

<script>

import ManifestChart from "./charts/ManifestChart.vue";
    export default {
         components: {
    ManifestChart
},
    props: [
    "showmanifest",
    "showmanifestclick"
    ],
    data() {
        return {
               loadernavplus: require("@/assets/img/load100new.gif"),
        }
    },
  
    }
</script>

<style lang="scss" scoped>

</style>