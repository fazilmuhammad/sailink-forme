import axios from "axios";

const state = {
    user_pass: null,
};

const getters = {
  userPass: (state) => state.user_pass,
};

const actions = {
  async fetchUserPass({ commit }) {
    const response = await axios.get("https://navigatorplus.sailink.id/api/v1/navplus/user/edit/pass/"+localStorage.getItem("id"), {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("token"),
      },
      
    });
    console.log(response.data.data)
    commit("setUserPass", response.data.data);
  },


};

const mutations = {
  setUserPass: (state, userpass) => (state.user_pass = userpass),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
