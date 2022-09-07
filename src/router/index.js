import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NavigatorView from '@/views/NavigatorView.vue'
import MySailinkView from '@/views/MySailinkView.vue'
import ReportView from '@/views/ReportView.vue'
import SnapshotView from '@/views/SnapshotView.vue'
import MyThurayaView from '@/views/MyThurayaView.vue'
import ManifestView from '@/views/ManifestView.vue'
import IotView from '@/views/IotView.vue'
import CrewwatchView from '@/views/CrewwatchView.vue'
import AdminView from '@/views/AdminView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      auth: true,
      title: 'SAILINK :: All in One Maritime Solutions',
      icon:"/lock.png" 
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      auth: true,
      title: 'SAILINK :: Login'
    }
  },
  {
    path: '/navigator+',
    name:'navigator+',
    component: NavigatorView,
    meta: {
      auth: true,
      title: 'Navigator+ :: Dashboard'
    }
  },
  {
    path: '/mysailink',
    name:'navigator+',
    component: MySailinkView,
    meta: {
      auth: true,
      title: 'Navigator+ :: Dashboard'
    }
  },
  {
    path: '/reports',
    name:'navigator+',
    component: ReportView,
    meta: {
      auth: true,
      title: 'Navigator+ :: Dashboard'
    }
  },
  {
    path: '/snapshot',
    name:'navigator+',
    component: SnapshotView,
    meta: {
      auth: true,
      title: 'Navigator+ :: Dashboard'
    }
  },
  {
    path: '/mythuraya',
    name:'navigator+',
    component:MyThurayaView,
    meta: {
      auth: true,
      title: 'Navigator+ :: Dashboard'
    }
  },
  {
    path: '/manifest',
    name:'navigator+',
    component:ManifestView,
    meta: {
      auth: true,
      title: 'Navigator+ :: Dashboard'
    }
  },
  {
    path: '/iot',
    name:'navigator+',
    component:IotView,
    meta: {
      auth: true,
      title: 'Navigator+ :: Dashboard'
    }
  },
  {
    path: '/crewwatch',
    name:'navigator+',
    component:CrewwatchView,
    meta: {
      auth: true,
      title: 'Navigator+ :: Dashboard'
    }
  },
  {
    path: '/admin',
    name:'navigator+',
    component:AdminView,
    meta: {
      auth: true,
      title: 'Navigator+ :: Dashboard'
    }
  },

  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, form, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("auth"));
  if (to.name !== "login" && to.name !== "home" && !isAuthenticated)
    next({ name: "home" });
  if (to.name === "login" && isAuthenticated) next({ name: "home" });
  else next();
});
export default router
