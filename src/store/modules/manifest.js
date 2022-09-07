import axios from "axios";

const state = {
    manifest_data: null,
};

const getters = {
  manifestData: (state) => state.manifest_data,
};

const actions = {
  async fetchManifest({ commit },data) {
    const response = await axios.get("https://navigatorplus.sailink.id/api/v1/navplus/manifest", {
        headers: {
          Authorization: "Bearer" + data,
        },
      });  
    console.log(response);
    commit("setManifest", response.data.data.vessels.map((item, index) =>
    Object.assign(item, { index })
  ));
  },




};

const mutations = {
  setManifest: (state, manifest) => (state.manifest_data = manifest),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
