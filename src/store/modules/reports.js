import axios from "axios";

const state = {
    reports_data: null,
};

const getters = {
  reportsData: (state) => state.reports_data,
};

const actions = {
  async fetchReports({ commit },data) {
    const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/sailink",
        {
          headers: {
            Authorization: "Bearer" + data,
          },
        }
      );
    console.log(response);
    commit("setReports", response.data.data.vessels.map((item, index) =>
    Object.assign(item, { index })
  ));
  },




};

const mutations = {
  setReports: (state, reports) => (state.reports_data = reports),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
