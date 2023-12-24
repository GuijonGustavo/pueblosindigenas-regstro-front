import Vue from 'vue'
import VueMatomo from 'vue-matomo';
import App from './App.vue'
import router from './router';
import axios from 'axios';
import store from './store';
import "./filters.js";

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_ENI_DOMAIN_REST;

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  console.log(ca);
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0){
        console.log(c.substring(nameEQ.length,c.length));
        return c.substring(nameEQ.length,c.length);
      }
  }
  return null;
}

var csrftoken = readCookie('csrftoken');

axios.interceptors.request.use(function (config) {
  config.headers = {
    authorization: "Bearer " + sessionStorage.getItem("jwt"),
    "X-CSRFToken": csrftoken
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

if (process.env.VUE_APP_MATOMO_SITEID != 0) {
  Vue.use(VueMatomo, {
    host: 'https://retru.conacyt.mx/',
    siteId: process.env.VUE_APP_MATOMO_SITEID,
    trackerFileName: 'matomo',
    router: router,
    enableLinkTracking: true,
    requireConsent: false,
    trackInitialView: true,
    debug: true,
  });
}
