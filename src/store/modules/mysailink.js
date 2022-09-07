import axios from "axios";

const state = {
  sailink_data: null,
  alert: null,
  mrtg: null,
  showmaptable: null,
  vesselUsers: null,
  showmaptracking: null,
  showmapclick: null,
  rangeshowmap: null,
  tableTracking: null,
  ip_adr: null,
  ln_status: null,
  weather_data: null,
  searchVessel: null,
  searchVesselID: null,
};

const getters = {
  sailinkData: (state) => state.sailink_data,
  alertSailink: (state) => state.alert,
  mrtgSailink: (state) => state.mrtg,
  showmaptable: (state) => state.showmaptable,
  vesselUsers: (state) => state.vesselUsers,
  showmaptracking: (state) => state.showmaptracking,
  showmapclick: (state) => state.showmapclick,
  rangeshowmap: (state) => state.rangeshowmap,
  tableTracking: (state) => state.tableTracking,
  ip_adr: (state) => state.ip_adr,
  ln_status: (state) => state.ln_status,
  weather_data: (state) => state.weather_data,
  searchVessel: (state) => state.searchVessel,
  searchVesselID: (state) => state.searchVesselID,
};

const actions = {
  async fetchMySailink({ commit }, data) {
    const response = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/sailink",
      {
        headers: {
          Authorization: "Bearer" + data,
        },
      }
    );
    console.log(response);
    commit(
      "setMySailink",
      response.data.data.vessels.map((item, index) =>
        Object.assign(item, { index })
      )
    );
  },

  async fetchMRTG({ commit }, data) {
    const response = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/sailink/mrtg/" +
        data.id +
        "/" +
        data.mrtg,
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );
    console.log(response);
    commit("setMRTG", response.data.data);
  },

  removeMRTG({ commit }) {
    commit("setMRTG", null);
  },

  async updateVesselName({ commit }, data) {
    const dataName = {
      id: data.id,
      name: data.name,
    };
    const response = await axios.post(
      "https://navigatorplus.sailink.id/api/v1/navplus/vessel/name",
      dataName,
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );

    const sailink = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/sailink",
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );
    console.log(response);
    commit("setAlert", response);
    commit(
      "setMySailink",
      sailink.data.data.vessels.map((item, index) =>
        Object.assign(item, { index })
      )
    );
  },

  async showonMap({ commit }, data) {
    console.log(data);
    commit("setshowmaptable", null);
    commit("setvesselUsers", null);
    commit("settableTracking", null);
    const response = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/sailink/" + data.id,
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );
    console.log(response);
    commit("setshowmaptable", response.data.data);
    commit(
      "setvesselUsers",
      response.data.data.vesselUsers.map((item, index) =>
        Object.assign(item, { index })
      )
    );
    commit(
      "settableTracking",
      response.data.data.dataTable.map((item, index) =>
        Object.assign(item, { index })
      )
    );
  },

  async ipAdr({ commit }, data) {
    commit("setip_adr", null);
    const response = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/sailink/" +
        data.id +
        "/fetchIp",
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );
    console.log(response);
    commit("setip_adr", response.data.data);
  },

  async lnStatus({ commit }, data) {
    console.log(data);
    commit("setln_status", null);
    const response = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/sailink/" +
        data +
        "/fetchStatus",
      {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      }
    );
    commit("setln_status", response.data.data);
    console.log(this.ln_status);
  },

  async showondate({ commit }, data) {
    console.log(data);
    commit("setshowmaptracking", null);
    const datadate = {
      id: data.id,
      range: data.range,
    };
    const response = await axios.post(
      "https://navigatorplus.sailink.id/api/v1/navplus/sailink/date",
      datadate,
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );
    commit("setshowmaptracking", response.data.data);
  },

  async showweather({ commit }, data) {
    commit("setweather_data", null);
    const datawth = {
      id: data.id,
      msg_id: data.msg_id,
      type: data.type,
    };
    const response = await axios.post(
      "https://navigatorplus.sailink.id/api/v1/navplus/weather/fetchRow",
      datawth,
      {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    commit("setweather_data", response.data.data);
  },

  searchVesselInput({ commit }, data) {
    commit("setsearchVessel", data);
  },

  searchVesselID_Input({ commit }, data) {
    commit("setsearchVesselID", data);
  },

  removeSearch({ commit }) {
    commit("setsearchVessel", null);
  },

  removeShowMap({ commit }) {
    commit("setshowmaptable", null);
    commit("setvesselUsers", null);
    commit("settableTracking", null);
    commit("setshowmapclick", null);
    commit("setsearchVessel", null);
    commit("setsearchVesselID", null);
  },

  addShowClick({ commit }) {
    commit("setshowmapclick", true);
  },
};

const mutations = {
  setMySailink: (state, mysailink) => (state.sailink_data = mysailink),
  updateMySailink: (state, mysailink) => (state.sailink_data = mysailink),
  setMRTG: (state, mrtg) => (state.mrtg = mrtg),
  setAlert: (state, alert) => (state.alert = alert),
  setshowmaptable: (state, showmaptable) => (state.showmaptable = showmaptable),
  setvesselUsers: (state, vesselUsers) => (state.vesselUsers = vesselUsers),
  settableTracking: (state, tableTracking) =>
    (state.tableTracking = tableTracking),
  setip_adr: (state, ip_adr) => (state.ip_adr = ip_adr),
  setln_status: (state, ln_status) => (state.ln_status = ln_status),
  setshowmaptracking: (state, showmaptracking) =>
    (state.showmaptracking = showmaptracking),
  setweather_data: (state, weather_data) => (state.weather_data = weather_data),
  setsearchVessel: (state, searchVessel) => (state.searchVessel = searchVessel),
  setsearchVesselID: (state, searchVesselID) =>
    (state.searchVesselID = searchVesselID),
  setshowmapclick: (state, showmapclick) => (state.showmapclick = showmapclick),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
