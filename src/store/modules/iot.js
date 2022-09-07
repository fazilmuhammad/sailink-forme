import axios from "axios";

const state = {
    iot_data: null,
};

const getters = {
  iotData: (state) => state.iot_data,
};

const actions = {
  async fetchIot({ commit },data) {
    const response = await axios.get("https://navigatorplus.sailink.id/api/v1/navplus/iot", {
        headers: {
          Authorization: "Bearer" + data,
        },
      });
    console.log(response);
    commit("setIot", response.data.data.vessels.map((item, index) =>
    Object.assign(item, { index })
  ));
  },




};

const mutations = {
  setIot: (state, iot) => (state.iot_data = iot),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
