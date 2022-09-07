<template>
  <v-app class="container_tabledata">
    <div v-if="!thurayaData">
      <TableSkeleton />
    </div>
    <v-card>
      <v-toolbar
        v-if="thurayaData"
        elevation="3"
        style="max-height: 70px"
        color="#B8CCE2"
        fixed
      >
        <v-card-text class="showtext">Show</v-card-text>
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
        <v-card-text class="entriestext">Entries</v-card-text>
        <v-spacer></v-spacer>
        <v-card-text class="searchbar">
          <v-text-field
            dense
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            solo
            hide-details
            @click="removeThuraya()"
          ></v-text-field>
        </v-card-text>
      </v-toolbar>

      <v-data-table
        style="margin-top: 0px"
        v-if="thurayaData"
        :search="showMapData()"
        :headers="headers"
        :items="thurayaData"
        :items-per-page="itemsPerPage"
        hide-default-footer
        :page.sync="page"
        @page-count="pageCount = $event"
        class="elevation-1 margintab"
      >
        <template v-slot:item="row">
          <tr>
            <td style="white-space: nowrap; padding: 1em">
              {{ row.item.id }}
            </td>
            <td style="white-space: nowrap; padding: 1em">
              <v-btn
                class="ma-1"
                fab
                dark
                x-small
                color="primary"
                @click="(nameopen = true), sendDataName(row.item)"
              >
                <v-icon dark>mdi-cog-outline</v-icon>
              </v-btn>
            </td>
            <td style="white-space: nowrap; padding: 1em">
              {{ row.item.name }}
            </td>
            <td style="white-space: nowrap; padding: 1em">
              {{ row.item.pt_name }}
            </td>
            <td style="white-space: nowrap; padding: 1em">
              {{ row.item.pt_group }}
            </td>
            <td style="white-space: nowrap; padding: 1em">
              <div class="text-center">
                <v-btn
                  @click="(msgopen = true), openDataMessage(row.item)"
                  class="mx-1"
                  fab
                  dark
                  x-small
                  color="#38C172"
                >
                  <v-icon dark> mdi-message-text-outline </v-icon>
                </v-btn>
                <v-btn
                  style="cursor: not-allowed"
                  class="mx-1"
                  fab
                  dark
                  x-small
                  color="#38C172"
                >
                  <v-icon dark> mdi-phone-outline </v-icon>
                </v-btn>
                +{{ row.item.thuraya_number }}
              </div>
            </td>
            <td style="white-space: nowrap; padding: 1em">
              <div class="text-center">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#3089BB"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      small
                      class="ma-1"
                    >
                      <v-icon x-small>mdi-tune-variant</v-icon>
                      &nbsp; config &nbsp;
                      <v-icon small>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-btn
                        block
                        plain
                        small
                        @click="sendDataWhiteList(row.item)"
                        >Whitelist</v-btn
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        block
                        plain
                        small
                        @click="(vdOpen = true), sendDataVesselDetail(row.item)"
                        >Vessel Detail</v-btn
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        block
                        plain
                        small
                        @click="(mnOpen = true), sendDataManifest(row.item)"
                        >Manifest Listing</v-btn
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        block
                        plain
                        small
                        @click="(admOpen = true), sendDataAdm(row.item)"
                        >Admin Password</v-btn
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#239579"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      small
                      class="ma-1"
                    >
                      <v-icon x-small>mdi-alert-circle-outline</v-icon>
                      &nbsp;
                      <div class="text--caption">sos</div>
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
                        @click="(conOpen = true), sendDataConfig(row.item)"
                        >Config</v-btn
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        style="cursor: not-allowed"
                        block
                        plain
                        small
                        @click="
                          (mrtgopen = true), sendDataMrtg('unmetered', row.item)
                        "
                        >History</v-btn
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-menu v-if="row.item.tracking == false" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="#90D6C5"
                      dark
                      small
                      style="cursor: not-allowed"
                      class="ma-1"
                    >
                      <v-icon x-small>mdi-radar</v-icon>
                      &nbsp;
                      <div class="text--caption">Tracking</div>
                      &nbsp;
                      <v-icon small>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                </v-menu>

                <v-menu v-if="row.item.tracking == true" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#25B08F"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      small
                      class="ma-1"
                    >
                      <v-icon x-small>mdi-radar</v-icon>
                      &nbsp;
                      <div class="text--caption">Tracking</div>
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
                        @click="(trackOpen = true), sendDataInterval(row.item.id)"
                        >Interval</v-btn
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        style="cursor: not-allowed"
                        block
                        plain
                        small
                        @click="
                          (mrtgopen = true), sendDataMrtg('unmetered', row.item)
                        "
                        >GPS Email</v-btn
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn
                  dark
                  color="#2EA1B0"
                  role="button"
                  @click="
                    (cdrOpen = true), showCDR('This Month', 'month', row.item)
                  "
                  data-toggle="modal"
                  data-target="#cdrModal"
                  small
                  class="ma-1"
                >
                  <v-icon x-small>mdi-phone-outline</v-icon>&nbsp;CDR
                </v-btn>
                <v-btn
                  v-if="row.item.tracking == true"
                  color="primary"
                  role="button"
                  class="ma-1"
                  @click="showMap(row.item.id)"
                  small
                >
                  <v-icon x-small>mdi-map-marker-radius-outline</v-icon
                  >&nbsp;Show On Map
                </v-btn>
                <v-btn
                  v-if="row.item.tracking == false"
                  role="button"
                  color="#92B7DB"
                  dark
                  small
                  class="ma-1"
                  style="cursor: not-allowed"
                >
                  <v-icon x-small>mdi-map-marker-radius-outline</v-icon
                  >&nbsp;Show On Map
                </v-btn>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div
        class="pt-2"
        style="background-color: #b8cce2; padding: 20px; height: 4rem"
      >
        <v-pagination
          v-if="thurayaData"
          v-model="page"
          :length="pageCount"
          :total-visible="7"
        ></v-pagination>
      </div>
      <v-progress-linear
        v-if="!showmapthuraya && showthurayaclick"
        indeterminate
        color="#1976D2"
        height="4"
      ></v-progress-linear>
    </v-card>

    <ShowonMapThuraya />

    <!--Modal Whitelist-->
    <v-dialog v-model="wlOpen" width="700px">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row><v-toolbar-title>White List Config</v-toolbar-title></v-row>
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="(wlOpen = false), delwlData()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-toolbar-title v-if="!wlData">
            <div class="loader-line"></div>
          </v-toolbar-title>
          <v-toolbar-subtitle v-if="wlData">{{
            wlData.vessel_number
          }}</v-toolbar-subtitle>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-container v-if="!wlData" fill-height fluid>
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

        <v-card-text v-if="wlData">
          <v-alert
            v-if="wlData.latest_status == 'ON AIR'"
            icon="mdi-clock"
            prominent
            text
            type="warning"
            dense
            style="font-size: 14px"
          >
            Waiting for Confirmation, sent at {{ wlData.last_updated }}
          </v-alert>
          <v-alert
            v-if="wlData.latest_status == 'CONFIRMED'"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            style="font-size: 14px"
          >
            Updated at {{ wlData.last_updated }}
          </v-alert>
          <v-alert
            v-if="wlData.latest_status == 'FAILED'"
            icon="mdi-alert-circle"
            prominent
            text
            type="error"
            dense
            style="font-size: 14px"
          >
            Failed to change Settings at {{ wlData.last_updated }}, please
            resubmit
          </v-alert>
        </v-card-text>

        <v-card-text
          v-if="wlData && wlData.latest_status != 'ON AIR'"
          style="margin-top: 25px"
        >
          <v-row no-gutters style="flex-wrap: nowrap">
            <v-col
              cols="1"
              style="min-width: 9rem; max-width: 40%; margin: 5px"
            >
              <v-row v-for="(item, i) in wlData.latest_names" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    :placeholder="'RecePient ' + (a = i + 1)"
                    solo
                    outlined
                    disabled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row v-for="(item, i) in wlData.latest_names" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    v-model="wlData.latest_names[i]"
                    :value="item"
                    :placeholder="'Name ' + (a = i + 1)"
                    solo
                    outlined
                    :disabled="
                      item == 'NOC 1' && i == 0
                        ? true
                        : false || (item == 'NOC 2' && i == 1)
                        ? true
                        : false || (item == 'NOC 3' && i == 2)
                        ? true
                        : false || (item == 'NOC 4' && i == 3)
                        ? true
                        : false
                    "
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row v-for="(item, i) in wlData.latest_content" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    v-model="wlData.latest_content[i]"
                    :value="item"
                    :placeholder="'Number ' + (a = i + 1)"
                    solo
                    outlined
                    :disabled="
                      wlData.latest_names[i] == 'NOC 1' && i == 0
                        ? true
                        : false || (wlData.latest_names[i] == 'NOC 2' && i == 1)
                        ? true
                        : false || (wlData.latest_names[i] == 'NOC 3' && i == 2)
                        ? true
                        : false || (wlData.latest_names[i] == 'NOC 4' && i == 3)
                        ? true
                        : false
                    "
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-btn @click="wlDataPost()" color="primary" block>
            Update White List Configuration
          </v-btn>
        </v-card-text>
        <v-card-text
          v-if="wlData && wlData.latest_status == 'ON AIR'"
          style="margin-top: 25px"
        >
          <v-row no-gutters style="flex-wrap: nowrap">
            <v-col
              cols="1"
              style="min-width: 9rem; max-width: 40%; margin: 5px"
            >
              <v-row v-for="(item, i) in wlData.latest_names" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    :placeholder="'RecePient ' + (a = i + 1)"
                    solo
                    outlined
                    disabled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row v-for="(item, i) in wlData.latest_names" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    v-model="wlData.latest_names[i]"
                    :value="item"
                    :placeholder="'Name ' + (a = i + 1)"
                    solo
                    disabled
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row v-for="(item, i) in wlData.latest_content" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    v-model="wlData.latest_content[i]"
                    :value="item"
                    :placeholder="'Number ' + (a = i + 1)"
                    solo
                    disabled
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-btn color="#92B7DB" dark block>
            Update White List Configuration
          </v-btn>
        </v-card-text>

        <v-card-actions> </v-card-actions>
        <v-card-actions class="justify-end"> </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Modal Whitelist End-->

    <!--Modal Vessel Detail-->
    <v-dialog v-model="vdOpen" width="700px">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row
              ><v-toolbar-title>Vessel Detail Config</v-toolbar-title></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="(vdOpen = false), delvdData()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-toolbar-title v-if="!vdData">
            <div class="loader-line"></div>
          </v-toolbar-title>
          <v-toolbar-subtitle v-if="vdData">{{
            vdData.vessel_number
          }}</v-toolbar-subtitle>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-container v-if="!vdData" fill-height fluid>
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
        <v-card-text v-if="vdData">
          <v-alert
            v-if="vdData.status == true"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            style="font-size: 14px"
          >
            Updated at {{ vdData.last_updated }}
          </v-alert>
        </v-card-text>
        <v-card-text v-if="vdData">
          <v-row>
            <v-col cols="4">
              <v-subheader>IMO</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                style="margin-left: -20px"
                :value="vdData.detail.imo"
                v-model="vdData.detail.imo"
                solo
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-top: -30px">
            <v-col cols="4">
              <v-subheader>MMSI</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                style="margin-left: -20px"
                :value="vdData.detail.mmsi"
                v-model="vdData.detail.mmsi"
                solo
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-top: -30px">
            <v-col cols="4">
              <v-subheader>Callsign</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                style="margin-left: -20px"
                :value="vdData.detail.callsign"
                v-model="vdData.detail.callsign"
                solo
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-top: -30px">
            <v-col cols="4">
              <v-subheader>Vessel Type</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                style="margin-left: -20px"
                :value="vdData.detail.type"
                v-model="vdData.detail.type"
                solo
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-top: -30px">
            <v-col cols="4">
              <v-subheader>Gross Tonnage</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                style="margin-left: -20px"
                :value="vdData.detail.gross_tonnage"
                v-model="vdData.detail.gross_tonnage"
                solo
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-top: -30px">
            <v-col cols="4">
              <v-subheader>Flag State</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                style="margin-left: -20px"
                :value="vdData.detail.flag_state"
                v-model="vdData.detail.flag_state"
                solo
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-top: -30px">
            <v-col cols="4">
              <v-subheader>Vessel Owner Company</v-subheader>
            </v-col>
            <v-col cols="8" style="margin-left: -20px">
              <v-text-field
                :value="vdData.detail.owner"
                v-model="vdData.detail.owner"
                solo
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-top: -30px">
            <v-col cols="4">
              <v-subheader>First CSO</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                style="margin-left: -20px"
                :value="vdData.detail.cso_first"
                v-model="vdData.detail.cso_first"
                solo
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin-top: -30px">
            <v-col cols="4">
              <v-subheader>Second CSO</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                style="margin-left: -20px"
                :value="vdData.detail.cso_second"
                v-model="vdData.detail.cso_second"
                solo
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-alert
            style="font-size: 14px"
            v-if="alertvd_"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            >Vessel Detail Has Successfully Updated</v-alert
          >
          <v-btn color="primary" block @click="vdDataPush()">
            Update Vessel Detail
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--Modal Vessel Detail End-->

    <!--Modal Manifest Listing-->
    <v-dialog v-model="mnOpen" width="700px">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row
              ><v-toolbar-title>Manifest Listing Config</v-toolbar-title></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="(mnOpen = false), delmnData()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-toolbar-title v-if="!mnData">
            <div class="loader-line"></div>
          </v-toolbar-title>
          <v-toolbar-subtitle v-if="mnData">{{
            mnData.vessel_number
          }}</v-toolbar-subtitle>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-container v-if="!mnData" fill-height fluid>
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
        <v-card-text v-if="mnData">
          <v-alert
            v-if="mnData.latest_status == 'ON AIR'"
            icon="mdi-clock"
            prominent
            text
            type="warning"
            dense
            style="font-size: 14px"
          >
            Waiting for Confirmation, sent at {{ mnData.last_updated }}
          </v-alert>
          <v-alert
            v-if="mnData.latest_status == 'CONFIRMED'"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            style="font-size: 14px"
          >
            Updated at {{ mnData.last_updated }}
          </v-alert>
          <v-alert
            v-if="mnData.latest_status == 'FAILED'"
            icon="mdi-alert-circle"
            prominent
            text
            type="error"
            dense
            style="font-size: 14px"
          >
            Failed to change Settings at {{ mnData.last_updated }}, please
            resubmit
          </v-alert>
        </v-card-text>
        <v-card-text
          v-if="
            mnData && mnData.latest_content && mnData.latest_status != 'ON AIR'
          "
          style="margin-top: 25px"
        >
          <v-row no-gutters style="flex-wrap: nowrap">
            <v-col
              cols="1"
              style="min-width: 9rem; max-width: 40%; margin: 5px"
            >
              <v-row v-for="(item, i) in mnData.latest_content" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    :placeholder="'Type ' + (i = i + 1)"
                    solo
                    outlined
                    disabled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row v-for="(item, i) in mnData.latest_content" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    v-model="mnData.latest_content[i]"
                    :value="item"
                    :placeholder="'Name ' + (i = i + 1)"
                    solo
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-alert
            style="font-size: 14px"
            v-if="alertmn_"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            >Manifest Listing Configuration Updated</v-alert
          >
          <v-btn
            style="margin-top: -15px"
            @click="mnDataPush()"
            color="primary"
            block
          >
            Update Vessel Listing Configuration
          </v-btn>
        </v-card-text>
        <v-card-text
          v-if="
            mnData && mnData.latest_content && mnData.latest_status == 'ON AIR'
          "
          style="margin-top: 25px"
        >
          <v-row no-gutters style="flex-wrap: nowrap">
            <v-col
              cols="1"
              style="min-width: 9rem; max-width: 40%; margin: 5px"
            >
              <v-row v-for="(item, i) in mnData.latest_content" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    :placeholder="'Type ' + (i = i + 1)"
                    solo
                    outlined
                    disabled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row v-for="(item, i) in mnData.latest_content" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    v-model="mnData.latest_content[i]"
                    :value="item"
                    :placeholder="'Name ' + (i = i + 1)"
                    solo
                    outlined
                    disabled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-alert
            style="font-size: 14px"
            v-if="alertmn_"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            >Manifest Listing Configuration Updated</v-alert
          >
          <v-btn style="margin-top: -15px" color="#92B7DB" dark block>
            Update Vessel Listing Configuration
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--Modal Manifest Listing-->

    <!--Modal Admin Password-->
    <v-dialog v-model="admOpen" width="700px">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row
              ><v-toolbar-title
                >Thuraya Administrator Password</v-toolbar-title
              ></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="(admOpen = false), deladmData()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-toolbar-title v-if="!admData">
            <div class="loader-line"></div>
          </v-toolbar-title>
          <v-toolbar-subtitle v-if="admData">{{
            admData.vessel_number
          }}</v-toolbar-subtitle>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-container v-if="!admData" fill-height fluid>
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
        <v-card-text v-if="admData">
          <v-alert
            v-if="admData.latest_status == 'ON AIR'"
            icon="mdi-clock"
            prominent
            text
            type="warning"
            dense
            style="font-size: 14px"
          >
            Waiting for Confirmation, sent at {{ admData.last_updated }}
          </v-alert>
          <v-alert
            v-if="admData.latest_status == 'CONFIRMED'"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            style="font-size: 14px"
          >
            Updated at {{ admData.last_updated }}
          </v-alert>
          <v-alert
            v-if="admData.latest_status == 'FAILED'"
            icon="mdi-alert-circle"
            prominent
            text
            type="error"
            dense
            style="font-size: 14px"
          >
            Failed to change Settings at {{ admData.last_updated }}, please
            resubmit
          </v-alert>
        </v-card-text>
        <v-card-text v-if="admData">
          <v-card-text>
            <v-radio-group v-model="admData.deffPass">
              <v-radio label="Default Password" :value="true"></v-radio>
              <v-radio label="Random Password" :value="false"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-alert
            v-if="alertps_"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            style="font-size: 14px"
          >
            Admin Password Updated
          </v-alert>
          <v-btn @click="admDataPostfunc()" color="primary" block>
            Update Admin Password
          </v-btn>
        </v-card-text>

        <v-card-actions> </v-card-actions>
        <v-card-actions class="justify-end"> </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Modal Admin Password-->

    <!--Modal SOS-->
    <v-dialog v-model="conOpen" width="650px">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row><v-toolbar-title>SOS Contact List</v-toolbar-title></v-row>
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="(conOpen = false), delsosData()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-toolbar-title v-if="!sosData">
            <div class="loader-line"></div>
          </v-toolbar-title>
          <v-toolbar-subtitle v-if="sosData">{{
            sosData.vessel_number
          }}</v-toolbar-subtitle>

          <v-spacer></v-spacer>
          <v-switch
            v-if="sosData"
            v-model="sosData.sosTestEnabled"
            hide-details
            inset
            :label="
              sosData.sosTestEnabled == null
                ? `SOS Test [Disabled]`
                : `SOS Test [Enabled]`
            "
          ></v-switch>
        </v-toolbar>
        <v-container v-if="!sosData" fill-height fluid>
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

        <v-card-text v-if="sosData" style="margin-top: 55px">
          <v-row no-gutters style="flex-wrap: nowrap">
            <v-col
              cols="1"
              style="min-width: 9rem; max-width: 40%; margin: 5px"
            >
              <v-row>
                <v-col style="margin-top: -35px">
                  <v-text-field
                    placeholder="'Phone 1'"
                    solo
                    outlined
                    persistent-hint
                    disabled
                    dense
                    hint="E.g. +6281317772131"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row>
                <v-col style="margin-top: -35px">
                  <v-text-field
                    value="SKYREACH"
                    :placeholder="'Contact Name ' + (a = i + 2)"
                    solo
                    outlined
                    disabled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row>
                <v-col style="margin-top: -35px">
                  <v-text-field
                    value="1005"
                    :placeholder="'Phone Number ' + (a = i + 2)"
                    solo
                    outlined
                    disabled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters style="flex-wrap: nowrap; margin-top: 30px">
            <v-col
              cols="1"
              style="min-width: 9rem; max-width: 40%; margin: 5px"
            >
              <v-row v-for="(item, i) in sosData.latest_phone" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    :placeholder="'Phone ' + (a = i + 2)"
                    solo
                    outlined
                    disabled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row v-for="(item, i) in sosData.latest_name" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    v-model="sosData.latest_name[i]"
                    :value="item"
                    :placeholder="'Contact Name ' + (a = i + 2)"
                    solo
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row v-for="(item, i) in sosData.latest_phone" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    v-model="sosData.latest_phone[i]"
                    :value="item"
                    :placeholder="'Phone Number ' + (a = i + 2)"
                    solo
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row no-gutters style="flex-wrap: nowrap; margin-top: 30px">
            <v-col
              cols="1"
              style="min-width: 9rem; max-width: 40%; margin: 5px"
            >
              <v-row v-for="(item, i) in sosData.latest_mail" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    :placeholder="'E-mail ' + (a = i + 1)"
                    solo
                    outlined
                    disabled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-row v-for="(item, i) in sosData.latest_mail" :key="i">
                <v-col style="margin-top: -35px">
                  <v-text-field
                    v-model="sosData.latest_mail[i]"
                    :value="item"
                    :placeholder="'Enter Email Address ' + (a = i + 1)"
                    solo
                    outlined
                    persistent-hint
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-alert
            style="font-size: 14px"
            v-if="alertsos_"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            >SOS Contact Configuration Updated</v-alert
          >
          <v-btn @click="sosDataPush()" color="primary" block>
            Update SOS Contact Configuration
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--Modal Whitelist End-->

    <!--Modal CDR-->
    <v-dialog v-model="cdrOpen" width="80%">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row
              ><v-toolbar-title
                ><v-icon>mdi-phone-outline</v-icon>&nbsp;&nbsp;Call
                Details</v-toolbar-title
              ></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="(cdrOpen = false), delcdrData()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-toolbar-title v-if="!cdrData">
            <div class="loader-line"></div>
          </v-toolbar-title>
          <v-toolbar-subtitle v-if="cdrData">{{
            cdrData.vessel_number
          }}</v-toolbar-subtitle>
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" small>
                <i class="bx bx-time"></i>
                &nbsp; &nbsp;
                <v-text v-if="labeldur">{{ labeldur }}</v-text>
                <v-card-text v-if="!labeldur">
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
                  @click="showCDR('Today', 'today', cdrid), delcdrData()"
                  >Today</v-btn
                >
              </v-list-item>
              <v-list-item>
                <v-btn
                  block
                  plain
                  small
                  @click="showCDR('This Week', 'week', cdrid), delcdrData()"
                  >This Week</v-btn
                >
              </v-list-item>
              <v-list-item>
                <v-btn
                  block
                  plain
                  small
                  @click="showCDR('This Month', 'month', cdrid), delcdrData()"
                  >This Month</v-btn
                >
              </v-list-item>
              <v-list-item>
                <v-btn
                  block
                  plain
                  small
                  @click="showCDR('Last Month', 'lmonth', cdrid), delcdrData()"
                  >Last Month</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-form>
          <v-container v-if="!cdrData" fill-height fluid>
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
          <v-card-text v-if="cdrData">
            <v-row>
              <v-col>
                <v-card>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <td>Type Terminal</td>
                            <td>: Thuraya Marine Star</td>
                          </tr>
                          <tr>
                            <td>Thuraya Terminal</td>
                            <td>: {{ cdrData.number }}</td>
                          </tr>
                          <tr>
                            <td>Service Plan</td>
                            <td>: {{ cdrData.paket }}</td>
                          </tr>
                          <tr>
                            <td>Sim Number</td>
                            <td>: {{ cdrData.sim_no }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <td>Allowance</td>
                            <td>: Thuraya Marine Star</td>
                          </tr>
                          <tr>
                            <td>Used Balance</td>
                            <td>
                              <p style="margin-top: 20px">:</p>
                              <v-col
                                style="margin-top: -50px; margin-bottom: 5px"
                                >0.15 unit (1%)<v-progress-linear
                                  value="15"
                                ></v-progress-linear
                              ></v-col>
                            </td>
                          </tr>
                          <tr>
                            <td>Remaining Balance</td>
                            <td>: {{ cdrData.paket }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <br />
            <br />

            <CdrChart v-if="cdrData.chart" v-bind:cdrChart="cdrData.chart" />
            <p v-if="!cdrData.chart">Data Not Available</p>

            <br />
            <br />
            <br />
            <v-data-table
              v-if="cdrData"
              :headers="headerscdr"
              :items="cdrData.output"
              :items-per-page="5"
              class="elevation-1 margintab"
            >
              <template v-slot:item="row">
                <tr>
                  <!-- <td>{{row.index}}</td> -->
                  <td>{{ row.item.Services }}</td>
                  <td>{{ row.item.MSISDN }}</td>
                  <td>{{ row.item.Type }}</td>
                  <td>{{ row.item.Plcode }}</td>
                  <td>{{ row.item.Network }}</td>
                  <td>{{ row.item.Start_Date }}</td>
                  <td>{{ row.item.Called_Party }}</td>
                  <td>{{ row.item.Duration }}</td>
                  <td>{{ row.item.Band }}</td>
                  <td>{{ row.item.Amount }}</td>
                  <td>{{ row.item.dateTime_local }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-form>
        <v-card-actions> </v-card-actions>
        <v-card-actions class="justify-end"> </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Modal CDR End-->

    <!--Modal Tracking-->
    <v-dialog v-model="trackOpen" width="55rem">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row
              ><v-toolbar-title
                >Tracking Interval Config</v-toolbar-title
              ></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="(trackOpen = false), deltrackData()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-toolbar-title v-if="!trackData">
            <div class="loader-line"></div>
          </v-toolbar-title>
          <v-toolbar-subtitle v-if="trackData">{{
            trackData.vessel_number
          }}</v-toolbar-subtitle>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text v-if="trackData">
          <v-alert
            v-if="trackData.latest_status == 'ON AIR'"
            icon="mdi-clock"
            prominent
            text
            type="warning"
            dense
            style="font-size: 14px"
          >
            Waiting for Confirmation, sent at {{ trackData.last_updated }}
          </v-alert>
          <v-alert
            v-if="trackData.latest_status == 'CONFIRMED'"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            style="font-size: 14px"
          >
            Updated at {{ trackData.last_updated }}
          </v-alert>
          <v-alert
            v-if="trackData.latest_status == 'FAILED'"
            icon="mdi-alert-circle"
            prominent
            text
            type="error"
            dense
            style="font-size: 14px"
          >
            Failed to change Settings at {{ trackData.last_updated }}, please
            resubmit
          </v-alert>
        </v-card-text>

        <v-container v-if="!trackData" fill-height fluid>
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

        <v-card-text style="margin-top: -20px" v-if="trackData">
          <v-card elevation="0">
            <v-toolbar color="#B7CAE1" elevation="0">
              <v-toolbar-subtitle>Interval (minutes)</v-toolbar-subtitle>
              <v-spacer></v-spacer>
              <v-text-field
                style="width: 380px"
                hide-details
                dense
                v-if="trackData.latest_status != 'ON AIR'"
                single-line
                solo
                v-model="intervalData"
                type="number"
                min="3"
                max="14400"
                :value="intervalData"
                persistent-hint
                oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
              ></v-text-field>
              <v-text-field
                v-if="trackData.latest_status == 'ON AIR'"
                single-line
                hide-details
                solo
                disabled
                v-model="intervalData"
                type="number"
                min="3"
                max="14400"
                :value="intervalData"
                persistent-hint
                oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
              ></v-text-field>
            </v-toolbar>
            <v-card-subtitle style="text-align: left; margin-left: -17px"
              >Between 1 - 14400 Minutes</v-card-subtitle
            >
          </v-card>
          <v-card-actions>
            <v-btn
              v-if="trackData.latest_status != 'ON AIR'"
              @click="intervalModal()"
              style="margin-top: 0px"
              color="primary"
              class="intervalbtn_large"
              block
            >
              Update Tracking Interval Configuration
            </v-btn>
            <v-btn
              v-if="trackData.latest_status == 'ON AIR'"
              style="margin-top: 0px"
              color="#B6C1CC"
              block
              dark
              class="intervalbtn_large"
            >
              Update Tracking Interval Configuration
            </v-btn></v-card-actions
          >

        </v-card-text>
      </v-card>
    </v-dialog>
    <!--Modal Tracking-->

    <!--Modal Name-->
    <v-dialog v-model="nameopen" width="800px">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row
              ><v-toolbar-title
                ><i class="bx bx-cog"></i>&nbsp;&nbsp;Change Vessel
                Name</v-toolbar-title
              ></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn
            icon
            dark
            @click="(nameopen = false), delnamedata(), (alert_ = null)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-toolbar-title v-if="!nameData">
            <div class="loader-line"></div>
          </v-toolbar-title>
          <v-toolbar-subtitle v-if="nameData"
            >{{ nameData.name }} | {{ nameData.pt_name }}</v-toolbar-subtitle
          >

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form style="margin-top: -30px" v-if="nameData">
          <v-card-text>
            <v-card-text>
              <v-text-field
                :value="nameChangeData"
                v-model="nameChangeData"
                solo
                outlined
              ></v-text-field>
              <v-alert
                style="font-size: 14px"
                v-if="alert_"
                icon="mdi-check-circle"
                prominent
                text
                type="success"
                dense
                >Name of the Vessel Has Been Successfully Changed</v-alert
              >
              <v-btn
                @click="ChangeVesselName(nameData.id)"
                color="primary"
                block
              >
                Update vessel name info
              </v-btn>
            </v-card-text>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
    <!--Modal Name End-->

    <!--Modal Message-->
    <v-dialog v-model="msgopen" width="800px">
      <v-card>
        <v-toolbar color="#38C172" dark>
          <v-col class="header_modal">
            <v-row class="notifquota"
              ><v-toolbar-title
                ><v-icon>mdi-message-text-outline</v-icon>&nbsp;&nbsp;SMS
                Center</v-toolbar-title
              ></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="(msgopen = false), delmsg()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-toolbar-title v-if="!msgData">
            <div class="loader-line"></div>
          </v-toolbar-title>
          <v-toolbar-subtitle v-if="msgData">
            {{ msgData.name }} | {{ msgData.pt_name }} | +{{
              msgData.thuraya_number
            }}
          </v-toolbar-subtitle>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form v-if="msgData">
          <v-container>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    disabled
                    :value="msgNumber"
                    solo
                    outlined
                    label="To"
                    prefix="+"
                    v-model="msgNumber"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    disabled
                    :value="username"
                    solo
                    outlined
                    label="Nama Pengirim Pesan"
                    v-model="username"
                  ></v-text-field>
                </v-col>

                <v-col style="margin-top: -20px" cols="12">
                  <v-textarea
                    name="input-7-1"
                    solo
                    outlined
                    label="Pesan"
                    auto-grow
                    placeholder="Pesan + Nama Pengirim Maksimal 130 Karakter"
                    v-model="pesan"
                    counter="130"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
          </v-container>
        </v-form>
        <v-card-text style="margin-top: -26x">
          <v-alert
            v-if="alertmsg_"
            icon="mdi-check-circle"
            prominent
            text
            type="success"
            dense
            style="font-size: 14px"
          >
            Message Sent Successfully
          </v-alert>
        </v-card-text>
        <v-card-actions style="margin-top: -30px"
          ><v-btn color="#239579" block dark @click="sendDataMessage()">
            Send SMS
          </v-btn></v-card-actions
        >

        <v-card-actions class="justify-end"> </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Modal Message-->
  </v-app>
</template>

<script>
import CdrChart from "@/components/charts/CdrChart.vue";
import axios from "axios";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import ShowonMapThuraya from "@/components/ShowonMapThuraya.vue";
import { mapGetters, mapActions } from "vuex";
import * as easings from "vuetify/lib/services/goto/easing-patterns";
export default {
  props: ["user"],
  components: {
    TableSkeleton,
    ShowonMapThuraya,
    CdrChart,
  },
  data() {
    return {
      type: "number",
      number: 9999,
      selector: "#first",
      selections: ["#first", "#second", "#third"],
      selected: "Button",
      elements: ["Button", "Radio group"],
      duration: 300,
      offset: 0,
      easing: "easeInOutCubic",
      easings: Object.keys(easings),
      alert_: null,
      alertmsg_: null,
      nameChangeData: "",
      nameopen: false,
      nameData: null,
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "",
          align: "start",
          sortable: false,
          value: "Edit Vessel Name",
        },
        { text: "Vessel Name", value: "name", width: "9%", sortable: false },
        { text: "Company", value: "pt_name", width: "9%", sortable: false },
        { text: "Group", value: "pt_group", width: "1%", sortable: false },
        {
          text: "Thuraya Number",
          value: "thuraya_number",
          width: "19%",
          sortable: false,
        },
        { text: "", value: "config", width: "50%", sortable: false },
      ],
      headerscdr: [
        // {
        // text: '#',
        // align: 'start',
        // sortable: false,
        // value: 'id',
        // },
        { text: "Services", value: "name" },
        { text: "MSISDN", value: "pt_name" },
        { text: "Type", value: "pt_name" },
        { text: "Plcode", value: "pt_name" },
        { text: "Network", value: "pt_name" },
        { text: "Start Date", value: "pt_name" },
        { text: "Called Party", value: "pt_name" },
        { text: "Duration", value: "pt_name" },
        { text: "Band", value: "pt_name" },
        { text: "Amount", value: "pt_name" },
        { text: "DateTime Local", value: "pt_name" },
      ],
      admDataPost: null,
      alertwl_: null,
      alertps_: null,
      alertvd_: null,
      alertmn_: null,
      alertsos_: null,
      intervalData: null,
      RecePient: "Recepient",
      wlDataName: [],
      wlDataRecep: [],
      wlDataContent: [],
      loadingdata: false,
      username: null,
      msgopen: null,
      msgData: null,
      msgNumber: null,
      pesan: null,
      admOpen: null,
      admData: null,
      mnOpen: null,
      mnData: null,
      vdData: null,
      vdOpen: null,
      wlOpen: null,
      conOpen: null,
      cdrOpen: null,
      cdrData: null,
      trackOpen: null,
      trackData: null,
      search: "",
      sosData: null,
      searchname_thur: localStorage.getItem("searchname_thur"),
      searchid_thur: localStorage.getItem("searchid_thur"),
      loadernavplus: require("@/assets/img/load100new.gif"),
      labeldur: null,
      cdrid: null,
      manifestArray: [
        { 0: "" },
        { 1: "test" },
        { 2: "" },
        { 3: "" },
        { 4: "" },
        { 5: "" },
        { 6: "" },
        { 7: "" },
        { 8: "" },
        { 9: "" },
      ],
    };
  },

  async created() {
    this.fetchThuraya(localStorage.getItem("token"));
    if (this.searchIDThuraya) {
      this.showMap(this.searchIDThuraya);
    }
  },

  methods: {
    ...mapActions([
      "fetchThuraya",
      "showonMapThuraya",
      "showdateThuraya",
      "removeThuraya",
      "DataWhiteList",
      "wlPost"
    ]),

    async intervalModal() {
     
      const data = {
        thuraya_number: this.trackData.number,
        interval: this.intervalData,
      };
      const response = await axios.post(
        "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/interval",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.trackData=null
      this.trackData=response.data.data
    },

    async vdDataPush() {
      const data = {
        thuraya_number: this.vdData.number,
        imo: this.vdData.detail.imo,
        mmsi: this.vdData.detail.mmsi,
        callsign: this.vdData.detail.callsign,
        type: this.vdData.detail.type,
        gross_tonnage: this.vdData.detail.gross_tonnage,
        flag_state: this.vdData.detail.flag_state,
        owner: this.vdData.detail.owner,
        cso_first: this.vdData.detail.cso_first,
        cso_second: this.vdData.detail.cso_second,
      };
      const response = await axios.post(
        "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/vessel_detail",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response) {
        this.alertvd_ = true;
      }
    },

    async mnDataPush() {
      const data = {
        thuraya_number: this.mnData.number,
        types: this.mnData.latest_content,
      };
      const response = await axios.post(
        "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/listing",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response) {
        this.alertmn_ = true;
      }
    },

    async userfetch() {
      const response = await axios.get(
        "https://navigatorplus.sailink.id/api/login",
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data.user)
      this.username = response.data.user.name;
      // this.user = response.data;
    },

    async wlDataPost() {
      // const data = {
      //   thuraya_number: this.wlData.number,
      //   recipients: this.wlData.latest_content,
      //   names: this.wlData.latest_names,
      // };
      // const response = await axios.post(
      //   "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/whitelist",
      //   data,
      //   {
      //     headers: {
      //       Authorization: "Bearer" + localStorage.getItem("token"),
      //     },
      //   }
      // );
      // console.log(response);
      const data = {
        thuraya_number: this.wlData.number,
        recipients: this.wlData.latest_content,
        names: this.wlData.latest_names,
        token: localStorage.getItem("token")
      };
      this.wlPost(data)
    },

    async sosDataPush() {
      const data = {
        thuraya_number: this.sosData.number,
        names: this.sosData.latest_name,
        phones: this.sosData.latest_phone,
        emails: this.sosData.latest_mail,
      };
      const response = await axios.post(
        "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/sos",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response) {
        this.alertsos_ = true;
      }
    },

    async admDataPostfunc() {
      if (this.admData.deffPass == false) {
        const data = {
          thuraya_number: this.admData.number,
          passRadio: 1,
        };
        const response = await axios.post(
          "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/pass",
          data,
          {
            headers: {
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        if (response) {
          this.alertps_ = true;
        }
      }

      if (this.admData.deffPass == true) {
        const data = {
          thuraya_number: this.admData.number,
          passRadio: 0,
        };
        const response = await axios.post(
          "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/pass",
          data,
          {
            headers: {
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        if (response) {
          this.alertps_ = true;
        }
      }

    },

    async ChangeVesselName(id) {
      const data = {
        id: id,
        name: this.nameChangeData,
      };
      const response = await axios.post(
        "https://navigatorplus.sailink.id/api/v1/navplus/vessel/name",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response) {
        this.alert_ = true;
      }
      this.fetchData();
    },

    delnamedata() {
      this.nameData = null;
      this.nameopen = false;
    },
    async sendDataName(item) {
      this.nameData = item;
      this.nameChangeData = item.name;
    },

    nulsearch() {
      this.removeThuraya();
    },
    showMapData() {
      if (this.searchThuraya) {
        return this.searchThuraya;
      } else {
        return this.search;
      }
    },
    delwlData() {
      this.wlData = null;
      this.alertwl_ = null;
    },

    delmsg() {
      this.msgNumber = null;
      this.msgData = null;
    },

    delvdData() {
      this.vdData = null;
      this.alertvd_ = null;
    },

    delmnData() {
      this.mnData = null;
    },

    deladmData() {
      this.admData = null;
      this.alertps_ = null;
    },

    delcdrData() {
      this.cdrData = null;
      this.labeldur = null;
      this.cdrid = null;
    },
    delsosData() {
      this.sosData = null;
    },
    deltrackData() {
      this.trackData = null;
    },

    async showdate(item, range) {
      const data = {
        id: item,
        range: range,
        token: localStorage.getItem("token"),
      };
      this.showdateThuraya(data);
    },

    async showMap(item) {
      this.$vuetify.goTo(this.target, this.options);
      const data = {
        id: item,
        token: localStorage.getItem("token"),
      };
      this.showonMapThuraya(data);
      this.showdate(item, "today");
    },

    async showCDR(ldur, dur, item) {
      const data = {
        thuraya_number: item.thuraya_number,
        range: dur,
      };
      const response = await axios.post(
        "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/cdr",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.data);
      this.cdrData = response.data.data;
      this.labeldur = ldur;
      this.cdrid = item;
    },

    async sendDataVesselDetail(item) {
      const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/" +
          item.id +
          "/vessel_detail",
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.vdData = response.data.data;
    },

    async sendDataWhiteList(item) {
      this.wlOpen = true
      const data = {
          id: item.id,
          token: localStorage.getItem("token"),
        };
      this.DataWhiteList(data)
    },
    openDataMessage(item) {
      this.msgData = item;
      this.msgNumber = item.thuraya_number;
      console.log(this.msgData);
    },
    async sendDataMessage() {
      const data = {
        thuraya_number: this.msgNumber,
        pesan: this.pesan,
      };
      const response = await axios.post(
        "https://navigatorplus.sailink.id/api/v1/navplus/sms/send",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response) {
        this.alertmsg_ = true;
      }
    },

    async sendDataManifest(item) {
      const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/" +
          item.id +
          "/listing",
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.mnData = response.data.data;
    },

    async sendDataAdm(item) {
      const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/" +
          item.id +
          "/pass",
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.admData = response.data.data;
    },
    async sendDataConfig(item) {
      const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/" +
          item.id +
          "/sos",
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.sosData = response.data.data;
    },
    async sendDataInterval(item) {
      // this.trackData = null;
      // this.intervalData = null;
      const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/" +
          item +
          "/interval",
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      // this.trackData = response.data.data;
      // this.intervalData = response.data.data.latest_content;
      console.log(response.data.data)
      this.trackData = response.data.data;
      this.intervalData = response.data.data.latest_content;
    },
  },

  computed: {
    ...mapGetters([
      "thurayaData",
      "showmapthuraya",
      "showmaptracking",
      "thurayadataTable",
      "searchIDThuraya",
      "searchThuraya",
      "showthurayaclick",
      "wlData",
      "wlID",
    ]),
    target() {
      return 62000000;
    },
    options() {
      return {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic",
      };
    },
  },

  mounted() {
    this.$root.$on("rangeshowmapthuraya", (i, r) => {
      this.showondate(i, r);
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/data.scss";
</style>
