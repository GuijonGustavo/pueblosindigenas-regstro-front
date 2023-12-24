import Vue from "vue";

Vue.filter('capitalize', value => {
  if (!value) return '';
  return value.toString().toUpperCase();
});
