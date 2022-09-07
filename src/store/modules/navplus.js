import axios from "axios";
import "./login"

const state = {
    sailink_locations: null,
    thuraya_locations: null,
    sidebar_vessel: null,
    satnet:null,
    weather:null,
    apiKey: "AIzaSyBQjzq4sjWEQWvUrwDo8b7d-ggJn0JnunA",
    eirp:null,
    gnt:null,
    Skyreach1Con:null,
    Skyreach2Con:null,
    Apstar9Con:null,
    Abs2Con:null,
    OceanBeamCon:null,
};

const getters = {
  sailinkLocation: (state) => state.sailink_locations,
  thurayaLocation: (state) => state.thuraya_locations,
  sidebarVessel: (state) => state.sidebar_vessel,
  satNet:(state)=> state.satnet,
  weaTher:(state) => state.weather,
  apiKey:(state) => state.apiKey,
  eirp:(state) => state.eirp,
  gnt:(state) => state.gnt,
  Skyreach1Con:(state) =>state.Skyreach1Con,
  Skyreach2Con:(state) => state.Skyreach2Con,
  Apstar9Con:(state) => state.Apstar9Con,
  Abs2Con:(state)=> state.Abs2Con,
  OceanBeamCon:(state) => state.OceanBeamCon,

};

const actions = {
  async fetchVessel({ commit },data) {
    const response = await axios.get("https://navigatorplus.sailink.id/api/v1/navplus/gmaps/index", {
      headers: {
        // Authorization: "Bearer" + localStorage.getItem("token"),
        Authorization: "Bearer" + data,
      },
      
    });
    commit("setSailink", response.data.data.locations.navplus);
    commit("setThuraya", response.data.data.locations.thuraya);
    commit("setSidebar", response.data.data.sidebar_vessel);
  },

  async fetchSatNet({commit},data){
    const response = await axios.post(
        "https://navigatorplus.sailink.id/api/v1/navplus/gmaps/fetchSatnetData",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      commit("setSatNet", response.data.data);
  },

  async fetchWeather({commit},data){
    const response = await axios.post(
        "https://navigatorplus.sailink.id/api/v1/navplus/gmaps/fetchWeatherCurrent",
        data,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      commit("setWeather", response.data.data);
  },

  eirpOn({commit},data){
    commit("seteirp",data);
  },

  gntOn({commit},data){
    console.log(data)
    commit("setgnt",data);
  },

  addSkyreach1Con({commit},data){
    commit("setSkyreach1Con",data);
  },
  
  addSkyreach2Con({commit},data){
    commit("setSkyreach2Con",data)
  },

  addApstar9Con({commit},data){
    commit("setApstar9Con",data)
  },

  addAbs2Con({commit},data){
    commit("setAbs2Con",data)
  },

  addOceanBeamCon({commit},data){
    commit("setOceanBeamCon",data)
  }

};

const mutations = {
  setSailink: (state, sailink) => (state.sailink_locations = sailink),
  setThuraya: (state, thuraya) => (state.thuraya_locations = thuraya),
  setSidebar: (state, sidebar) => (state.sidebar_vessel = sidebar),
  setSatNet: (state, satnet) => (state.satnet = satnet),
  setWeather:(state, weather) => (state.weather = weather),
  seteirp:(state, eirp) => (state.eirp = eirp),
  setgnt:(state, gnt) => (state.gnt = gnt),
  setSkyreach1Con:(state, Skyreach1Con) =>(state.Skyreach1Con = Skyreach1Con),
  setSkyreach2Con:(state, Skyreach2Con) =>(state.Skyreach2Con = Skyreach2Con),
  setApstar9Con:(state,Apstar9Con) => (state.Apstar9Con =  Apstar9Con),
  setAbs2Con:(state,Abs2Con)=>(state.Abs2Con=Abs2Con),
  setOceanBeamCon:(state,OceanBeamCon)=>(state.OceanBeamCon=OceanBeamCon),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
