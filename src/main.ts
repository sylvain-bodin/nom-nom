import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import 'buefy/dist/buefy.css';
import './vee-validate';

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
