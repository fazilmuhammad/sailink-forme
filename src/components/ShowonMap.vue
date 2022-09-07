<template>
  <div>
    <v-container
      id="map_sailink"
      v-if="!showmaptable && showmapclick"
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
    <div class="container_showonmap" v-if="showmaptable" id="mapa">
      <v-toolbar color="#1976D2" dark>
        <v-toolbar-title class="desktop_showmap"
          ><v-icon>mdi-map-marker-radius</v-icon>&nbsp;&nbsp;{{
            showmaptable.vessel_pt
          }}</v-toolbar-title
        >
        <v-toolbar-subtitle class="mobile_showmap"
          ><v-icon>mdi-map-marker-radius</v-icon>&nbsp;&nbsp;{{
            showmaptable.vessel_pt
          }}</v-toolbar-subtitle
        >
        <v-spacer></v-spacer>
          <v-btn
      class="mx-2"
      fab
      small
      dark
      color="#0B4281"
      @click="removeShowMap()"
    >
      <v-icon dark>
        mdi-close
      </v-icon>
    </v-btn>
        
      </v-toolbar>

      <v-card class="flexposisi">
        <v-card class="datacard">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>SatNet</td>
                  <td>{{ showmaptable.message.satnet }}</td>
                </tr>
                <tr>
                  <td>Type Terminal</td>
                  <td>{{ showmaptable.device.terminal }}</td>
                </tr>
                <tr>
                  <td>IP Address</td>
                  <td v-if="!ip_adr">Loading...</td>
                  <td v-if="ip_adr">
                    {{ ip_adr.ip_addr }}
                  </td>
                </tr>
                <tr>
                  <td>Link Status</td>
                  <td v-if="!ln_status">
                    <v-chip
                      style="cursor: pointer"
                      x-small
                      color="#1976D2"
                      text-color="white"
                      >Updating..</v-chip
                    >
                  </td>
                  <td v-if="ln_status">
                    <v-chip
                      v-if="ln_status.status == 'UP'"
                      @click="lnStatus(showmaptable.id)"
                      style="cursor: pointer"
                      x-small
                      color="green"
                      text-color="white"
                      ><v-icon x-small>mdi-refresh</v-icon>&nbsp;{{
                        ln_status.status
                      }}</v-chip
                    >

                    <v-chip
                      v-if="ln_status.status != 'UP'"
                      @click="lnStatus(showmaptable.id)"
                      style="cursor: pointer"
                      x-small
                      color="red"
                      text-color="white"
                      ><v-icon x-small>mdi-refresh</v-icon
                      >{{ ln_status.status }}</v-chip
                    >
                  </td>
                </tr>
                <tr>
                  <td>RX SNR</td>
                  <td>{{ showmaptable.message.rx_snr }}</td>
                </tr>
                <tr>
                  <td>TX Power</td>
                  <td>{{ showmaptable.message.tx_power }}</td>
                </tr>
                <tr>
                  <td>MODCOD</td>
                  <td>{{ showmaptable.message.modcod }}</td>
                </tr>

                <tr>
                  <td>Latitude, Longtitude</td>
                  <td>{{ showmaptable.message.latlong }}</td>
                </tr>
                <tr>
                  <td>DMS</td>
                  <td>{{ showmaptable.message.dms }}</td>
                </tr>
                <tr>
                  <td>Last Updated</td>
                  <td>{{ showmaptable.message.last_up }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
           <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                
                 <tr>
                  <td colspan="2" style="padding: 16px">
                    <v-chip dark color="#48C67D" label>{{
                      showmaptable.band.service_name
                    }}</v-chip>
                  </td>
                 
                </tr>
                <tr>
                  <td><b>Metered</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Quota</td>
                  <td>{{ showmaptable.band.quota }}</td>
                </tr>
                <tr>
                  <td>Quota Used</td>
                  <td>
                    <row>
                      <p style="font-size: 10px; margin-bottom: 0px">
                        {{ showmaptable.band.used }} ({{
                          showmaptable.band.percentage
                        }}
                        %)
                      </p>
                      <v-progress-linear
                        height="10"
                        :value="showmaptable.band.percentage"
                        color="primary"
                      ></v-progress-linear
                    ></row>
                  </td>
                </tr>
                <tr>
                  <td>Upload</td>
                  <td>{{ showmaptable.band.m_upload }}</td>
                </tr>
                <tr>
                  <td>Download</td>
                  <td>{{ showmaptable.band.m_download }}</td>
                </tr>
                <tr>
                  <td><b>Unmetered</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Upload</td>
                  <td>{{ showmaptable.band.um_upload }}</td>
                </tr>
                <tr>
                  <td>Download</td>
                  <td>{{ showmaptable.band.um_download }}</td>
                </tr>
                <tr class="images_td">
                  <td :colspan="2" style="padding: 0px"></td>
                </tr>
                <tr class="images_td">
                  <td :colspan="2" style="padding: 20px">
                    <v-container
                      @click="showDetails()"
                      style="margin-top: -15px"
                    >
                      <v-row class="fill-width">
                        <v-col v-for="p in showmaptable.images" :key="p">
                          <v-img
                            :src="p[0]"
                            style="height: 100px; width: 100px; margin: -10px"
                            @click="
                              (imageOpen = true),
                                (imageData = showmaptable.images)
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
                    @click="showdate(showmaptable.id, '24', 'Last 24 Hour')"
                    >Last 24 Hour</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn
                    block
                    plain
                    small
                    @click="showdate(showmaptable.id, '7', 'Last 7 Days')"
                    >Last 7 Day</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn
                    block
                    plain
                    small
                    @click="showdate(showmaptable.id, '30', 'Last 30 Days')"
                    >Last 30 Day</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <v-toolbar-title v-if="!showmaptracking" style="width: 220px">
              <div class="loader-line"></div>
            </v-toolbar-title>
            <v-chip color="#fff" v-if="showmaptracking" label small
              ><v-icon small>mdi-calendar</v-icon>&nbsp;{{
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
            <GMapShow
              :mapConfig="mapConfig"
            >
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

          <v-card-text>
            <v-toolbar dense dark color="primary">
              <v-spacer></v-spacer>
              User Who Can See This Vessel
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-data-table
              :headers="headersUser"
              :items="vesselUsers"
              :items-per-page="4"
              class="elevation-1"
              hide-default-footer
              :page.sync="pageUser"
              @page-count="pageCountUser = $event"
              dense
            >
              <template v-slot:item="row">
                <tr>
                  <td style="white-space: nowrap; padding: 1em">
                    {{ row.item.index + 1 }}
                  </td>
                  <td style="white-space: nowrap; padding: 1em">
                    {{ row.item.name }}
                  </td>
                  <td style="white-space: nowrap; padding: 1em">
                    {{ row.item.email }}
                  </td>
                  <td style="white-space: nowrap; padding: 1em">
                    {{ row.item.role_name }}
                  </td>
                  <td style="white-space: nowrap; padding: 1em">
                    {{ row.item.lastLogin }}
                  </td>
                </tr>
              </template>
            </v-data-table>
            <div
              class="pt-2"
              style="background-color: #b8cce2; padding: 20px; height: 4rem"
            >
              <v-pagination
                dense
                v-if="showmaptable"
                v-model="pageUser"
                :length="pageCountUser"
                :total-visible="7"
              ></v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-card>

      <v-layout column wrap class="my-5 mobile_showmap" align-center>
        <v-container grid-list-xl>
          <v-layout row wrap align-center>
            <v-flex xs12 md4>
              <v-card class="mx-auto" color="#FFF">
                <v-toolbar elevation="0" dense>
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
                            showondate(showmaptable, '24', 'Last 24 Hour')
                          "
                          >Last 24 Hour</v-btn
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-btn
                          block
                          plain
                          small
                          @click="showondate(showmaptable, '7', 'Last 7 Days')"
                          >Last 7 Day</v-btn
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-btn
                          block
                          plain
                          small
                          @click="
                            showondate(showmaptable, '30', 'Last 30 Days')
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
                  <v-chip v-if="showmaptracking" label small>{{
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
                  <GMapShow
                    :mapConfig="mapConfig"
                  >
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
                <v-card-text>
                  <v-toolbar dense dark color="primary">
                    <v-spacer></v-spacer>
                    User Who Can See This Vessel
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-data-table
                    :headers="headersUser"
                    :items="vesselUsers"
                    :items-per-page="4"
                    class="elevation-1"
                    hide-default-footer
                    :page.sync="pageUser"
                    @page-count="pageCountUser = $event"
                    dense
                  >
                    <template v-slot:item="row">
                      <tr>
                        <td style="white-space: nowrap; padding: 1em">
                          {{ row.item.index + 1 }}
                        </td>
                        <td style="white-space: nowrap; padding: 1em">
                          {{ row.item.name }}
                        </td>
                        <td style="white-space: nowrap; padding: 1em">
                          {{ row.item.email }}
                        </td>
                        <td style="white-space: nowrap; padding: 1em">
                          {{ row.item.role_name }}
                        </td>
                        <td style="white-space: nowrap; padding: 1em">
                          {{ row.item.lastLogin }}
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                  <div
                    class="pt-2"
                    style="
                      background-color: #b8cce2;
                      padding: 20px;
                      height: 4rem;
                    "
                  >
                    <v-pagination
                      dense
                      v-if="showmaptable"
                      v-model="pageUser"
                      :length="pageCountUser"
                      :total-visible="7"
                    ></v-pagination>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 md4>
              <v-card>
                <v-simple-table dense>
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>SatNet</td>
                        <td>{{ showmaptable.message.satnet }}</td>
                      </tr>
                      <tr>
                        <td>Type Terminal</td>
                        <td>{{ showmaptable.device.terminal }}</td>
                      </tr>
                      <tr>
                        <td>IP Address</td>
                        <td v-if="!ip_adr">Loading...</td>
                        <td v-if="ip_adr">
                          {{ ip_adr.ip_addr }}
                        </td>
                      </tr>
                      <tr>
                        <td>Link Status</td>
                        <td v-if="!ln_status">
                          <v-chip
                            style="cursor: pointer"
                            x-small
                            color="#1976D2"
                            text-color="white"
                            >Updating..</v-chip
                          >
                        </td>
                        <td v-if="ln_status">
                          <v-chip
                            v-if="ln_status.status == 'UP'"
                            @click="lnStatus(showmaptable.id)"
                            style="cursor: pointer"
                            x-small
                            color="green"
                            text-color="white"
                            ><v-icon x-small>mdi-refresh</v-icon>&nbsp;{{
                              ln_status.status
                            }}</v-chip
                          >

                          <v-chip
                            v-if="ln_status.status != 'UP'"
                            @click="lnStatus(showmaptable.id)"
                            style="cursor: pointer"
                            x-small
                            color="red"
                            text-color="white"
                            ><v-icon x-small>mdi-refresh</v-icon
                            >{{ ln_status.status }}</v-chip
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>RX SNR</td>
                        <td>{{ showmaptable.message.rx_snr }}</td>
                      </tr>
                      <tr>
                        <td>TX Power</td>
                        <td>{{ showmaptable.message.tx_power }}</td>
                      </tr>
                      <tr>
                        <td>MODCOD</td>
                        <td>{{ showmaptable.message.modcod }}</td>
                      </tr>

                      <tr>
                        <td>Latitude, Longtitude</td>
                        <td>{{ showmaptable.message.latlong }}</td>
                      </tr>
                      <tr>
                        <td>DMS</td>
                        <td>{{ showmaptable.message.dms }}</td>
                      </tr>
                      <tr>
                        <td>Last Updated</td>
                        <td>{{ showmaptable.message.last_up }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-flex>

            <v-flex xs12 md4>
              <v-card>
                <v-simple-table dense>
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td style="padding: 16px">
                          <v-chip dark color="#48C67D" label>{{
                            showmaptable.band.service_name
                          }}</v-chip>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><b>Metered</b></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Quota</td>
                        <td>{{ showmaptable.band.quota }}</td>
                      </tr>
                      <tr>
                        <td>Quota Used</td>
                        <td>
                          <row>
                            <p style="font-size: 10px; margin-bottom: 0px">
                              {{ showmaptable.band.used }} ({{
                                showmaptable.band.percentage
                              }}
                              %)
                            </p>
                            <v-progress-linear
                              height="10"
                              :value="showmaptable.band.percentage"
                              color="primary"
                            ></v-progress-linear
                          ></row>
                        </td>
                      </tr>
                      <tr>
                        <td>Upload</td>
                        <td>{{ showmaptable.band.m_upload }}</td>
                      </tr>
                      <tr>
                        <td>Download</td>
                        <td>{{ showmaptable.band.m_download }}</td>
                      </tr>
                      <tr>
                        <td><b>Unmetered</b></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Upload</td>
                        <td>{{ showmaptable.band.um_upload }}</td>
                      </tr>
                      <tr>
                        <td>Download</td>
                        <td>{{ showmaptable.band.um_download }}</td>
                      </tr>
                      <tr class="images_td">
                        <td :colspan="2" style="padding: 0px"></td>
                      </tr>
                      <tr class="images_td">
                        <td :colspan="2" style="padding: 20px">
                          <v-container
                            @click="showDetails()"
                            style="margin-top: -15px"
                          >
                            <v-row class="fill-width">
                              <v-col v-for="p in showmaptable.images" :key="p">
                                <v-img
                                  :src="p[0]"
                                  style="
                                    height: 100px;
                                    width: 100px;
                                    margin: -10px;
                                  "
                                  @click="
                                    (imageOpen = true),
                                      (imageData = showmaptable.images)
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
          v-if="showmaptable"
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
            v-if="showmaptracking && showmaptable.weather == null"
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
                <td style="white-space: nowrap; padding: 1em">
                  <v-chip
                    style="width: 60px"
                    v-if="row.item.isActive"
                    class="ma-2"
                    color="green"
                    text-color="white"
                    small
                  >
                    &nbsp;&nbsp;&nbsp;UP
                  </v-chip>

                  <v-chip
                    style="width: 60px"
                    v-if="!row.item.isActive"
                    class="ma-2"
                    color="red"
                    text-color="white"
                    small
                  >
                    DOWN
                  </v-chip>
                </td>
              </tr>
            </template>
          </v-data-table>
           <v-data-table
            :search="search"
            style="margin-top: 0px"
            v-if="showmaptracking && showmaptable.weather != null"
            :headers="headers"
            :items="tableTracking"
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
                        showwth(showmaptable.id, item.msg_id, 'sailink')
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
                  {{ item.heading }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.speed }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.distance }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.rx_snr }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.modcod }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.tx }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.satnet }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  {{ item.dateTime }}
                </td>
                <td style="white-space: nowrap; padding: 1em">
                  <v-chip
                    style="width: 60px"
                    v-if="item.isActive"
                    class="ma-2"
                    color="green"
                    text-color="white"
                    small
                  >
                    &nbsp;&nbsp;&nbsp;UP
                  </v-chip>

                  <v-chip
                    style="width: 60px"
                    v-if="!item.isActive"
                    class="ma-2"
                    color="red"
                    text-color="white"
                    small
                  >
                    DOWN
                  </v-chip>
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
              v-if="showmaptable"
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
            @click="(imageOpen = true), (imageData = showmaptable.images)"
            v-for="image in showmaptable.images"
            :key="image"
          >
            <v-img :src="image[0]" style="width: 650px; height: 450px"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-dialog>
      <!--Modal Notif End-->
    </div>
  </div>
</template>

<script>
import GMapShow from "@/components/maps/GMapShow.vue";
import GMapMarkerShowMap from "@/components/maps/GMapMarkerShowMap.vue";
import GoogleMapLine from "./GoogleMapLine";
import GoogleMapCircle from "./GoogleMapCircle.vue";
import { mapSettingsShow } from "@/constants/mapSettings";
import mapstyle from "@/assets/json/mapstyle.json";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    GMapShow,
    GMapMarkerShowMap,
    GoogleMapLine,
    GoogleMapCircle,
  },

  data() {
    return {
      a: 0,
      mobileBreakpoint: 600,
      singleExpand: true,
      expanded: [],
      dessertHeaders: [
        { text: "", value: "data-table-expand" },
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],

      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      pageUser: 1,
      pageCountUser: 0,
      search: "",
      markers: [
        {
          id: "a",
          position: { lat: 3, lng: 101 },
        },
        {
          id: "b",
          position: { lat: 5, lng: 99 },
        },
        {
          id: "c",
          position: { lat: 6, lng: 97 },
        },
      ],
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

      path: [
        { lat: -1.67292, lng: 100.63035 },
        { lat: -4.01517, lng: 102.28569 },
      ],

      loadernavplus: require("@/assets/img/load100new.gif"),
      headersData: [
        {
          text: "No",
          align: "start",
          sortable: false,
        },
        { text: "Latitude, Longtitude (DMS)", value: "lat", sortable: false },
        { text: "Heading (Degree)", value: "heading", sortable: false },
        { text: "Speed (Knots)", value: "speed", sortable: false },
        { text: "Distance(Nmi)", value: "distance", sortable: false },
        { text: "RX SNR (db)", value: "rx_snr", sortable: false },
        { text: "RX MODCOD", value: "modcod", sortable: false },
        { text: "TX Power(db)", value: "tx", sortable: false },
        { text: "SatNet", value: "satnet", sortable: false },
        { text: "Date/Time (GMT+7)", value: "dateTime", sortable: false },
        { text: "Link Status", value: "good", sortable: false },
      ],
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
        },
        {
          text: "No",
          align: "start",
          sortable: false,
        },
        { text: "Latitude, Longtitude (DMS)", value: "lat", sortable: false },
        { text: "Heading (Degree)", value: "heading", sortable: false },
        { text: "Speed (Knots)", value: "speed", sortable: false },
        { text: "Distance(Nmi)", value: "distance", sortable: false },
        { text: "RX SNR (db)", value: "rx_snr", sortable: false },
        { text: "RX MODCOD", value: "modcod", sortable: false },
        { text: "TX Power(db)", value: "tx", sortable: false },
        { text: "SatNet", value: "satnet", sortable: false },
        { text: "Date/Time (GMT+7)", value: "dateTime", sortable: false },
        { text: "Link Status", value: "good", sortable: false },
      ],

      headersUser: [
        {
          text: "#",
          align: "start",
          sortable: false,
        },
        { text: "Name", value: "name", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Role", value: "role_name", sortable: false },
        { text: "Last Login", value: "lastLogin", sortable: false },
      ],

      options: {
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: mapstyle,
      },
      model: 0,
      imageOpen: null,
      imageData: null,
      msg_id_after: null,
    };
  },

  methods: {
    ...mapActions(["showondate", "lnStatus","showweather","removeShowMap"]),

    async showdate(item, range) {
      const data = {
        id: item,
        range: range,
        token: localStorage.getItem("token"),
      };

      this.showondate(data);
    },

    linkStatus(id) {
      const dataLn = {
        id: id,
        token: localStorage.getItem("token"),
      };

      this.lnStatus(dataLn);
    },

    async showwth(vid, msgid, type) {
      this.msg_id_after = msgid;
      const data = {
        id: vid,
        msg_id: msgid,
        type: type,
      };
     this.showweather(data);
    },
  },

  async created() {
    const el = this.$el.querySelector("#mapa");
    el.scrollIntoView();
    console.log(this.showmaptable.dataTable);
  },

  computed: {
    ...mapGetters([
      "showmaptable",
      "tableTracking",
      "vesselUsers",
      "ip_adr",
      "showmaptracking",
      "ln_status",
      "weather_data",
      "showmapclick"
    ]),
    mapConfig() {
      return {
        ...mapSettingsShow,
        center: this.mapCenter,
      };
    },

    mapCenter() {
      return {
        lat: parseFloat(this.showmaptable.maptop.lat),
        lng: parseFloat(this.showmaptable.maptop.lon),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/showmapsailink.css";
</style>
