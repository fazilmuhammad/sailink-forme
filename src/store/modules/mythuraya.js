import axios from "axios";

const state = {
    thuraya_data: null,
    showmapthuraya: null,
    showmaptracking: null,
    showthurayaclick: null,
    thurayadataTable:null,
    searchIDThuraya:null,
    searchThuraya:null,
    wlData:null,
    wlID:null,
    trackData:null,
    intervalData:null,
};

const getters = {
  thurayaData: (state) => state.thuraya_data,
  showmapthuraya:(state)=> state.showmapthuraya,
  showmaptracking:(state) => state.showmaptracking,
  showthurayaclick:(state) => state.showthurayaclick,
  thurayadataTable:(state) => state.thurayadataTable,
  searchIDThuraya:(state) => state.searchIDThuraya,
  searchThuraya:(state)=>state.searchThuraya,
  wlData:(state)=>state.wlData,
  wlID:(state)=>state.wlID,
  trackData:(state)=>state.trackData,
  intervalData:(state) =>state.intervalData
};

const actions = {
  async fetchThuraya({ commit },data) {
    const response = await axios.get("https://navigatorplus.sailink.id/api/v1/navplus/thuraya", {
        headers: {
          Authorization: "Bearer" + data,
        },
      });
    commit("setThurayaData", response.data.data.vessels.map((item, index) =>
    Object.assign(item, { index })
  ));
  },

  async showonMapThuraya({ commit }, data) {
    commit("setshowthurayaclick",true);
    commit("setshowmapthuraya", null);
    commit("setshowmaptracking",null);
    commit("setthurayadataTable", null);
    const response = await axios.get("https://navigatorplus.sailink.id/api/v1/navplus/thuraya/" + data.id, {
          headers: {
            Authorization: "Bearer" + data.token,
          },
        });
    console.log(response);
    commit("setshowmapthuraya", response.data.data);
  },

  removeShowThuraya({commit}){
    commit("setshowthurayaclick",null);
    commit("setshowmapthuraya", null);
    commit("setthurayadataTable", null);
    commit("setsearchThuraya", null);
    commit("setsearchIDThuraya", null);
  },
  
  async showdateThuraya({commit},data) {
    const datasend = {
      id: data.id,
      range: data.range,
    };
    const response = await axios.post("https://navigatorplus.sailink.id/api/v1/navplus/thuraya/date", datasend, {
      headers: {
        Authorization: "Bearer" + data.token,
      },
    });
    console.log(response)
    commit(
      "setshowmaptracking",response.data.data
    );
    commit("setthurayadataTable", response.data.data.dataTable.map((item, index) =>
    Object.assign(item, { index })
  ));
  },


  async  DataWhiteList({ commit }, data) {
    const response = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/" +
        data.id +
        "/whitelist",
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );
    console.log(response);
    commit("setwlData",response.data.data)
    commit("setwlID",data.id)
  },



  async wlPost({commit},data) {
    const datawl = {
      thuraya_number: data.thuraya_number,
      recipients: data.recipients,
      names: data.names,
    };
    const response = await axios.post(
      "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/whitelist",
      datawl,
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );
    console.log(response);
    commit("setwlData",response.data.data)
  },


  async DataInterval({commit},data) {
    const response = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/thuraya/" +
        data.id +
        "/interval",
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );
    commit("setwlID",data.id)
    commit("settrackData",response.data.data)
    commit("setintervalData",response.data.data.latest_content)
  },


  searchIDThuraya_Input({ commit }, data) {
    commit("setsearchIDThuraya", data);
  },

  searchThurayaInput({commit},data){
    commit("setsearchThuraya", data);
  },
  
  removeThuraya({ commit }) {
    commit("setsearchThuraya", null);
  },
};

const mutations = {
  setThurayaData: (state, thuraya_data) => (state.thuraya_data = thuraya_data),
  setshowmapthuraya: (state, showmapthuraya) => (state.showmapthuraya = showmapthuraya),
  setshowmaptracking:(state,showmaptracking) => (state.showmaptracking = showmaptracking), 
  setshowthurayaclick:(state,showthurayaclick) => (state.showthurayaclick = showthurayaclick),
  setthurayadataTable:(state,thurayadataTable) => (state.thurayadataTable = thurayadataTable),
  setsearchIDThuraya:(state,searchIDThuraya)=>(state.searchIDThuraya = searchIDThuraya),
  setsearchThuraya:(state,searchThuraya) => (state.searchThuraya = searchThuraya),
  setwlData:(state,wlData) => (state.wlData = wlData),
  setwlID:(state,wlID) => (state.wlID = wlID),
  settrackData:(state,trackData) =>(state.trackData = trackData),
  setintervalData:(state,intervalData) =>(state.intervalData = intervalData)
};

export default {
  state,
  getters,
  actions,
  mutations,
};
