<template>
  <v-app>
    <div class="container_tabledata">
      <div v-if="!reportsData">
        <TableSkeleton />
      </div>
      <v-card>
        <v-toolbar
          v-if="reportsData"
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
        <v-data-table
          style="margin-top: 0px"
          v-if="reportsData"
          :search="search"
          :headers="headers"
          :items="reportsData"
          :items-per-page="itemsPerPage"
          hide-default-footer
          :page.sync="page"
          class="elevation-1 margintab"
          @page-count="pageCount = $event"
        >
          <template v-slot:item="row">
            <tr>
              <td style="white-space: nowrap; padding: 1em">
                {{ row.item.id }}
              </td>
              <td style="white-space: nowrap; padding: 1em">
                {{ row.item.name }}
              </td>
              <td style="white-space: nowrap; padding: 1em">
                {{ row.item.pt_name }}
              </td>

              <td style="white-space: nowrap; padding: 1em">
                <div class="text-center">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        class="ma-1"
                        color="#38C172"
                        v-bind="attrs"
                        v-on="on"
                        small
                      >
                        <v-icon x-small>mdi-chart-bar</v-icon>
                        &nbsp; Application &nbsp;
                        <v-icon small>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-btn
                          @click="
                            (appopen = true),
                              sendModalApp(
                                'metered',
                                row.item,
                                'Daily',
                                'LAST 24 HOURS'
                              )
                          "
                          text
                          small
                          block
                          >Metered</v-btn
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-btn
                          @click="
                            (appopen = true),
                              sendModalApp(
                                'unmetered',
                                row.item,
                                'Daily',
                                'LAST 24 HOURS'
                              )
                          "
                          text
                          small
                          block
                          >Unmetered</v-btn
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-btn
                    dark
                    color="#239579"
                    @click="
                      (srcOpen = true),
                        sendModalSource(row.item, 'Daily', 'LAST 24 HOURS')
                    "
                    class="ma-1"
                    small
                  >
                    <v-icon x-small>mdi-source-fork</v-icon>
                    &nbsp; Source
                  </v-btn>
                  <v-btn
                    dark
                    class="ma-1"
                    color="#239579"
                    @click="
                      (dstOpen = true),
                        sendModalDst(row.item, 'Daily', 'LAST 24 HOURS')
                    "
                    small
                  >
                    <v-icon x-small>mdi-map-marker-distance</v-icon>
                    &nbsp; Destination
                  </v-btn>
                  <v-btn
                    dark
                    class="ma-1"
                    color="#2C7DAA"
                    @click="
                      (convOpen = true),
                        sendModalConv(row.item, 'Daily', 'LAST 24 HOURS', inout)
                    "
                    small
                    ><v-icon x-small>mdi-contain</v-icon>
                    &nbsp; Conversation
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
            v-model="page"
            :length="pageCount"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-card>


      <!--Modal App-->
      <v-dialog v-model="appopen" width="80vw">
        <v-card>
          <v-toolbar color="#0B4281" dark>
            <v-col class="header_modal">
              <v-row
                ><v-toolbar-title
                  ><v-icon>mdi-chart-bar</v-icon> &nbsp;&nbsp;Application Report
                  Summary</v-toolbar-title
                ></v-row
              >
            </v-col>

            <v-spacer></v-spacer>

            <v-btn icon dark @click="(appopen = false), delmodalapp()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-toolbar style="margin-bottom: 20px" dense>
            <v-toolbar-title v-if="!modalapp">
              <div class="loader-line"></div>
            </v-toolbar-title>
            <v-toolbar-subtitle v-if="modalapp">{{
              modalapp.vessel_pt
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
                    @click="
                      sendModalApp(
                        modalapprule,
                        modalappid,
                        'hourly',
                        'LAST HOUR'
                      ),
                        delmodalapp()
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
                      sendModalApp(
                        modalapprule,
                        modalappid,
                        '6hour',
                        'LAST 6 HOUR'
                      ),
                        delmodalapp()
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
                      sendModalApp(
                        modalapprule,
                        modalappid,
                        'Daily',
                        'LAST 24 HOUR'
                      ),
                        delmodalapp()
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
                      sendModalApp(modalapprule, modalappid, 'today', 'TODAY'),
                        delmodalapp()
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
                      sendModalApp(
                        modalapprule,
                        modalappid,
                        'yesterday',
                        'YESTERDAY'
                      ),
                        delmodalapp()
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
                      sendModalApp(
                        'metered',
                        modalappid,
                        'Weekly',
                        'LAST 7 DAYS'
                      ),
                        delmodalapp()
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
                      sendModalApp(
                        'metered',
                        modalappid,
                        'Monthly',
                        'LAST 30 DAYS'
                      ),
                        delmodalapp()
                    "
                    >Last 30 Days</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>

          <v-container v-if="!modalapp" fill-height fluid>
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

          <v-card-text v-if="modalapp">
            <p v-if="!modalapp.chart.datasets">
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
            </p>
            <AppChart
              v-if="modalapp.chart.datasets"
              v-bind:datachart="modalapp.chart"
              v-bind:modalapp="modalapp"
            />
            <br />
            <br />
            <br />
            <v-data-table
              v-if="modalapp.chart.datasets"
              :headers="headersecond"
              :items="modalapp.dataTable"
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
      </v-dialog>
      <!--Modal App End-->

      <!--Modal Source-->
      <v-dialog v-model="srcOpen" width="80vw">
        <v-card>
          <v-toolbar color="#0B4281" dark>
            <v-col class="header_modal">
              <v-row
                ><v-toolbar-title>
                  <v-icon>mdi-source-fork</v-icon> &nbsp;&nbsp;Source Report
                  Summary</v-toolbar-title
                ></v-row
              >
            </v-col>
            <v-spacer></v-spacer>

            <v-btn icon dark @click="(srcOpen = false), delsrcdata()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-toolbar style="margin-bottom: 20px" dense>
            <v-toolbar-title v-if="!srcData">
              <div class="loader-line"></div>
            </v-toolbar-title>
            <v-toolbar-subtitle v-if="srcData">{{
              srcData.vessel_pt
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
                    @click="
                      sendModalSource(modalsrcid, 'hourly', 'LAST HOUR'),
                        delsrcdata()
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
                      sendModalSource(modalsrcid, '6hour', 'LAST 6 HOURS'),
                        delsrcdata()
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
                      sendModalSource(modalsrcid, 'today', 'LAST 24 HOURS'),
                        delsrcdata()
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
                      sendModalSource(modalsrcid, 'Daily', 'TODAY'),
                        delsrcdata()
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
                      sendModalSource(modalsrcid, 'yesterday', 'YESTERDAY'),
                        delsrcdata()
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
                      sendModalSource(modalsrcid, 'Weekly', 'LAST 7 DAYS'),
                        delsrcdata()
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
                      sendModalSource(modalsrcid, 'Monthly', 'LAST 30 HOURS'),
                        delsrcdata()
                    "
                    >Last 30 Days</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-container v-if="!srcData" fill-height fluid>
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
          <v-card-text>
            <v-card-text style="margin-top: 70px">
              <v-data-table
                v-if="srcData"
                :headers="headersSRC"
                :items="srcData.dataTable"
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
            </v-card-text>
          </v-card-text>

          <v-card-actions class="justify-end"> </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Modal Source End-->

      <!--Modal Dest-->
      <v-dialog v-model="dstOpen" width="80vw">
        <v-card>
          <v-toolbar color="#0B4281" dark>
            <v-col class="header_modal">
              <v-row
                ><v-toolbar-title
                  ><v-icon>mdi-map-marker-distance</v-icon>
                  &nbsp;&nbsp;Destination Report Summary</v-toolbar-title
                ></v-row
              >
            </v-col>

            <v-spacer></v-spacer>

            <v-btn icon dark @click="(dstOpen = false), delmodaldest()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-toolbar style="margin-bottom: 20px" dense>
            <v-toolbar-title v-if="!dstData">
              <div class="loader-line"></div>
            </v-toolbar-title>
            <v-toolbar-subtitle v-if="dstData">{{
              dstData.vessel_pt
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
                    @click="
                      sendModalDst(destid, 'hourly', 'LAST HOUR'),
                        delmodaldest()
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
                      sendModalDst(destid, '6hour', 'LAST 6 HOURS'),
                        delmodaldest()
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
                      sendModalDst(destid, 'today', 'LAST 24 HOURS'),
                        delmodaldest()
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
                      sendModalDst(destid, 'Daily', 'TODAY'), delmodaldest()
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
                      sendModalDst(destid, 'yesterday', 'YESTERDAY'),
                        delmodaldest()
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
                      sendModalDst(destid, 'Weekly', 'LAST 7 DAYS'),
                        delmodaldest()
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
                      sendModalDst(destid, 'Monthly', 'LAST 30 DAYS'),
                        delmodaldest()
                    "
                    >Last 30 Days</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-container v-if="!dstData" fill-height fluid>
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
          <v-card-text>
            <v-card-text style="margin-top: 70px">
              <v-data-table
                v-if="dstData"
                :headers="headersDst"
                :items="dstData.dataTable"
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
            </v-card-text>
          </v-card-text>

          <v-card-actions class="justify-end"> </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Modal Dest End-->

      <!--Modal Conversation-->
      <v-dialog v-model="convOpen" width="80vw">
        <v-card>
          <v-toolbar color="#0B4281" dark>
            <v-col class="header_modal">
              <v-row
                ><v-toolbar-title
                  ><v-icon>mdi-contain</v-icon> &nbsp;&nbsp;Conversation Report
                  Summary</v-toolbar-title
                ></v-row
              >
            </v-col>

            <v-spacer></v-spacer>

            <v-btn icon dark @click="(convOpen = false), delmodalConv()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-toolbar style="margin-bottom: 20px" dense>
            <v-toolbar-title v-if="!convData">
              <div class="loader-line"></div>
            </v-toolbar-title>
            <v-toolbar-subtitle v-if="convData">{{
              convData.vessel_pt
            }}</v-toolbar-subtitle>
            <v-spacer></v-spacer>
            <v-radio-group style="margin-top: 25px" v-model="inout" row>
              <v-radio
                label="IN"
                value="IN"
                @click="
                  sendModalConv(convid, time, labeldur, inout), delmodalConv()
                "
              ></v-radio>
              <v-radio
                label="OUT"
                value="OUT"
                @click="
                  sendModalConv(convid, time, labeldur, inout), delmodalConv()
                "
              ></v-radio>
            </v-radio-group>
            &nbsp; &nbsp; &nbsp;
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
                      sendModalConv(convid, 'today', 'LAST 24 HOURS', inout),
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
                      sendModalConv(convid, 'yesterday', 'YESTERDAY', inout),
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
                      sendModalConv(convid, 'Monthly', 'LAST 30 DAYS', inout),
                        delmodalConv()
                    "
                    >Last 30 Days</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-container v-if="!convData" fill-height fluid>
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
          <v-card-text>
            <v-card-text v-if="convData" style="margin-top: 20px">
              <v-text-field
                label="Search"
                v-model="searchcon"
                append-icon="mdi-magnify"
                solo
              ></v-text-field>
              <v-data-table
                :search="searchcon"
                :headers="headersConv"
                :items="convData.dataTable"
                :items-per-page="5"
                class="elevation-1 margintab"
              >
                <template v-slot:item="row">
                  <tr>
                    <!-- <td>{{row.index}}</td> -->
                    <td>{{ row.item.src }}</td>
                    <td>{{ row.item.dst }}</td>
                    <td>{{ row.item.app }}</td>
                    <td>{{ row.item.port }}</td>
                    <td>{{ row.item.prot }}</td>
                    <td>{{ row.item.dscp }}</td>
                    <td>{{ row.item.traffic }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card-text>

          <v-card-actions class="justify-end"> </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Modal Conversation End-->
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import AppChart from "@/components/charts/AppChart.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    TableSkeleton,
    AppChart,
  },
  data() {
    return {
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      headersConv: [
        // {
        // text: '#',
        // align: 'start',
        // sortable: false,
        // value: 'id',
        // },
        { text: "Source", value: "name" },
        { text: "Destination", value: "ip" },
        { text: "Application", value: "pt_name" },
        { text: "Port", value: "pt_name" },
        { text: "Protocol", value: "pt_name" },
        { text: "DSCP", value: "pt_name" },
        { text: "Traffic", value: "pt_name" },
      ],
      headersSRC: [
        // {
        // text: '#',
        // align: 'start',
        // sortable: false,
        // value: 'id',
        // },
        { text: "Name", value: "name" },
        { text: "IP", value: "ip" },
        { text: "Traffic", value: "pt_name" },
        { text: "% of Traffic", value: "pt_name" },
      ],
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Vessel Name", value: "name", width: "30%", sortable: false },
        { text: "Company", value: "pt_name", width: "20%", sortable: false },
        { text: "Reports", value: "good", width: "50%", sortable: false },
      ],
      headersecond: [
        // {
        // text: '#',
        // align: 'start',
        // sortable: false,
        // value: 'id',
        // },
        { text: "Name", value: "name" },
        { text: "Traffic", value: "pt_name" },
        { text: "% of Traffic", value: "pt_name" },
      ],
      headersDst: [
        // {
        // text: '#',
        // align: 'start',
        // sortable: false,
        // value: 'id',
        // },
        { text: "Name", value: "name" },
        { text: "IP", value: "ip" },
        { text: "Traffic", value: "pt_name" },
        { text: "% of Traffic", value: "pt_name" },
      ],
      loadernavplus: require("@/assets/img/load100new.gif"),
      noway: require("@/assets/img/wrongway_navplus.png"),
      modalapp: null,
      modalappun: null,
      modalsource: null,
      modaldst: null,
      modalconv: null,
      appopen: false,
      srcOpen: false,
      srcData: null,
      dstOpen: false,
      dstData: null,
      convOpen: null,
      convData: null,
      modalappid: null,
      modalapprule: null,
      modalsrcid: null,
      destid: null,
      convid: null,
      labeldur: null,
      time: null,
      inout: "IN",
      search: "",
      searchcon: "",
    };
  },
  async created() {
    this.fetchReports(localStorage.getItem("token"));
    localStorage.setItem("search_name", "");
    localStorage.setItem("search_nav", "");
    localStorage.setItem("searchname_thur", "");
    localStorage.setItem("searchid_thur", "");
  },
  methods: {
   
    ...mapActions(["fetchReports"]),


    delmodalConv() {
      (this.convData = null), (this.convid = null), (this.labeldur = null);
    },
    delmodalapp() {
      (this.modalapp = null),
        (this.modalappun = null),
        (this.modalappid = null),
        (this.modalapprule = null),
        (this.labeldur = null);
    },

    delsrcdata() {
      (this.modalsrcid = null), (this.srcData = null);
      this.labeldur = null;
    },

    delmodaldest() {
      (this.destid = null), (this.dstData = null), (this.labeldur = null);
    },

    onButtonClick(item) {
      console.log("click on " + item.no);
    },

    async sendModalApp(rule, data, time, range) {
      if (rule == "metered") {
        const response = await axios.get(
          "https://navigatorplus.sailink.id/api/v1/navplus/nta/app/" +
            data.id +
            "/" +
            data.nfa_id +
            "/" +
            time,
          {
            headers: {
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        this.modalapp = response.data.data;
        this.modalapprule = rule;
        this.labeldur = range;
      }
      if (rule == "unmetered") {
        const response = await axios.get(
          "https://navigatorplus.sailink.id/api/v1/navplus/nta/app/" +
            data.id +
            "/" +
            data.nfa_id_2 +
            "/" +
            time,
          {
            headers: {
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
          }
        );
        this.modalapp = response.data.data;
        this.modalapprule = rule;
        this.labeldur = range;
      }
      this.modalappid = data;
    },
    async sendModalSource(item, time, range) {
      const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/nta/src/" +
          item.id +
          "/" +
          item.nfa_id +
          "/" +
          time,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      (this.srcData = response.data.data), (this.modalsrcid = item);
      this.labeldur = range;
    },
    async sendModalDst(item, time, range) {
      const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/nta/dst/" +
          item.id +
          "/" +
          item.nfa_id +
          "/" +
          time,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.data);
      this.dstData = response.data.data;
      this.destid = item;
      this.labeldur = range;
    },
    async sendModalConv(item, time, range, inout) {
      const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/nta/conv/" +
          item.id +
          "/" +
          item.nfa_id +
          "/" +
          time +
          "/" +
          inout,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );

      this.convData = response.data.data;
      this.convid = item;
      this.labeldur = range;
      this.time = time;
    },
  },


    computed:{
    ...mapGetters([
    "reportsData"
    ]),}
};
</script>

<style lang="scss">
@import "@/assets/scss/data.scss";
</style>
