<template>
  <v-app>
    <div class="container_tabledata">
      <div v-if="!adminData">
        <TableSkeleton />
      </div>
      <v-card>
        <v-toolbar
          v-if="adminData"
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
          <v-btn
            @click="(cruserOpen = true), createUserGet()"
            color="primary"
            style="margin: 5px; text-decoration: none"
            small
            ><v-icon small>mdi-account-multiple-plus</v-icon>&nbsp;Create
            User</v-btn
          >
          &nbsp;
          <v-btn
            @click="(crownerOpen = true), createOwnerGet()"
            color="primary"
            style="text-decoration: none; margin: 5px"
            small
            ><v-icon small>mdi-account-plus</v-icon>&nbsp;Create Owner</v-btn
          >
        </v-toolbar>
        <v-data-table
          style="margin-top: 0px"
          v-if="adminData"
          :search="search"
          :headers="headers"
          hide-default-footer
          :page.sync="page"
          :items-per-page="itemsPerPage"
          :items="adminData"
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
                  v-if="row.item.editable"
                  class="mx-2"
                  fab
                  dark
                  x-small
                  color="primary"
                  @click="toEditPass(row.item.id)"
                >
                  <v-icon dark>mdi-cog-outline</v-icon> </v-btn
                >{{ row.item.name }}
              </td>
              <td style="white-space: nowrap; padding: 1em">
                {{ row.item.email }}
              </td>
              <td style="white-space: nowrap; padding: 1em">
                {{ row.item.name }}
              </td>
              <td style="white-space: nowrap; padding: 1em">
                {{ row.item.role_name }}
              </td>
              <td style="white-space: nowrap; padding: 1em">
                <div class="grouptxt" v-if="!row.item.group_name">-</div>
                <div v-if="row.item.group_name">{{ row.item.pt_group }}</div>
              </td>
              <td
                style="white-space: nowrap; padding: 1em"
                v-if="row.item.isEnabled"
                class="enabled"
              >
                <i class="bx bxs-check-square"></i>Yes
              </td>
              <td
                style="white-space: nowrap; padding: 1em"
                v-if="!row.item.isEnabled"
                class="enabled"
              >
                <i class="bx bx-check-square"></i>No
              </td>
              <td style="white-space: nowrap; padding: 1em">
                <v-btn
                  v-if="row.item.editable != false"
                  @click="toUpProf(row.item.id)"
                  dark
                  color="#2EA1B0"
                  small
                >
                  <v-icon small>mdi-pencil-box-multiple-outline</v-icon>
                </v-btn>
              </td>
              <td style="white-space: nowrap; padding: 1em">
                <v-btn
                  v-if="row.item.editable != false"
                  dark
                  color="#00BCD4"
                  small
                  @click="(premisOpen = true), premisGet(row.item.id)"
                >
                  <v-icon small>mdi-account-key-outline</v-icon>
                </v-btn>
              </td>
              <td style="white-space: nowrap; padding: 1em">
                <v-btn
                  v-if="row.item.editable != false"
                  dark
                  color="primary"
                  style="text-decoration: none"
                  @click="(companyOpen = true), vesselGet(row.item.id)"
                  small
                >
                  <v-icon small>mdi-cog-outline</v-icon>
                  <v-icon small>mdi-ferry</v-icon>
                </v-btn>
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
      </v-card>
    </div>

    <!--Modal Create User-->
    <v-dialog v-model="cruserOpen" width="70vh">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row class="notifquota"
              ><v-toolbar-title
                ><v-icon>mdi-account-multiple-plus</v-icon>&nbsp;&nbsp;Register
                User</v-toolbar-title
              ></v-row
            >

            <!-- <v-row class="notifquota_mobile"
              ><v-toolbar-title
                ><v-icon>tune-vertical-variant</v-icon>&nbsp;&nbsp;Quota Notif
                Config</v-toolbar-title
              ></v-row
            > -->
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="(notifopen = false), delcruserdata()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text style="margin-top: 30px">
          <v-text-field
            label="Name"
            v-model="oldpass"
            solo
            outlined
            dense
          ></v-text-field>
          <v-text-field
            :value="newpass"
            label="Email Address"
            v-model="newpass"
            solo
            outlined
            dense
          ></v-text-field>
          <v-select
            v-if="cruserData"
            v-model="cruserData.owners"
            :items="cruserData.owners"
            label="Ship Owner"
            solo
            outlined
            item-text="name"
            dense
          ></v-select>
          <v-toolbar dense color="primary" dark>
            <v-toolbar-title>Sailink Vessel</v-toolbar-title>
          </v-toolbar>
          <v-list-item-group
            v-if="userpremis"
            v-model="settings"
            multiple
            active-class=""
            style="text-align: left"
          >
            <v-list-item
              v-for="(item, i) in userpremis.permissions_fitur"
              :key="i"
            >
              <template>
                <v-list-item-action>
                  <v-checkbox
                    :value="item.id"
                    :input-value="
                      userpremis.allowed[i] == item.id ? true : false
                    "
                    v-model="userpremis.allowed"
                  ></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
          <v-text-field
            style="margin-top: 20px"
            :value="confirmpass"
            label="Password"
            v-model="confirmpass"
            solo
            outlined
            dense
          ></v-text-field>
          <v-text-field
            :value="confirmpass"
            label="Confirm Password"
            v-model="confirmpass"
            solo
            outlined
            dense
          ></v-text-field>

          <v-alert
            v-if="alert_"
            style="margin: 10px"
            dismissible
            dense
            prominent
            type="success"
            >Password Changed</v-alert
          >
        </v-card-text>

        <v-card-actions style="margin-top: -10px"
          ><v-btn color="primary" block> Register User </v-btn></v-card-actions
        >

        <v-card-actions class="justify-end"> </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Modal Create User End-->

    <!--Modal Create Owner-->
    <v-dialog v-model="crownerOpen" width="70vh">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row class="notifquota"
              ><v-toolbar-title
                ><v-icon>mdi-account-plus</v-icon>&nbsp;&nbsp;Register
                Owner</v-toolbar-title
              ></v-row
            >

            <!-- <v-row class="notifquota_mobile"
              ><v-toolbar-title
                ><v-icon>tune-vertical-variant</v-icon>&nbsp;&nbsp;Quota Notif
                Config</v-toolbar-title
              ></v-row
            > -->
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="delcrownerdata()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text style="margin-top: 30px">
          <v-text-field
            label="Name"
            v-model="ownerName"
            solo
            outlined
            dense
          ></v-text-field>
          <v-text-field
            :value="newpass"
            label="Email Address"
            v-model="ownerMail"
            solo
            outlined
            dense
          ></v-text-field>
          <v-select
            v-if="cruserData"
            v-model="ownerName"
            :items="cruserData.owners"
            label="Ship Owner"
            solo
            outlined
            item-text="name"
            dense
          ></v-select>
          <v-toolbar dense color="primary" dark>
            <v-toolbar-title>Sailink Company</v-toolbar-title>
          </v-toolbar>
          <v-card style="height: 10rem; overflow-y: auto">
            <v-list-item-group
              v-if="crownerData"
              v-model="settings"
              multiple
              active-class=""
              style="text-align: left"
            >
              <v-list-item v-for="(item, i) in crownerData.pts" :key="i">
                <template>
                  <v-list-item-action>
                    <v-checkbox
                      :value="item.id"
                      :v-model="crownerData.pts"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-card>
          <v-text-field
            style="margin-top: 20px"
            label="Password"
            v-model="ownerPass"
            solo
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            v-model="confirmpass"
            solo
            outlined
            dense
          ></v-text-field>

          <v-alert
            v-if="alert_"
            style="margin: 10px"
            dismissible
            dense
            prominent
            type="success"
            >Password Changed</v-alert
          >
        </v-card-text>

        <v-card-actions style="margin-top: -10px"
          ><v-btn @click="createOwnerPost()" color="primary" block>
            Register Owner
          </v-btn></v-card-actions
        >

        <v-card-actions class="justify-end"> </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Modal Create Owner End-->

    <!--Modal Company/Vessel-->
    <v-dialog v-model="companyOpen" width="80vh">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row class="notifquota"
              ><v-toolbar-title
                ><v-icon>mdi-ferry</v-icon
                >&nbsp;&nbsp;Company/Vessel</v-toolbar-title
              ></v-row
            >

            <!-- <v-row class="notifquota_mobile"
              ><v-toolbar-title
                ><v-icon>tune-vertical-variant</v-icon>&nbsp;&nbsp;Quota Notif
                Config</v-toolbar-title
              ></v-row
            > -->
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="delcompanydata()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-progress-linear
          v-if="!companyData"
          indeterminate
          color="#1F7AD3"
          height="6px"
        ></v-progress-linear>
        <v-card-text style="margin-top: 20px">
          <v-card>
            <v-toolbar v-if="companyData" dense color="#00BCD4" dark>
              <v-toolbar-title>Navigator+ Vessel Owned</v-toolbar-title>
            </v-toolbar>
            <v-list-item-group
              v-if="companyData"
              v-model="settings"
              multiple
              active-class=""
              style="text-align: left"
            >
              <v-list-item
                v-for="(item, i) in companyData.vessels
                  ? companyData.vessels
                  : companyData.pts"
                :key="i"
              >
                <template>
                  <v-list-item-action>
                    <v-checkbox
                      :value="item.id"
                      :input-value="companyData.owned.includes(item.id)"
                      v-model="trying"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.name }} |
                      {{ companyData.owned.includes(item.id) }} |
                      {{ item.id }}</v-list-item-title
                    >
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-card>
          <v-alert
            v-if="alertCompany_"
            style="margin: 10px"
            dismissible
            dense
            prominent
            type="success"
            >Company/Vessel Updated</v-alert
          >
        </v-card-text>

        <v-card-actions v-if="companyData" style="margin-top: -10px"
          ><v-btn
            @click="vesselPost(companyData.user.id)"
            color="primary"
            block
          >
            Update
          </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
    <!--Modal Company/Vessel-->

    <!--Modal Premission-->
    <v-dialog v-model="premisOpen" width="80vh">
      <v-card>
        <v-toolbar color="#0B4281" dark>
          <v-col class="header_modal">
            <v-row class="notifquota"
              ><v-toolbar-title
                ><v-icon>mdi-account-key</v-icon
                >&nbsp;&nbsp;Premission</v-toolbar-title
              ></v-row
            >

            <!-- <v-row class="notifquota_mobile"
              ><v-toolbar-title
                ><v-icon>tune-vertical-variant</v-icon>&nbsp;&nbsp;Quota Notif
                Config</v-toolbar-title
              ></v-row
            > -->
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="delpremisdata()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-progress-linear
          v-if="!premisData"
          indeterminate
          color="#1F7AD3"
          height="6px"
        ></v-progress-linear>
        <v-card-text style="margin-top: 20px">
          <v-card>
            <v-toolbar v-if="premisData" dense color="#00BCD4" dark>
              <v-toolbar-title>Navigator+ Permissions</v-toolbar-title>
            </v-toolbar>
            <v-list-item-group
              v-if="premisData"
              v-model="settings"
              multiple
              active-class=""
              style="text-align: left"
            >
              <v-list-item
                v-for="(item, i) in premisData.permissions_fitur"
                :key="i"
              >
                <template>
                  <v-list-item-action>
                    <v-checkbox
                      :value="item.id"
                      :input-value="
                        premisData.allowed[i] == item.id ? true : false
                      "
                      v-model="premisData.allowed"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-card>
          <v-alert
            v-if="alert_"
            style="margin: 10px"
            dismissible
            dense
            prominent
            type="success"
            >Password Changed</v-alert
          >
        </v-card-text>

        <v-card-actions v-if="premisData" style="margin-top: -10px"
          ><v-btn color="primary" block> Update </v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
    <!--Modal Premission-->
  </v-app>
