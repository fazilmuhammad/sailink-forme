<template>
  <v-app class="container_tabledata">
      <div v-if="!snapshotData">
        <TableSkeleton />
      </div>
      <v-card>
        <v-toolbar
          v-if="snapshotData"
          elevation="4"
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
        <v-data-table
          style="margin-top: 0px"
          v-if="snapshotData"
          :search="search"
          :headers="headers"
          :items="snapshotData"
          :items-per-page="itemsPerPage"
          hide-default-footer
          :page.sync="page"
          class="elevation-1 margintab"
          @page-count="pageCount = $event"
        >
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.id }}</td>
              <td>{{ row.item.name }}</td>
              <td>{{ row.item.pt_name }}</td>
              <td>
                <v-btn
                  dark
                  color="#2EA1B0"
                  @click="showsnapshotFolder(row.item)"
                  small
                  ><v-icon small>mdi-image-plus</v-icon>&nbsp;&nbsp;Show
                  Snapshot</v-btn
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
        <v-progress-linear
          v-if="!snapshotfolder && loadingfolder"
          indeterminate
          color="#0B4281"
        ></v-progress-linear>
      </v-card>

   <!-- <v-card>
     <v-card  >
    
      <v-data-table
      v-if="snapshotpict"
        :items="snapshotpict"
        :items-per-page="25"
        class="elevation-1 margintab"
      >
        <template v-slot:item="row">
      <span>  
        <img
            
              class="imgsnapshot"
              v-bind:src="row.item.src"
              @click="(imageOpen = true), (imageData = row.item)"
              style="cursor: pointer;"
          /></span>
          
        </template>
      </v-data-table>
    </v-card>
   </v-card> -->
   <v-card v-if="loadingfolder">
    <v-toolbar color="primary" dark>
    <v-toolbar-title>{{vesselData.name}} | {{vesselData.pt_name}}</v-toolbar-title>
     <v-spacer></v-spacer>
          <v-btn
      class="mx-2"
      fab
      small
      dark
      color="#0B4281"
    
    ><v-icon dark>
        mdi-close
      </v-icon>
    </v-btn>
    </v-toolbar>
    <v-toolbar dense color="#fff">
      <v-icon small>mdi-image-multiple-outline</v-icon>&nbsp;&nbsp;Snapshots
      <v-spacer></v-spacer>
      <v-btn x-small>Wing Kanan</v-btn>
      &nbsp;
      <v-btn x-small>Wing Kiri</v-btn>
      &nbsp;
      <v-btn x-small>Anjungan</v-btn>
      &nbsp;
      <v-btn x-small>Engine Room</v-btn>
    </v-toolbar>
    <v-card-text>
       <v-container v-if="!snapshotpict && loadingimage" fill-height fluid>
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
        <div class="text-center">
        snapshotpict_:{{snapshotpict_}}
        <br/>
        ===================================================================
        <br/>
        snapshotpict:{{snapshotpict}}
        <v-container v-if="snapshotpict"  fluid>
          <v-row dense>
            <v-col v-for="(item, index) in snapshotpict_" :key="index" cols="3">
              <v-card>
                <v-img
                  @click="(imageOpen = true), (imageData = item)"
                  style="cursor: pointer;"
                  :src="item.src"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                </v-img>

                <v-card-actions>
                  <v-card-title class="caption">{{ item.label }}</v-card-title>
                  <v-spacer></v-spacer>
                  <v-chip small label>
                    ANJUNGAN
                  </v-chip>
                  <!-- <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-bookmark</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn> -->
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
     
        </v-container>
      </div>
     
          
    </v-card-text>
      <div
          class="pt-2"
          style="background-color: #b8cce2; padding: 20px; height: 4rem"
        >
        <v-pagination
            class="pagination mb-2"
            v-model="page"
            :length="pages"
            @input="updatePage"
          ></v-pagination>
        </div>
   </v-card>
  <v-card v-if="loadingfolder">
   <v-toolbar dense color="#fff">
      <v-icon small>mdi-image-multiple-outline</v-icon>&nbsp;&nbsp;Folders
    </v-toolbar>
   <v-container v-if="!snapshotfolder && loadingfolder" fill-height fluid>
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
      <div v-if="snapshotfolder" class="row">
        <div class="col" v-for="index in snapshotfolder.dir_label" :key="index">
          <v-card  style="width: 18rem; height: 8rem; margin: 20px">
            <v-btn
            icon
            x-large
              @click="onFolderClick(vesselData.id, index)"
            >
             <v-icon> mdi-folder</v-icon>
            </v-btn>
            <div class="card-body">
              <h5 class="card-title">{{ index }}</h5>
            </div>
          </v-card>
        </div>
        <div>
          <v-text id="mapa"> </v-text>
        </div>
      </div>
    </v-card>

    <!--Modal Image-->
    <v-dialog v-model="imageOpen" width="800px">
      <v-card v-if="imageData">
        <!-- <v-card-title
          >{{ imageData.label }} | {{ vesselData.name }} |
          {{ vesselData.pt_name }}
        </v-card-title> -->
        
        <v-img
          :src="imageData.src"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
        </v-img>
        <v-chip style="margin-top: 20px; margin-bottom: 20px">
          <v-card-subtitle>
            <!-- {{ imageData.filename }} -->
            {{vesselData}}
          </v-card-subtitle>
        </v-chip>
      </v-card>
    </v-dialog>
    <!--Modal Image End-->
  </v-app>
