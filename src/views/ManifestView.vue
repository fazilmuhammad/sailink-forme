<template>
    <v-app>
      <div
        id="container_try"
        style="overflow-y: scroll"
        class="container_tabledata"
      >
        <div v-if="!manifestData">
          <TableSkeleton />
        </div>
        <v-card>
        <v-toolbar
          v-if="manifestData"
          elevation="4"
          style="max-height: 70px"
          color="#B8CCE2"
          fixed
        >
        <v-card-text class="showtext">Show</v-card-text>
        <v-card-text class="itempage">
        <v-menu  offset-y>
            <template  v-slot:activator="{ on, attrs }">
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
              v-if="manifestData"
              :search="showMapData()"
              :headers="headers"
              :items="manifestData"
              hide-default-footer

               :page.sync="page"
      :items-per-page="itemsPerPage"

      class="elevation-1"
      @page-count="pageCount = $event"
             
            >
              <template v-slot:item="row">
                <tr>
                  <td>{{ row.item.id }}</td>
                  <td>{{row.item.thuraya_number}}</td>
                  <td>{{ row.item.name }}</td>
                  <td>{{ row.item.pt_name }}</td>
                  <td>
                    <v-btn
                      color="#38C172"
                      dark
                      role="button"
                      class="pingbtn"
                      @click="showManifest(row.item.thuraya_number, 'today')"
                      small
                      ><i class='bx bx-trending-up'></i>&nbsp;&nbsp;Manifest Report</v-btn
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
            <div class="pt-2"   style="
              background-color: #b8cce2;
              padding: 20px;
              height: 4rem;
            ">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="7"
      ></v-pagination>
      
    </div>
          </v-layout>

          <v-progress-linear
            v-if="!showmanifest && showmanifestclick"
            indeterminate
            color="#0B4281"
          ></v-progress-linear>
        </v-card>

        
      <ShowManifest
        :showmanifest="showmanifest"
        :showmanifestclick="showmanifestclick"
      />

</div>
     

    </v-app>
</template>

<script>
import axios from "axios";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import ShowManifest from "@/components/ShowManifest.vue"
import { mapGetters, mapActions } from "vuex";

export default {
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  components: {
    TableSkeleton,
    ShowManifest,

},
  data() {
    return {
      showmanifest:null,
      showmanifestclick:null,
      loadernavplus: require("@/assets/img/load100new.gif"),
      actif: "none",
      items: [5, 10, 15, 'All'],
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      show: false,
      mrtgopen: false,
      notifopen: false,
      manifest: null,
      mrtgData: null,
      notifData: null,
      selectedNotif: "",
      search: "",
      search_name: localStorage.getItem("search_name"),
      search_nav: localStorage.getItem("search_nav"),
      showmaptable: "",
      showmaptracking: null,
      showmapclick: null,
      index: "",
      switch1: true,
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Thuraya Number", value: "name", width: "20%" },
        { text: "Vessel", value: "Quota", width: "50%" },
        { text: "Company", value: "pt_name", width: "50%" },
        { text: "Manifest", value: "pt_group", width: "50%" },
      ],
    };
  },

  async created() {
    this.fetchManifest(localStorage.getItem("token"))
    localStorage.setItem("searchname_thur", "");
    localStorage.setItem("searchid_thur", "");
    if (this.search_nav) {
      this.showOnMap("frommap", this.search_nav);
    }

    
  },

  methods: {
    ...mapActions(["fetchManifest"]),
    async showManifest(thuraya_number, range) {
      this.showmanifest = null;
      this.showmanifestclick=true;
      const data = {
        range: range,
        thuraya_number: thuraya_number,
      };
      const response = await axios.post("https:/navigatorplus.sailink.id/api/v1/navplus/manifest", data, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      });
      console.log(response);
      this.showmanifest = response.data.data;
    },




    diplaymap(){
      if(this.showmapclick !=null){
        return 'block'
      }else{
        return 'none'
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
          "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/mrtg/" + data.id + "/" + data.mrtg_id,
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
          "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/mrtg/" + data.id + "/" + data.mrtg_id_2,
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
        "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/mrtg/" + item.id + "/" + item.mrtg_id,
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
      const response = await axios.post("https:/navigatorplus.sailink.id/api/v1/navplus/sailink/date", data, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      });
      console.log(response);
      this.showmaptracking = response.data.data;
    },

    async showondateMap(item, range) {
      this.showmaptracking = null;
      const data = {
        id: item,
        range: range,
      };
      const response = await axios.post("https:/navigatorplus.sailink.id/api/v1/navplus/sailink/date", data, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      });
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
        const response = await axios.get("https:/navigatorplus.sailink.id/api/v1/navplus/sailink/" + item, {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        });
        this.showondateMap(item, "today");
        this.showmaptable = response.data.data;
      }

      if (rule == "inpage") {
        const response = await axios.get("https:/navigatorplus.sailink.id/api/v1/navplus/sailink/" + item.id, {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        });
        this.showondate(item, "today");
        this.showmaptable = response.data.data;
        console.log(this.showmaptable);
      }
    },
  },
   computed: {
    ...mapGetters(["manifestData"]),
  },
 
};
</script>

<style lang="scss">
@import "@/assets/scss/data.scss";
</style>