</template>

<script>
import axios from "axios";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import { mapGetters, mapActions } from "vuex";
// import ModalSkeleton from '@/components/modal/ModalSkeleton.vue'
export default {
  components: {
    TableSkeleton,
    // ModalSkeleton
  },
  data() {
    return {
      itemsPerPage: 10,
      trying: [],
      page: 1,
      pageCount: 0,
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Name", value: "name" },
        { text: "Email", value: "pt_name" },
        { text: "Username", value: "pt_group" },
        { text: "Role", value: "serial_number" },
        { text: "Group", value: "good" },
        { text: "Enabled", value: "good" },
        { text: "Profile", value: "good" },
        { text: "Premission", value: "good" },
        { text: "Company/Vessel", value: "good" },
      ],

      cruserOpen: null,
      crownerOpen: null,
      ownerMail: null,
      ownerName: null,
      ownerPass: null,
      ownerPTS: null,
      crownerData: null,
      companyOpen: null,
      premisOpen: null,
      premisData: null,
      companyData: null,
      cruserData: null,
      selectedItem: "",
      selectedNotif: "",
      search: "",
      showmaptable: "",
      index: "",
    };
  },
  async created() {
    this.fetchAdmin(localStorage.getItem("token"));
    localStorage.setItem("search_name", "");
    localStorage.setItem("search_nav", "");
    localStorage.setItem("searchname_thur", "");
    localStorage.setItem("searchid_thur", "");
  },
  methods: {
    ...mapActions(["fetchAdmin"]),
    delcruserdata() {
      this.cruserOpen = null;
      this.cruserData = null;
    },

    delcrownerdata() {
      this.crownerOpen = null;
      this.crownerData = null;
    },

    delpremisdata() {
      this.premisOpen = null;
      this.premisData = null;
    },

    delcompanydata() {
      this.companyOpen = null;
      this.companyData = null;
    },

    toEditPass(user_id) {
      console.log("USER ID ==== " + user_id);
      this.$router.push({
        name: "changepassword",
        params: {
          user_id_bawaan: user_id,
        },
      });
    },

    toUpProf(user_id) {
      console.log("USER ID ==== " + user_id);
      this.$router.push({
        name: "editprofile",
        params: {
          user_id_bawaan: user_id,
        },
      });
    },

    toPremisson(user_id) {
      console.log("USER ID ==== " + user_id);
      this.$router.push({
        name: "premission",
        params: {
          user_id_bawaan: user_id,
        },
      });
    },

    async createUserGet() {
      const response = await axios.get(
        "https:/navigatorplus.sailink.id/api/v1/navplus/user/createUser",
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.cruserData = response.data.data;
    },

    async createOwnerGet() {
      const response = await axios.get(
        "https:/navigatorplus.sailink.id/api/v1/navplus/user/createOwner",
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.crownerData = response.data.data;
    },

    async createOwnerPost() {
      const data = {
        name: this.ownerName,
        email: this.ownerMail,
        password: this.ownerPass,
        role: "3",
        pts: this.trying,
      };
      const response = await axios.post(
        "https:/navigatorplus.sailink.id/api/v1/navplus/user/register",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      // if (response) {
      //   this.alert_ = true;
      // }
    },

    async vesselGet(user_id) {
      const response = await axios.get(
        "https:/navigatorplus.sailink.id/api/v1/navplus/user/edit/vessels/" +
          user_id,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      this.companyData = response.data.data;
    },

    async vesselPost(user_id) {
      const data = {
        role: this.companyData.user.role_id,
        pts: this.trying,
      };

      const data2 = {
        role: this.companyData.user.role_id,
        vessels: this.trying,
      };
      const response = await axios.post(
        "https:/navigatorplus.sailink.id/api/v1/navplus/user/edit/vessels/" +
          user_id,
        this.companyData.user.role_id == 3 ? data : data2,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
    },

    async premisGet(user_id) {
      const response = await axios.get(
        "https:/navigatorplus.sailink.id/api/v1/navplus/user/edit/permission/" +
          user_id,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.data);
      this.premisData = response.data.data;
    },

    async sendDataModal(item) {
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
      this.selectedItem = response.data.data;
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
      this.selectedNotif = response.data.data;
    },

    async showOnMap(item) {
      const response = await axios.get(
        "https:/navigatorplus.sailink.id/api/v1/navplus/sailink/" + item.id,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      this.showmaptable = response.data.data;
    },
  },
  computed: {
    ...mapGetters(["adminData"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/data.scss";

.enabled {
  color: #4e9ffa;
}
</style>