</template>

<script>
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
      display: "none",
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      pageSize: 1,
      listCount: 0,
      snapshotpict_: [],
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Vessel Name", value: "name", sortable: false },
        { text: "Company", value: "pt_name", sortable: false },
        { text: "Show Snapshot", value: "", sortable: false },
      ],
      // in real case initial search_result = [], and methods: search function inject below data
      snapshot: null,
      imageOpen: null,
      imageData: null,
      search: "",
      loadernavplus: require("@/assets/img/load100new.gif"),
    };
  },
 created() {
    this.fetchSnapshot(localStorage.getItem("token"));
    localStorage.setItem("search_name", "");
    localStorage.setItem("search_nav", "");
    localStorage.setItem("searchname_thur", "");
    localStorage.setItem("searchid_thur", "");
   
  },
  methods: {
    ...mapActions(["fetchSnapshot","snapshotFolder","FolderClick","vesselDataSet"]),

    async showsnapshotFolder(item) {
    this.vesselDataSet(item)
      const data ={
        id:item.id,
        token:localStorage.getItem("token")
      }
      this.snapshotFolder(data) 
      this.initPage();
      this.updatePage(this.page);

    },
    async onFolderClick(id, label) {
        const dataimg = {
        id:id,
        label: label,
        token:localStorage.getItem('token'),
      }

      this.FolderClick(dataimg)
    },
    initPage: function () {
      console.log('jalan')
      this.listCount = this.snapshotpict.length;
      console.log(this.listCount)
      if (this.listCount < this.pageSize) {
        this.snapshotpict_ = this.snapshotpict;
      } else {
        this.snapshotpict_ = this.snapshotpict.slice(0, this.pageSize);
      }
    },
    updatePage: function (pageIndex) {
      let _start = (pageIndex - 1) * this.pageSize;
      let _end = pageIndex * this.pageSize;
      this.snapshotpict_ = this.snapshotpict.slice(_start, _end);
      this.page = pageIndex;
    },
  },
  computed: {
    ...mapGetters(["snapshotData","snapshotpict","snapshotfolder","loadingimage","loadingfolder","vesselData"]),
      pages() {
      if (this.pageSize == null || this.listCount == null) return 0;
      return Math.ceil(this.listCount / this.pageSize);
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/data.scss";

.margintab {
  margin-top: -25px;
}

.bxfile {
  font-size: 40px;
}

.imgsnapshot {
  width: 250px;
  margin: 10px;
}

.datasnapshot {
  top: 70px;
}
</style>
