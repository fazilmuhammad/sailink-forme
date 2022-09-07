<template>
  <v-app>
    <div
      id="container_try"
      style="overflow-y: scroll"
      class="container_tabledata"
    >
      <div v-if="!crewwatchData">
        <TableSkeleton />
      </div>
      <v-card>
        <v-toolbar
          v-if="crewwatchData"
          elevation="4"
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
              @click="nulsearch()"
            ></v-text-field>
          </v-card-text>
        </v-toolbar>
        <v-layout v-resize="onResize" column style="">
          <v-data-table
            style="margin-top: 0px"
            v-if="crewwatchData"
            :search="showMapData()"
            :headers="headers"
            :items="crewwatchData"
            hide-default-footer
            :page.sync="page"
            :items-per-page="itemsPerPage"
            class="elevation-1"
            @page-count="pageCount = $event"
          >
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.id }}</td>
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.pt_name }}</td>
                <td>
                  <v-btn
                    @click="showCrews(row.item)"
                    block
                    color="#38C172"
                    dark
                    role="button"
                    class="pingbtn"
                    small
                    ><i class="bx bxs-user"></i>&nbsp;&nbsp;Show Crew</v-btn
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
          <div
            class="pt-2"
            style="background-color: #b8cce2; padding: 20px; height: 4rem"
          >
            <v-pagination
              v-model="page"
              :length="pageCount"
              :total-visible="7"
            ></v-pagination>
          </div>
        </v-layout>
      </v-card>
      <v-progress-linear
        v-if="!listcrew && showcrewclick"
        indeterminate
        color="#0B4281"
        height="7"
        striped
      ></v-progress-linear>
      <v-card>
        <v-toolbar v-if="listcrew" dense color="primary" dark>
          {{ listcrew.vessel_pt }}
        </v-toolbar>
        <section>
          <v-row v-if="listcrew" no-gutters style="flex-wrap: nowrap">
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%; margin: 5px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-card class="pa-2" outlined tile>
                <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th :colspan="2" class="text-left">
                            Seafarer (Officer)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          @click="showDetailCrews(item.id)"
                          v-for="item in listcrew.list_officer"
                          :key="item.name"
                          style="cursor: pointer"
                        >
                          <td style="padding: 10px">
                            <p
                              class="font-weight-bold caption"
                              style="margin-bottom: 0"
                            >
                              {{ item.rank }}
                            </p>
                            {{ item.name }}
                          </td>
                          <td style="padding: 10px">
                            <v-badge :color="item.status" dot inline></v-badge>
                          </td>
                        </tr>
                      </tbody>
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
                      <thead>
                        <tr>
                          <th :colspan="2" class="text-left">Crew</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in listcrew.list_crew" :key="item.name">
                          <td>{{ item.name }}</td>
                          <td>
                            <v-badge :color="item.status" dot inline></v-badge>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-card-text>
            <v-card v-if="detailcrew">
              <v-toolbar color="#00BCD4" dense dark>
                {{ detailcrew.name_crew }}
              </v-toolbar>
              <v-toolbar color="#B7CAE1" dense>
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
                        @click="
                          sendModalConv(convid, 'hourly', 'LAST HOUR', inout),
                            delmodalConv()
                        "
                        >Last Hour</v-btn
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        block
                        plain
                        small
                        @click="
                          sendModalConv(convid, '6hour', 'LAST 6 HOURS', inout),
                            delmodalConv()
                        "
                        >Last 6 Hour</v-btn
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        block
                        plain
                        small
                        @click="
                          sendModalConv(
                            convid,
                            'today',
                            'LAST 24 HOURS',
                            inout
                          ),
                            delmodalConv()
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
                          sendModalConv(convid, 'Daily', 'TODAY', inout),
                            delmodalConv()
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
                          sendModalConv(
                            convid,
                            'yesterday',
                            'YESTERDAY',
                            inout
                          ),
                            delmodalConv()
                        "
                        >Yesterday</v-btn
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        block
                        plain
                        small
                        @click="
                          sendModalConv(convid, 'Weekly', 'LAST 7 DAYS', inout),
                            delmodalConv()
                        "
                        >Last 7 Days</v-btn
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        block
                        plain
                        small
                        @click="
                          sendModalConv(
                            convid,
                            'Monthly',
                            'LAST 30 DAYS',
                            inout
                          ),
                            delmodalConv()
                        "
                        >Last 30 Days</v-btn
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
                &nbsp; &nbsp;
                {{ detailcrew.range.range_actual }}
                <v-spacer> </v-spacer>
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
              <v-data-table
                style="margin-top: 0px"
                v-if="detailcrew"
                :headers="headersDetail"
                :items="detailcrew.message"
                :items-per-page="5"
                class="elevation-1 margintab"
              >
                <template v-slot:item="row">
                  <tr>
                    <!-- <td>{{row.index}}</td> -->
                    <td>{{ row.item.Name }}</td>
                    <td>{{ row.item.ip }}</td>
                    <td>{{ row.item.volume }}</td>
                    <td>{{ row.item.traffic }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </section>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  components: {
    TableSkeleton,
  },
  data() {
    return {
      detailcrew: null,
      showcrewdetailclick: null,
      actif: "none",
      items: [5, 10, 15, "All"],
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      show: false,
      showCrew: null,
      showcrewclick: null,
      mrtgopen: false,
      notifopen: false,
      mrtgData: null,
      notifData: null,
      selectedNotif: "",
      search: "",
      search_name: localStorage.getItem("search_name"),
      search_nav: localStorage.getItem("search_nav"),
      showmaptable: "",
      showmaptracking: null,
      showmapclick: null,
      listcrew: null,
      index: "",
      switch1: true,
      loadernavplus: require("@/assets/img/load100new.gif"),
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Vessel Name", value: "name", width: "20%" },
        { text: "Company", value: "Quota", width: "50%" },
        { text: "Crew", value: "pt_name", width: "50%" },
      ],
      headersDetail: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "",
        },
        { text: "(Latitude, Longitude)", value: "name", width: "20%" },
        { text: "Skin Temperature (C)", value: "Quota", width: "50%" },
        {
          text: "Heart Rate (Beat per Minutes)",
          value: "pt_name",
          width: "50%",
        },
        { text: "Calorie (kcal)", value: "pt_name", width: "50%" },
        { text: "Walk (Steps)", value: "pt_name", width: "50%" },
        { text: "Distance (Meter)", value: "pt_name", width: "50%" },
        { text: "Date/Time (GMT+7)", value: "pt_name", width: "50%" },
        { text: "Status", value: "pt_name", width: "50%" },
      ],
    };
  },

  async created() {
    this.fetchCrewwatch(localStorage.getItem("token"));
    localStorage.setItem("searchname_thur", "");
    localStorage.setItem("searchid_thur", "");
    if (this.search_nav) {
      this.showOnMap("frommap", this.search_nav);
    }
  },

  methods: {
    ...mapActions(["fetchCrewwatch"]),
    async showCrews(item) {
      const data = {
        id: item.id,
      };
      const response = await axios.post(
        "https:/navigatorplus.sailink.id/api/v1/navplus/crew/list",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.data);
      this.showcrewclick = true;
      this.listcrew = response.data.data;
      console.log(this.listcrew);
    },

    async showDetailCrews(item) {
      console.log(item);
      const data = {
        id: item,
        range: "today",
      };
      const response = await axios.post(
        "https:/navigatorplus.sailink.id/api/v1/navplus/crew/detail",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.showcrewdetailclick = true;
      this.detailcrew = response.data.data;
    },

    diplaymap() {
      if (this.showmapclick != null) {
        return "block";
      } else {
        return "none";
      }
    },
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
      this.search_name = null;
    },
    showMapData() {
      if (this.search_name) {
        return this.search_name;
      } else {
        return this.search;
      }
    },
    delmrtgdata() {
      this.mrtgData = null;
    },
    delnotifdata() {
      this.notifData = null;
    },
    async sendDataMrtg(rule, data) {
      if (rule == "metered") {
        const response = await axios.get(
          "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/mrtg/" +
            data.id +
            "/" +
            data.mrtg_id,
          {
            headers: {
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
          }
        );
        this.mrtgData = response.data.data;
      }

      if (rule == "unmetered") {
        const response = await axios.get(
          "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/mrtg/" +
            data.id +
            "/" +
            data.mrtg_id_2,
          {
            headers: {
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
          }
        );
        this.mrtgData = response.data.data;
      }
    },

    async sendDataNotif(item) {
      const response = await axios.get(
        "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/mrtg/" +
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

    async showondate(item, range) {
      this.showmaptracking = null;
      const data = {
        id: item.id,
        range: range,
      };
      const response = await axios.post(
        "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/date",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.showmaptracking = response.data.data;
    },

    async showondateMap(item, range) {
      this.showmaptracking = null;
      const data = {
        id: item,
        range: range,
      };
      const response = await axios.post(
        "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/date",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.showmaptracking = response.data.data;
    },

    async showOnMap(rule, item) {
      this.showmaptable = "";
      this.showmaptracking = null;
      this.showmapclick = true;
      const container = this.$el.querySelector("#container_try");
      container.scrollTop = container.scrollHeight;

      if (rule == "frommap") {
        const response = await axios.get(
          "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/" + item,
          {
            headers: {
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
          }
        );
        this.showondateMap(item, "today");
        this.showmaptable = response.data.data;
      }

      if (rule == "inpage") {
        const response = await axios.get(
          "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/" + item.id,
          {
            headers: {
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
          }
        );
        this.showondate(item, "today");
        this.showmaptable = response.data.data;
        console.log(this.showmaptable);
      }
    },
  },
  mounted() {},

  computed: {
    ...mapGetters(["crewwatchData"]),
    ListOficer: function () {
      return this.listcrew.crews.filter(function (lc) {
        return lc.rank;
      });
    },
    ListCrews: function () {
      return this.listcrew.crews.filter(function (lc) {
        return !lc.rank;
      });
    },
  }, //
};
</script>

<style lang="scss">
@import "@/assets/scss/data.scss";

.header_modal {
  text-align: left;
}
.content_modal {
  margin-top: 20px;
}

.mrtg_title {
  color: #121212;
}

.v-btn {
  min-width: 36px;
  font-size: 8px;
}

.v-btn .pingbtn {
  width: 20px;
}

.mobile {
  color: #333;
}

@media screen and (max-width: 768px) {
  .mobile table.v-table tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile table.v-table tr:nth-child(odd) {
    border-left: 6px solid deeppink;
  }

  .mobile table.v-table tr:nth-child(even) {
    border-left: 6px solid cyan;
  }

  .mobile table.v-table tr td {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    height: auto;
    padding: 10px;
  }

  .mobile table.v-table tr td ul li:before {
    content: attr(data-label);
    padding-right: 0.5em;
    text-align: left;
    display: block;
    color: #999;
  }
  .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-start;
  }
  .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }
}
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 5px;
  width: 50%;
  height: 40px;
  font-weight: bold;
}

.v-application--wrap .v-application--wrap {
  min-height: 0px;
}

.container_table {
  margin-top: 13vh;
}
</style>
