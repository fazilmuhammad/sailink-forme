import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos';
import login from './modules/login';
import navplus from './modules/navplus';
import user from './modules/user';
import mysailink from './modules/mysailink';
import reports from './modules/reports';
import snapshot from './modules/snapshot';
import mythuraya from './modules/mythuraya';
import manifest from './modules/manifest';
import iot from './modules/iot';
import admin from './modules/admin';
import crewwatch from './modules/crewwatch';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todos,
    login,
    navplus,
    user,
    mysailink,
    reports,
    snapshot,
    mythuraya,
    manifest,
    iot,
    admin,
    crewwatch,
  }
})
