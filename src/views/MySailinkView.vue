<template>
  <v-app class="container_tabledata">
    <div v-if="!sailinkData">
      <TableSkeleton />
    </div>
    <v-card>
      <v-toolbar
        v-if="sailinkData"
        elevation="3"
        style="max-height: 70px"
        color="#B2C6DB"
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
            @click="nulsearch()"
          ></v-text-field>
        </v-card-text>
      </v-toolbar>
      <v-layout v-resize="onResize" column style="">
        <v-data-table
          style="margin-top: 0px"
          v-if="sailinkData"
          :search="showMapData()"
          :headers="headers"
          :items="sailinkData"
          hide-default-footer
          :page.sync="page"
          :items-per-page="itemsPerPage"
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:item="row">
            <tr>
              <td style="white-space: nowrap; margin-right: -100px">
                {{ row.item.index + 1 }}
              </td>
              <td style="white-space: nowrap; padding: 1em">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  x-small
                  color="primary"
                  @click="sendDataName(row.item)"
                >
                  <v-icon dark>mdi-cog-outline</v-icon>
                </v-btn>
                {{ row.item.name }}&nbsp;
                <v-chip v-if="row.item.status != 'ACTIVE'" dark x-small>{{
                  row.item.status
                }}</v-chip>
              </td>
              <td
                style="white-space: nowrap; padding: 1em"
                v-if="row.item.quota.quota"
              >
                <row>
                  <p style="font-size: 12px; margin-bottom: 0px">
                    {{ row.item.quota.quota }}/{{ row.item.quota.usage }}
                  </p>
                  <v-progress-linear
                    height="10"
                    :value="row.item.quota.percentage"
                    :color="row.item.quota.fill"
                  ></v-progress-linear
                ></row>
              </td>
              <td v-if="!row.item.quota.quota">-</td>
              <td style="white-space: nowrap; padding: 1em">
                {{ row.item.pt_name }}
              </td>
              <td>
                <div class="grouptxt" v-if="!row.item.pt_group">-</div>
                <div v-if="row.item.pt_group">{{ row.item.pt_group }}</div>
              </td>
              <td>{{ row.item.serial_number }}</td>
              <td style="white-space: nowrap; padding: 1em">
                <div class="text-center">
                  <v-menu
                    v-if="
                      row.item.mrtg_id &&
                      row.item.mrtg_id_2 &&
                      row.item.service == 'hybrid'
                    "
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        style="width: 100px"
                        color="#38C172"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        small
                        class="ma-1"
                      >
                        <v-icon x-small>mdi-chart-bar</v-icon>
                        &nbsp; MRTG &nbsp;
                        <v-icon small>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-btn
                          block
                          plain
                          small
                          @click="
                            (mrtgopen = true), sendDataMrtg('metered', row.item)
                          "
                          >Metered</v-btn
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-btn
                          block
                          plain
                          small
                          @click="
                            (mrtgopen = true),
                              sendDataMrtg('unmetered', row.item)
                          "
                          >Unmetered</v-btn
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>

                  <v-btn
                    style="width: 100px"
                    v-if="
                      row.item.mrtg_id &&
                      !row.item.mrtg_id_2 &&
                      row.item.service == 'hybrid'
                    "
                    color="#38C172"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    small
                    class="ma-1"
                    @click="(mrtgopen = true), sendDataMrtgSingle(row.item)"
                  >
                    <v-icon x-small>mdi-chart-bar</v-icon>
                    &nbsp; MRTG
                  </v-btn>

                  <v-btn
                    style="width: 100px; cursor: not-allowed"
                    v-if="
                      !row.item.mrtg_id &&
                      !row.item.mrtg_id_2 &&
                      !row.item.service
                    "
                    color="#9CE4BB"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    small
                    class="ma-1"
                  >
                    <v-icon x-small>mdi-chart-bar</v-icon>
                    &nbsp; MRTG
                  </v-btn>

                  <v-btn
                    style="width: 100px"
                    v-if="
                      !row.item.mrtg_id &&
                      row.item.mrtg_id_2 &&
                      row.item.service == 'hybrid'
                    "
                    color="#38C172"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    small
                    class="ma-1"
                    @click="(mrtgopen = true), sendDataMrtgSingle(row.item)"
                  >
                    <v-icon x-small>mdi-chart-bar</v-icon>
                    &nbsp; MRTG
                  </v-btn>

                  <v-btn
                    style="width: 100px"
                    v-if="row.item.mrtg_id && row.item.service == 'metered'"
                    color="#38C172"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    small
                    class="ma-1"
                    @click="(mrtgopen = true), sendDataMrtgSingle(row.item)"
                  >
                    <v-icon x-small>mdi-chart-bar</v-icon>
                    &nbsp; MRTG
                  </v-btn>

                  <v-btn
                    style="width: 100px"
                    v-if="row.item.mrtg_id && row.item.service == 'unmetered'"
                    color="#38C172"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    small
                    class="ma-1"
                    @click="(mrtgopen = true), sendDataMrtgSingle(row.item)"
                  >
                    <v-icon x-small>mdi-chart-bar</v-icon>
                    &nbsp; MRTG
                  </v-btn>

                  <v-btn
                    v-if="!row.item.mrtg_id && row.item.service == 'unmetered'"
                    color="#9CE8BC"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    small
                    class="ma-1"
                  >
                    <v-icon x-small>mdi-chart-bar</v-icon>
                    &nbsp; MRTG
                  </v-btn>

                  <v-btn
                    style="width: 100px"
                    v-if="!row.item.mrtg_id && row.item.service == 'metered'"
                    color="#9CE8BC"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    small
                    class="ma-1"
                  >
                    <v-icon x-small>mdi-chart-bar</v-icon>
                    &nbsp; MRTG
                  </v-btn>

                  <!--Ping-->

                  <v-btn
                    style="width: 80px"
                    v-if="!pingData[row.item.id] && pingClicked != row.item.id"
                    color="#239579"
                    dark
                    role="button"
                    class="pingbtn ma-1"
                    small
                    @click="pingClick(row.item), (pingClicked = row.item.id)"
                    ><v-icon x-small>mdi-bullhorn-outline</v-icon
                    >&nbsp;PING</v-btn
                  >

                  <v-btn
                    style="width: 80px"
                    v-if="!pingData[row.item.id] && pingClicked == row.item.id"
                    color="#239579"
                    dark
                    role="button"
                    class="pingbtn ma-1"
                    small
                    ><v-progress-linear
                      style="width: 60px"
                      color="#fff"
                      buffer-value="2"
                      stream
                    ></v-progress-linear
                  ></v-btn>

                  <v-btn
                    style="width: 80px"
                    v-if="pingData[row.item.id]"
                    color="#239579"
                    dark
                    role="button"
                    class="pingbtn ma-1"
                    small
                    >{{ pingData[row.item.id].ping }}</v-btn
                  >

                  <!--Notification-->
                  <v-btn
                    dark
                    @click="sendDataNotif(row.item)"
                    color="#2EA1B0"
                    role="button"
                    class="ma-1"
                    small
                    ><v-icon x-small>mdi-tune-vertical-variant</v-icon
                    >&nbsp;Notification</v-btn
                  >

                  <!--Show On Map-->
                  <v-btn
                    @click="showMap(row.item.id), (show = !show)"
                    color="primary"
                    class="ma-1"
                    small
                    ><v-icon x-small>mdi-map-marker-radius-outline</v-icon
                    >&nbsp;Show On Map</v-btn
                  >
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
            v-if="sailinkData"
            v-model="page"
            :length="pageCount"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-layout>

      <v-progress-linear
        v-if="!showmaptable && showmapclick"
        indeterminate
        color="#1976D2"
        height="4"
      ></v-progress-linear>
    </v-card>

    <ShowonMap />

    <!--Modal MRTG-->
    <v-dialog v-model="mrtgopen" max-width="50rem">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row
              ><v-toolbar-title
                ><v-icon>mdi-chart-bar</v-icon> &nbsp;&nbsp;MRTG
                Traffic</v-toolbar-title
              ></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="delmrtgdata()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-progress-linear
            v-if="!mrtgSailink"
            indeterminate
            color="#1976D2"
          ></v-progress-linear>

          <v-toolbar-subtitle v-if="mrtgSailink">{{
            mrtgSailink.vessel_pt
          }}</v-toolbar-subtitle>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-container v-if="!mrtgSailink" fill-height fluid>
          <v-row align="center" justify="center">
            <v-col
              ><img
                alt="Navplus logo"
                width="90px"
                :src="loadernavplus"
                class="justify-center"
            /></v-col>
          </v-row>
        </v-container>

        <div v-if="mrtgSailink">
          <v-card :key="i" class="mx-auto content_modal" max-width="48rem">
            <v-toolbar color="#1976D2" dark
              ><v-text>Hourly (1 Minute Average)</v-text></v-toolbar
            >
            <v-img
              v-if="mrtgSailink"
              class="imgmodal"
              v-bind:src="mrtgSailink.base64.data5"
            ></v-img>
          </v-card>

          <v-card :key="i" class="mx-auto content_modal" max-width="48rem">
            <v-toolbar color="#1976D2" dark
              ><v-text>Daily (5 Minute Average)</v-text></v-toolbar
            >
            <v-img
              v-if="mrtgSailink"
              class="imgmodal"
              v-bind:src="mrtgSailink.base64.data1"
            ></v-img>
          </v-card>

          <v-card :key="i" class="mx-auto content_modal" max-width="48rem">
            <v-toolbar color="#1976D2" dark
              ><v-text>Weekly (30 Minute Average)</v-text></v-toolbar
            >
            <v-img
              v-if="mrtgSailink"
              class="imgmodal"
              v-bind:src="mrtgSailink.base64.data2"
            ></v-img>
          </v-card>

          <v-card :key="i" class="mx-auto content_modal" max-width="48rem">
            <v-toolbar color="#1976D2" dark
              ><v-text>Monthly (2 Hour Average)</v-text></v-toolbar
            >
            <v-img
              v-if="mrtgSailink"
              class="imgmodal"
              v-bind:src="mrtgSailink.base64.data3"
            ></v-img>
          </v-card>

          <v-card :key="i" class="mx-auto content_modal" max-width="48rem">
            <v-toolbar color="#1976D2" dark
              ><v-text>Yearly (1 Day Average)</v-text></v-toolbar
            >
            <v-img
              v-if="mrtgSailink"
              class="imgmodal"
              v-bind:src="mrtgSailink.base64.data4"
            ></v-img>
          </v-card>
        </div>

        <v-card-actions class="justify-end"> </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Modal MRTG End-->

    <!--Modal Notif-->
    <v-dialog v-model="notifopen" width="800px">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row class="notifquota"
              ><v-toolbar-title
                ><v-icon>mdi-tune-vertical-variant</v-icon>&nbsp;&nbsp;Quota
                Notification Configuration</v-toolbar-title
              ></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="delnotifdata()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-progress-linear
            v-if="!notifData"
            indeterminate
            color="#1976D2"
          ></v-progress-linear>
          <v-toolbar-subtitle v-if="notifData">{{
            notifData.vessel_pt
          }}</v-toolbar-subtitle>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form>
          <v-container>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    value="50 75 100"
                    label="Limit Threshold"
                    hint="*dipisahkan menggunakan spasi E.g. 45 70 80 100"
                    solo
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-switch v-model="switch1" :label="`Enabled`"></v-switch>
                </v-col>

                <v-col style="margin-top: -20px" cols="12">
                  <v-textarea
                    name="input-7-1"
                    solo
                    outlined
                    auto-grow
                    placeholder="maritimeit@waruna-group.com"
                    hint="*dipisahkan menggunakan spasi
            E.g. noc@sailink.co.id skyreach@sailink.co.id"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
          </v-container>
        </v-form>
        <v-card-actions style="margin-top: -30px"
          ><v-btn color="primary" block>
            Update Quota Notification
          </v-btn></v-card-actions
        >

        <v-card-actions class="justify-end"> </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Modal Notif End-->

    <!--Modal Name-->
    <v-dialog v-model="nameopen" width="800px">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row
              ><v-toolbar-title
                ><v-icon>mdi-cog-outline</v-icon>&nbsp;&nbsp;Change Vessel
                Name</v-toolbar-title
              ></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="delnamedata()">
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
                label="Vessel Name"
                v-model="nameChangeData"
                solo
                outlined
              >
                <template v-slot:append>
                  <v-fade-transition leave-absolute>
                    <v-progress-circular
                      v-if="loading"
                      size="24"
                      color="info"
                      indeterminate
                    ></v-progress-circular>
                    <v-icon> mdi-pencil-outline </v-icon>
                  </v-fade-transition>
                </template>
              </v-text-field>
              <AlertBox
                v-if="message_name"
                :message="message_name"
                :color="color_name"
                :icon="icon_name"
              />
              <v-btn
                @click="changeVesselName(nameData.id, nameData.name)"
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
  </v-app>
