import axios from "axios";

const state = {
  token: null,
  user: [],
  auth:false,
};

const getters = {
  userToken: (state) => state.token,
  userData: (state) => state.user,
  isAuth: (state) => state.auth,
};

const actions = {
  async fetchUser({ commit }, data) {
    try {
      const response = await axios.post(
        "https:/navigatorplus.sailink.id/api/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      commit("setToken", response.data.token);
      commit("setUser", response.data.user);
      commit("setAuth",true)
      console.log('ok')
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.user.id);
    } catch (e) {
      console.log("error");
      // this.error = "Invalid Email/Password";
    }
    
  },


};

const mutations = {
  setToken: (state, token) => (state.token = token),
  setUser: (state, user) => (state.user = user),
  setAuth:(state, auth) => (state.auth = auth),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
