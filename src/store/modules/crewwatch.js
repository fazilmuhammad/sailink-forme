import axios from "axios";

const state = {
    crewwatch_data: null,
};

const getters = {
  crewwatchData: (state) => state.crewwatch_data,
};

const actions = {
  async fetchCrewwatch({ commit },data) {
    const response = await axios.get("https://navigatorplus.sailink.id/api/v1/navplus/crew", {
        headers: {
          Authorization: "Bearer" + data,
        },
      });
    console.log(response);
    commit("setCrewwatch", response.data.data.vessels.map((item, index) =>
    Object.assign(item, { index })
  ));
  },




};

const mutations = {
  setCrewwatch: (state, crewwatch) => (state.crewwatch_data = crewwatch),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