</template>

<script>
import axios from "axios";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import ShowonMap from "@/components/ShowonMap.vue";
import { mapGetters, mapActions } from "vuex";
import AlertBox from "@/components/alert/AlertBox.vue";
import * as easings from "vuetify/lib/services/goto/easing-patterns";
export default {
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  components: {
    TableSkeleton,
    ShowonMap,
    AlertBox,
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
      loading: null,
      message_name: null,
      color_name: "#38C172",
      icon_name: "mdi-check-circle",
      alert_: null,
      nameChangeData: "",
      items: [5, 10, 15, "All"],
      pingData: [],
      itemsPerPage: 10,
      pingClicked: null,
      page: 1,
      pageCount: 0,
      ip_adr: null,
      ln_status: null,
      show: false,
      mrtgopen: false,
      notifopen: false,
      nameopen: false,
      nameData: null,
      notifData: null,
      selectedNotif: "",
      search: "",
      search_name: localStorage.getItem("search_name"),
      search_nav: localStorage.getItem("search_nav"),
      index: "",
      switch1: true,
      loadernavplus: require("@/assets/img/load100new.gif"),
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "No",
        },
        { text: "Vessel Name", value: "name", sortable: false },
        { text: "Quota", value: "Quota", sortable: false },
        { text: "Company", value: "pt_name", sortable: false },
        { text: "Group", value: "pt_group", sortable: false },
        { text: "S/N", value: "serial_number", sortable: false },
        { text: "", value: "good", sortable: false },
      ],
    };
  },

  created() {
    this.fetchMySailink(localStorage.getItem("token"));
    if (this.searchVesselID) {
      this.showMap(this.searchVesselID);
    }
  },

  methods: {
    ...mapActions([
      "removeSearch",
      "fetchMySailink",
      "updateVesselName",
      "fetchMRTG",
      "removeMRTG",
      "showonMap",
      "ipAdr",
      "lnStatus",
      "showondate",
      "addShowClick",
    ]),

    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      console.log(column);
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    nulsearch() {
      this.removeSearch();
    },
    showMapData() {
      if (this.searchVessel) {
        return this.searchVessel;
      } else {
        return this.search;
      }
    },
    delmrtgdata() {
      this.mrtgSai = null;
      this.mrtgopen = false;
      this.removeMRTG();
    },
    delnotifdata() {
      this.notifData = null;
      this.notifopen = false;
    },
    delnamedata() {
      this.nameData = null;
      this.nameopen = false;
      this.message_name = null;
    },
    async sendDataMrtg(rule, data) {
      if (rule == "metered") {
        const datamrtg = {
          id: data.id,
          mrtg: data.mrtg_id,
          token: localStorage.getItem("token"),
        };

        this.fetchMRTG(datamrtg);
      }

      if (rule == "unmetered") {
        const datamrtg = {
          id: data.id,
          mrtg: data.mrtg_id_2,
          token: localStorage.getItem("token"),
        };

        this.fetchMRTG(datamrtg);
      }
    },

    async sendDataMrtgSingle(data) {
      const datamrtg = {
        id: data.id,
        mrtg: data.mrtg_id,
        token: localStorage.getItem("token"),
      };

      this.fetchMRTG(datamrtg);
    },

    async sendDataNotif(item) {
      this.notifopen = true;
      const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/sailink/mrtg/" +
          item.id +
          "/" +
          item.mrtg_id,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      this.notifData = response.data.data;
    },

    async changeVesselName(id, name) {
      this.loading = true;
      const data = {
        id: id,
        name: this.nameChangeData,
        token: localStorage.getItem("token"),
      };
      this.updateVesselName(data);
      setTimeout(() => {
        this.loading = false;
        this.message_name =
          "Vessel name has change from " + name + " to " + this.nameChangeData;
      }, 2000);
    },

    async pingClick(item) {
      const data = {
        id: item.id,
      };
      const response = await axios.post(
        "https://navigatorplus.sailink.id/api/v1/navplus/sailink/fetchPing",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.$set(this.pingData, item.id, response.data.data);
      this.pingClicked = null;
      console.log(this.pingData);
    },

    async sendDataName(item) {
      this.nameopen = true;
      this.nameData = item;
      this.nameChangeData = item.name;
    },

    async showdate(item, range) {
      const data = {
        id: item,
        range: range,
        token: localStorage.getItem("token"),
      };

      this.showondate(data);
    },

    async showMap(item) {
      this.$vuetify.goTo(this.target, this.options);
      this.addShowClick();
      const data = {
        id: item,
        token: localStorage.getItem("token"),
      };
      this.showonMap(data);
      this.ipAdr(data);
      this.lnStatus(data.id);
      this.showdate(item, "today");
    },
  },

  mounted() {},

  computed: {
    ...mapGetters([
      "sailinkData",
      "mrtgSailink",
      "showmaptable",
      "searchVessel",
      "searchVesselID",
      "showmapclick",
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
};
</script>

<style lang="scss">
@import "@/assets/scss/data.scss";
</style>
