import axios from "axios";

const state = {
    admin_data: null,
};

const getters = {
  adminData: (state) => state.admin_data,
};

const actions = {
  async fetchAdmin({ commit },data) {
    const response = await axios.get("https://navigatorplus.sailink.id/api/v1/navplus/user", {
        headers: {
          Authorization: "Bearer" + data,
        },
      });
    console.log(response);
    commit("setAdmin", response.data.data.users.map((item, index) =>
    Object.assign(item, { index })
  ));
  },




};

const mutations = {
  setAdmin: (state, admin) => (state.admin_data = admin),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
