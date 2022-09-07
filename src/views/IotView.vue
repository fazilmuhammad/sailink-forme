<template>
  <v-app>
    <div class="container_tabledata">
      <div v-if="!iotData">
        <TableSkeleton />
      </div>
      <v-card>
        <v-toolbar
          v-if="iotData"
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
        <v-data-table
          v-if="iotData"
          :search="search"
          :headers="headers"
          style="margin-top: 0px"
          :items="iotData"
          hide-default-footer
          :page.sync="page"
          :items-per-page="itemsPerPage"
          class="elevation-1 margintab"
          @page-count="pageCount = $event"
        >
          <template v-slot:item="row">
            <tr>
              <td style="white-space: nowrap; padding: 1em"> {{row.item.id}}</td>
              <td style="white-space: nowrap; padding: 1em">{{ row.item.name }}</td>
              <td style="white-space: nowrap; padding: 1em">{{ row.item.pt_name }}</td>
              <td style="white-space: nowrap; padding: 1em">
                <div class="grouptxt" v-if="!row.item.pt_group">-</div>
                <div v-if="row.item.pt_group">{{ row.item.pt_group }}</div>
              </td>
              <td v-if="row.item.ae3.on && row.item.ae3.off" style="white-space: nowrap; padding: 1em">
                <div class="devicestate">
                  <div>UP Since {{ row.item.ae3.on }}</div>
                  <div>DOWN at {{ row.item.ae3.off }}</div>
                </div>
              </td>
              <td v-if="!row.item.ae3.on && !row.item.ae3.off" style="white-space: nowrap; padding: 1em">-</td>
              <td style="white-space: nowrap; padding: 1em">
                <div class="gpiostatus">
                  <v-icon>
                    mdi-lightning-bolt
                  </v-icon>
                  <p class="txtgpio">
                    Device Power :
                  </p>
                  <v-chip
                  style="width:45px;"
                  small
                    v-if="row.item.ae5 == null || row.item.ae5"
                    class="ma-2"
                    color="green"
                    text-color="white"
                    >ON</v-chip
                  >
                  <v-chip
                    style="width:45px;"
                    small
                    
                    v-if="row.item.ae5 == false "
                    class="ma-2 blink"
                    color="red"
                    text-color="white"
                    >OFF</v-chip
                  >
                </div>
              </td>
              <td style="white-space: nowrap; padding: 1em">
                <v-btn
                      dark
                      @click="(gpioopen = true), sendDataGP(row.item)"
                      color="#2EA1B0"
                      role="button"
                      class="ma-1"
                      small
                      ><v-icon x-small>mdi-history</v-icon>&nbsp; GPIO History</v-btn>
                <v-btn
                @click="sendDataRPM(row.item.id,'lmonth')"
                v-if="row.item.rpm==true"
                      dark
                      color="#38C172"
                      role="button"
                      class="ma-1"
                      small
                      ><v-icon x-small>mdi-speedometer</v-icon>&nbsp; RPM Report</v-btn>
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
              v-model="page"
              :length="pageCount"
              :total-visible="7"
            ></v-pagination>
          </div>
      </v-card>
    </div>
       <!--Modal iot-->
    <v-dialog v-model="gpioopen" width="800px">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row
              ><v-toolbar-title
                ><v-icon>mdi-history</v-icon>&nbsp;&nbsp;IOT History for Power On/Off</v-toolbar-title
              ></v-row
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="(notifopen = false), delGPIO()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar style="margin-bottom: 20px" dense>
          <v-toolbar-title v-if="!dataGPIO">
            <div class="loader-line"></div>
          </v-toolbar-title>
          <v-toolbar-subtitle v-if="dataGPIO">{{
            dataGPIO.vessel_number
          }}</v-toolbar-subtitle>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form style="margin-top:-75px;">
          <v-container>
              <v-card-text >
              <v-data-table
                v-if="dataGPIO"
                :headers="headersSRC"
                :items="Output"
                :items-per-page="5"
                class="elevation-1 margintab"
              >
                <template v-slot:item="row">
                  <tr>
                    <!-- <td>{{row.index}}</td> -->
                    <td>{{row.item.index+1}}</td>
                    <td>{{ row.item.type }}</td>
                    <td>status</td>
                    <td>{{ row.item.dateTime_local }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <!--Modal IOT End-->
    <RpmShowVue :rpmData="rpmData" :rpmOutput="rpmOutput" :rpmID="rpmID" :rpmshowclick="rpmshowclick"/>
  </v-app>
</template>

<script>
import axios from "axios";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import RpmShowVue from "@/components/RpmShow.vue";
import { mapGetters, mapActions } from "vuex";

// import ModalSkeleton from '@/components/modal/ModalSkeleton.vue'
export default {
  components: {
    TableSkeleton,
    RpmShowVue,
    // ModalSkeleton
  },
  data() {
    return {
      rpmshowclick:false,
      gpioopen:false,
      dataGPIO:null,
      rpmData:null,
      rpmOutput:null,
      rpmID:null,
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      Output:null,
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Vessel Name", value: "name" },
        { text: "Company", value: "pt_name" },
        { text: "Group", value: "pt_group" },
        { text: "Device State", value: "serial_number" },
        { text: "Current GPIO Status", value: "good" },
        { text: "Manage", value: "good" },
      ],
      // in real case initial search_result = [], and methods: search function inject below data
      iot: null,
      selectedItem: "",
      selectedNotif: "",
      search: "",
      showmaptable: "",
      index: "",
    };
  },
  async created() {
    this.fetchIot(localStorage.getItem("token"))
    localStorage.setItem("search_name", "");
    localStorage.setItem("search_nav", "");
    localStorage.setItem("searchname_thur", "");
    localStorage.setItem("searchid_thur", "");
  },

  mounted(){
 this.$root.$on("sendDataRPM", (id,range) => {
      this.sendDataRPM(id,range);
    });
  },

  
  methods:
   {
...mapActions(["fetchIot"]),
    delGPIO(){
      this.gpioopen=false
      this.dataGPIO=null
    },


    async sendDataRPM(id,range) {
      this.rpmData=null
      this.rpmOutput=null
      this.rpmID=null
      const data = {
        id: id,
        range:range
      };
      const response = await axios.post("https:/navigatorplus.sailink.id/api/v1/navplus/iot/rpm", data, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      });
      console.log(response.data.data);
      this.rpmshowclick=true
      this.rpmData=response.data.data
      this.rpmID=id
      this.rpmOutput = this.rpmData.output.map((item, index) => Object.assign(item, { index }))
      // if (response) {
      //   this.alert_ = true;
      // }
    },


    async sendDataGP(item) {
      const response = await axios.get(
        "https:/navigatorplus.sailink.id/api/v1/navplus/iot/" + item.id,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response)
      this.dataGPIO  = response.data.data;
      this.Output = this.dataGPIO.output.map((item, index) => Object.assign(item, { index }))
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
      this.selectedNotif = response.data.data;
    },

   },
     computed: {
    ...mapGetters(["iotData"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/data.scss";
.gpiostatus {
  display: flex;
}
.txtgpio {
  margin-top: 15px;
}
.devicestate {
  display: block;
}
.blink {
    animation: blinker 1s linear infinite;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
}
</style>
