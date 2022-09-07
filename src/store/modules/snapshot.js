import axios from "axios";

const state = {
    snapshot_data: null,
    snapshotfolder:null,
    snapshotpict:null,
    loadingimage:null,
    loadingfolder:null,
    vesselData:null,
};

const getters = {
  snapshotData: (state) => state.snapshot_data,
  snapshotfolder: (state) => state.snapshotfolder,
  snapshotpict:(state)=>state.snapshotpict,
  loadingimage:(state)=>state.loadingimage,
  loadingfolder:(state)=>state.loadingfolder,
  vesselData:(state)=>state.vesselData,
};

const actions = {
  async fetchSnapshot({ commit },data) {
    const response = await axios.get(
        "https://navigatorplus.sailink.id/api/v1/navplus/snapshot",
        {
          headers: {
            Authorization: "Bearer" + data,
          },
        }
      );
    console.log(response);
    commit("setSnapshot", response.data.data.vessels.map((item, index) =>
    Object.assign(item, { index })
  ));
  },

  async snapshotFolder({commit},data){
    commit('setsnapshotfolder',null)
    commit('setsnapshotpict',null)
    commit('setloadingfolder',null)
    commit('setloadingimage',true)
    commit('setloadingfolder',true)
    const response = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/snapshot/" + data.id,
      {
        headers: {
          Authorization: "Bearer" + data.token
        },
      }
    );
    commit('setsnapshotfolder',response.data.data)
    console.log( response.data.data.dir_label[0])
    const responsepict = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/snapshot/" +
        data.id +
        "/" +
        response.data.data.dir_label[0],
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );   
    commit('setsnapshotpict',responsepict.data.data)
  },

 async FolderClick({commit},data) {
  commit('setsnapshotpict',null)
  commit('setloadingimage',true)
    const response = await axios.get(
      "https://navigatorplus.sailink.id/api/v1/navplus/snapshot/" +
        data.id +
        "/" +
        data.label,
      {
        headers: {
          Authorization: "Bearer" + data.token,
        },
      }
    );
    console.log(response)
    commit('setsnapshotpict',response.data.data)
    },

  vesselDataSet({commit},data){
    console.log(data)
    commit('setvesselData',data)
  },

  

};

const mutations = {
  setSnapshot: (state, snapshot) => (state.snapshot_data = snapshot),
  setsnapshotfolder:(state,snapshotfolder)=>(state.snapshotfolder = snapshotfolder),
  setsnapshotpict:(state,snapshotpict)=>(state.snapshotpict=snapshotpict),
  setloadingimage:(state,loadingimage) => (state.loadingimage=loadingimage),
  setloadingfolder:(state,loadingfolder) => (state.loadingfolder=loadingfolder),
  setvesselData:(state,vesselData)=>(state.vesselData=vesselData),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
